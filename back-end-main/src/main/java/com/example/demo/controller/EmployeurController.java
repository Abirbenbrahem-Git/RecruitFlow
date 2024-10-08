package com.example.demo.controller;
import com.example.demo.model.*;
import com.example.demo.service.EmployeurService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = " http://localhost:4200")
public class EmployeurController {

    private final EmployeurService employeurService;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public EmployeurController(EmployeurService employeurService, PasswordEncoder passwordEncoder) {
        this.employeurService = employeurService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/employeur/all")
    public ResponseEntity<List<Map<String, String>>> getAllEmployeurs() {
        List<Employeur> employeurs = employeurService.getAllEmployeurs();

        List<Map<String, String>> response = employeurs.stream().map(employeur -> {
            Map<String, String> map = new HashMap<>();
            map.put("id", employeur.getId().toString());
            map.put("firstname", employeur.getFirstname());
            map.put("lastname", employeur.getLastname());
            map.put("email", employeur.getEmail());
            map.put("telephone", employeur.getTelephone());
            map.put("nomEntreprise", employeur.getNomEntreprise());
            map.put("emailEntreprise", employeur.getEmailEntreprise());
            map.put("adresseEntreprise", employeur.getAdresseEntreprise());
            map.put("secteurActivite", employeur.getSecteurActivite());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response); // Return 200 OK with the list of employeur details
    }

    @DeleteMapping(value="employeur/delete/{id}")
    public void deleteEmployeurByid(@PathVariable Long id){
        employeurService.deleteEmployeurById(Math.toIntExact(id));
    }

    @GetMapping("/employeur/details")
    public ResponseEntity<?> getEmployeurDetails() {
        // Récupérer les détails de l'employeur connecté
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Employeur employeurDetails = employeurService.getEmployeurDetailsByUsername(username);

        if (employeurDetails == null) {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if no details are found for the user
        }
        Map<String, String> response = new HashMap<>();
        response.put("id", employeurDetails.getId().toString());
        response.put("firstname", employeurDetails.getFirstname());
        response.put("lastname", employeurDetails.getLastname());
        response.put("email", employeurDetails.getEmail());
        response.put("telephone", employeurDetails.getTelephone());
        response.put("nomEntreprise", employeurDetails.getNomEntreprise());
        response.put("emailEntreprise", employeurDetails.getEmailEntreprise());
        response.put("adresseEntreprise", employeurDetails.getAdresseEntreprise());
        response.put("secteurActivite", employeurDetails.getSecteurActivite());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/employeur/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Employeur addEmployeur(@RequestBody Employeur Employeur){
        Employeur.setPassword(passwordEncoder.encode(Employeur.getPassword()));
        Employeur = employeurService.addEmployeur(Employeur);
        return Employeur;
    }
    @PutMapping(value="/employeur/{id}")
    public Employeur updateEmployeur(@RequestBody Employeur employeur, @PathVariable Long id) {
        Employeur existingEmployeur = employeurService.getEmployeurById(id);
        if(existingEmployeur != null && employeur != null) {
            existingEmployeur.setFirstname(employeur.getFirstname());
            existingEmployeur.setLastname(employeur.getLastname());
            existingEmployeur.setEmail(employeur.getEmail());
            existingEmployeur.setPassword(passwordEncoder.encode(employeur.getPassword()));
            existingEmployeur.setRole(employeur.getRole());
            existingEmployeur.setTelephone(employeur.getTelephone());
            existingEmployeur.setNomEntreprise(employeur.getNomEntreprise());
            existingEmployeur.setEmailEntreprise(employeur.getEmailEntreprise());
            existingEmployeur.setAdresseEntreprise(employeur.getAdresseEntreprise());
            existingEmployeur.setSecteurActivite(employeur.getSecteurActivite());
            return employeurService.updateEmployeur(existingEmployeur);
        } else {
            return null;
        }
    }

}
