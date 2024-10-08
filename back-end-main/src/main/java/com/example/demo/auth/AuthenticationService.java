package com.example.demo.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.demo.model.Candidat;
import com.example.demo.model.Employeur;
import com.example.demo.model.Gouvernorat;
import com.example.demo.repository.CandidatRepository;
import com.example.demo.repository.EmployeurRepository;
import com.example.demo.repository.GouvernoratRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.demo.config.JwtService;
import com.example.demo.token.Token;
import com.example.demo.token.TokenRepository;
import com.example.demo.token.TokenType;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.model.Gouvernorat;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserRepository repository;
	private final TokenRepository tokenRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
	private final EmployeurRepository employeurRepository;
	private final CandidatRepository candidatRepository;
	private final UserRepository userRepository;
	public AuthenticationResponse registerEmployeur(RegisterEmployeurRequest request) {
		Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
		if (existingUser.isPresent()) {
			throw new IllegalArgumentException("L'adresse e-mail est déjà utilisée");
		}
		Employeur employeur = new Employeur();
		employeur.setFirstname(request.getFirstname());
		employeur.setLastname(request.getLastname());
		employeur.setEmail(request.getEmail());
		employeur.setPassword(passwordEncoder.encode(request.getPassword()));
		employeur.setRole(request.getRole());
		employeur.setTelephone(request.getTelephone());
		employeur.setNomEntreprise(request.getNomEntreprise());
		employeur.setEmailEntreprise(request.getEmailEntreprise());
		employeur.setAdresseEntreprise(request.getAdresseEntreprise());
		employeur.setSecteurActivite(request.getSecteurActivite());

		Employeur savedEmployeur = employeurRepository.save(employeur);
		return createAuthenticationResponse(savedEmployeur);
	}
	@Transactional
	public AuthenticationResponse registerCandidat(RegisterCandidatRequest request) {
		Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
		if (existingUser.isPresent()) {
			throw new IllegalArgumentException("L'adresse e-mail est déjà utilisée");
		}
		logger.debug("ID du gouvernorat avant attribution : {}", request.getGouvernorat().getId());
		logger.debug("ID du civilite avant attribution : {}", request.getCivilite().getId());

		Candidat candidat = new Candidat();
		candidat.setFirstname(request.getFirstname());
		candidat.setLastname(request.getLastname());
		candidat.setEmail(request.getEmail());
		candidat.setPassword(passwordEncoder.encode(request.getPassword()));
		candidat.setRole(request.getRole());
		candidat.setTelephone(request.getTelephone());
		candidat.setDateNaissance(request.getDateNaissance());
		candidat.setGouvernorat(request.getGouvernorat());
		candidat.setCivilite(request.getCivilite());

		Candidat savedCandidat = candidatRepository.save(candidat);
		return createAuthenticationResponse(savedCandidat);
	}

	private AuthenticationResponse createAuthenticationResponse(User user) {
		String jwtToken = jwtService.generateToken(user);
		String refreshToken = jwtService.generateRefreshToken(user);
		saveUserToken(user, jwtToken);
		return AuthenticationResponse.builder()
				.accessToken(jwtToken)
				.refreshToken(refreshToken)
				.build();
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		var user = repository.findByEmail(request.getEmail()).orElseThrow();
		System.out.println(user.getRole());
		var jwtToken = jwtService.generateToken(user);
		var refreshToken = jwtService.generateRefreshToken(user);
		revokeAllUserTokens(user);
		saveUserToken(user, jwtToken);
		return AuthenticationResponse.builder().accessToken(jwtToken).refreshToken(refreshToken).role(user.getRole().toString())
				.build();
	}

	private void saveUserToken(User user, String jwtToken) {
		var token = Token.builder().user(user).token(jwtToken).tokenType(TokenType.BEARER).expired(false).revoked(false)
				.build();
		tokenRepository.save(token);
	}

	private void revokeAllUserTokens(User user) {
		var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
		if (validUserTokens.isEmpty())
			return;
		validUserTokens.forEach(token -> {
			token.setExpired(true);
			token.setRevoked(true);
		});
		tokenRepository.saveAll(validUserTokens);
	}

	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
			final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
			final String refreshToken;
		final String userEmail;
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return;
		}
		refreshToken = authHeader.substring(7);
		userEmail = jwtService.extractUsername(refreshToken);
		if (userEmail != null) {
			var user = this.repository.findByEmail(userEmail).orElseThrow();
			if (jwtService.isTokenValid(refreshToken, user)) {
				var accessToken = jwtService.generateToken(user);
				revokeAllUserTokens(user);
				saveUserToken(user, accessToken);
				var authResponse = AuthenticationResponse.builder().accessToken(accessToken).refreshToken(refreshToken)
						.build();
				new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
			}
		}
	}
}
