package com.example.demo.controller;
import com.example.demo.model.*;
import com.example.demo.repository.CandidatRepository;
import com.example.demo.service.CandidatService;
import com.example.demo.service.CiviliteService;
import com.example.demo.service.GouvernoratService;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = " http://localhost:4200")
public class CandidatController {

    private final CandidatService candidatService;
    private final GouvernoratService gouvernoratService;
    private final CiviliteService civiliteService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserService service;
    private final CandidatRepository candidatRepository;

    @Autowired
    public CandidatController(CandidatService candidatService, GouvernoratService gouvernoratService, CiviliteService civiliteService, PasswordEncoder passwordEncoder, UserRepository userRepository, UserService service, CandidatRepository candidatRepository) {
        this.candidatService = candidatService;
        this.gouvernoratService = gouvernoratService;
        this.civiliteService = civiliteService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.service = service;
        this.candidatRepository = candidatRepository;
    }

    @GetMapping(value = "/civilite")
    public List<Civilite> getCivilites() {
        return civiliteService.getCivilites();
    }

    @GetMapping(value = "/civilite/noms")
    public List<String> getCiviliteNames() {
        List<Civilite> civilites = civiliteService.getCivilites();
        List<String> civiliteNames = new ArrayList<>();
        for (Civilite civilite : civilites) {
            civiliteNames.add(civilite.getNom());
        }
        return civiliteNames;
    }

    @GetMapping(value = "/gouvernorat")
    public List<Gouvernorat> getgouvernorats() {
        return gouvernoratService.getGouvernorats();
    }

    @GetMapping(value = "/gouvernorat/noms")
    public List<String> getGouvernoratNames() {
        List<Gouvernorat> gouvernorats = gouvernoratService.getGouvernorats();
        List<String> gouvernoratNames = new ArrayList<>();
        for (Gouvernorat gouvernorat : gouvernorats) {
            gouvernoratNames.add(gouvernorat.getNom());
        }
        return gouvernoratNames;
    }

    @GetMapping(value = "/candidat/gouvernorat/{nom}")
    public List<Candidat> getCandidatByGouvernorat(@PathVariable String nom) {
        return candidatService.getCandidatByGouvernorat(nom);
    }

    @GetMapping(value = "/candidat/civilite/{nom}")
    public List<Candidat> getCandidatByCivilite(@PathVariable String nom) {
        return candidatService.getCandidatByCivilite(nom);
    }

    @GetMapping("/candidat/all")
    public ResponseEntity<List<Map<String, String>>> getAllCandidats() {
        List<Candidat> candidats = candidatService.getAllCandidats();

        List<Map<String, String>> response = candidats.stream().map(candidat -> {
            Map<String, String> map = new HashMap<>();
            map.put("id", candidat.getId().toString());
            map.put("firstname", candidat.getFirstname());
            map.put("lastname", candidat.getLastname());
            map.put("email", candidat.getEmail());
            map.put("telephone", candidat.getTelephone());
            map.put("dateNaissance", candidat.getDateNaissance());
            if (candidat.getGouvernorat() != null) {
                map.put("gouvernorat", candidat.getGouvernorat().getNom());
            }
            if (candidat.getCivilite() != null) {
                map.put("civilite", candidat.getCivilite().getNom());
            }
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/candidat/details")
    public ResponseEntity<?> getCandidatDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Candidat userDetails = candidatService.getCandidatDetailsByUsername(username);
        if (userDetails == null) {
            return ResponseEntity.notFound().build();
        }
        Map<String, String> response = new HashMap<>();
        response.put("id", userDetails.getId().toString());
        response.put("firstname", userDetails.getFirstname());
        response.put("lastname", userDetails.getLastname());
        response.put("email", userDetails.getEmail());
        response.put("telephone", userDetails.getTelephone());
        response.put("dateNaissance", userDetails.getDateNaissance());
        response.put("gouvernorat", userDetails.getGouvernorat().getNom());
        response.put("civilite", userDetails.getCivilite().getNom());
        return ResponseEntity.ok(response); // Return 200 OK with the employeur details
    }

    @DeleteMapping(value = "/candidat/delete/{id}")
    public void deleteCandidatById(@PathVariable Long id) {
        candidatService.deleteCandidatById((long) Math.toIntExact(id));
    }

    @PostMapping("/candidat/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Candidat addCandidat(@RequestBody Candidat candidat) {
        candidat.setPassword(passwordEncoder.encode(candidat.getPassword()));
        candidat = candidatService.addCandidat(candidat);
        return candidat;
    }

    @PutMapping(value = "/candidat/{id}")
    public Candidat updateCandidat(@RequestBody Candidat candidat, @PathVariable Long id) {
        Candidat existingCandidat = candidatService.getCandidatById(id);
        if (existingCandidat != null && candidat != null) {
            existingCandidat.setFirstname(candidat.getFirstname());
            existingCandidat.setLastname(candidat.getLastname());
            existingCandidat.setEmail(candidat.getEmail());
            existingCandidat.setPassword(passwordEncoder.encode(candidat.getPassword()));
            if (candidat.getRole() != null) {
                existingCandidat.setRole(candidat.getRole());
            } else {
                existingCandidat.setRole(existingCandidat.getRole());
            }
            existingCandidat.setTelephone(candidat.getTelephone());
            existingCandidat.setDateNaissance(candidat.getDateNaissance());
            existingCandidat.setGouvernorat(candidat.getGouvernorat());
            existingCandidat.setCivilite(candidat.getCivilite());
            return candidatService.updateCandidat(existingCandidat);
        } else {
            return null;
        }
    }
    @PutMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Optional<Candidat> userOptional = Optional.ofNullable(candidatRepository.findByEmail(email));

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (updatedUser.getEmail() != null) {
                user.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getFirstname() != null) {
                user.setFirstname(updatedUser.getFirstname());
            }
            if (updatedUser.getLastname() != null) {
                user.setLastname(updatedUser.getLastname());
            }

            User savedUser = service.updateUser(user);

            return ResponseEntity.ok(savedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
