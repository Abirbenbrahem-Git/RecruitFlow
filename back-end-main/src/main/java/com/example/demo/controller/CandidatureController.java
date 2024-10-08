package com.example.demo.controller;

import java.util.List;
import java.util.Optional;
import com.example.demo.service.CandidatureService;
import com.example.demo.user.User;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.demo.user.UserRepository;
import com.example.demo.model.Candidature;
import com.example.demo.model.Gouvernorat;
import com.example.demo.repository.CandidatureRepository;
import com.example.demo.repository.GouvernoratRepository;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("candidature")
@CrossOrigin(origins = " http://localhost:4200")
public class CandidatureController {
	@GetMapping
	String getBonjour(){
		return "Bonjour candidature";
	}

	private final CandidatureRepository candidatureRepository;
	private final GouvernoratRepository gouvernoratRepository;
	private final UserRepository UserRepository;
	private final CandidatureService candidatureService;
	@Autowired
	public CandidatureController(CandidatureRepository candidatureRepository, GouvernoratRepository gouvernoratRepository, com.example.demo.user.UserRepository userRepository, CandidatureService candidatureService) {
		this.candidatureRepository = candidatureRepository;
		this.gouvernoratRepository = gouvernoratRepository;
		UserRepository = userRepository;
		this.candidatureService = candidatureService;
	}


	@PostMapping
	public ResponseEntity<?> createCandidature(
			@RequestParam String prenom,
			@RequestParam long id_offre,
			@RequestParam String nom,
			@RequestParam String mail,
			@RequestParam Integer telephone,
			@RequestParam String competence,
			@RequestParam String gouvernoratName,
			@RequestParam("fichier") MultipartFile fichier) {

		try {
			byte[] fichierBytes = fichier.getBytes();

			Gouvernorat gouvernorat = gouvernoratRepository.findByNom(gouvernoratName);
			if (gouvernorat == null) {
				throw new RuntimeException("Gouvernorat not found with name: " + gouvernoratName);
			}
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String username = authentication.getName();
			Optional<User> userOptional = UserRepository.findByEmail(username);
			if (!userOptional.isPresent()) {
				throw new RuntimeException("User not found with username: " + username);
			}
			User user = userOptional.get();
			Candidature candidature = new Candidature();
			candidature.setOffre(id_offre);
			candidature.setPrenom(prenom);
			candidature.setNom(nom);
			candidature.setMail(mail);
			candidature.setTelephone(telephone);
			candidature.setCompetence(competence);
			candidature.setGouvernorat(gouvernorat);
			candidature.setNomficher(fichier.getOriginalFilename());
			candidature.setFichiertype(fichier.getContentType());
			candidature.setFichier(fichierBytes);
			candidature.setUser(user);
			Candidature newCandidature = candidatureRepository.save(candidature);

			return new ResponseEntity<>(newCandidature, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to create candidature", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	@GetMapping("/candidat/all")
	public ResponseEntity<List<Candidature>> getAllCandidatures() {
		List<Candidature> candidatures = candidatureService.getCandidaturesByAuthenticatedUserId();
		return ResponseEntity.ok(candidatures);

	}

	@GetMapping("/employeur/all")
	public ResponseEntity<List<Candidature>> getAllCandidaturess() {
		List<Candidature> candidatures = candidatureService.getCandidaturesByAuthenticatedUserIdemployeur();
		return ResponseEntity.ok(candidatures);

	}

	@GetMapping("/{id}/download")
	public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
		Candidature candidature = candidatureRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Candidature not found with id: " + id));
		ByteArrayResource resource = new ByteArrayResource(candidature.getFichier());
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(candidature.getFichiertype()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + candidature.getNomficher() + "\"")
				.body(resource);
	}
	@GetMapping("/accepter/{id_candidature}")
	public void accepterOffre(@PathVariable long id_candidature) {
		Candidature candidature= candidatureRepository.findById(id_candidature).get();
		if(candidature!=null) {
			candidature.setStatut("Accepter");
			candidatureRepository.save(candidature);
		}
	}

	@GetMapping("/refuser/{id_candidature}")
	public void refuserOffre(@PathVariable long id_candidature) {
		Candidature candidature= candidatureRepository.findById(id_candidature).get();

		if(candidature!=null) {
			candidature.setStatut("Refuser");
			candidatureRepository.save(candidature);
		}
	}

}
