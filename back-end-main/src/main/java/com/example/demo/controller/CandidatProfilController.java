package com.example.demo.controller;

import com.example.demo.model.Candidat;
import com.example.demo.model.CandidateProfile;
import com.example.demo.service.CandidatProfilService;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CandidatProfilController {
    private final CandidatProfilService candidatProfilService;
    private final UserRepository userRepository;

    @Autowired
    public CandidatProfilController(CandidatProfilService candidatProfilService, UserRepository userRepository) {
        this.candidatProfilService = candidatProfilService;
        this.userRepository = userRepository;
    }

    @PostMapping("/CandidateProfile/add")
    @ResponseStatus(HttpStatus.CREATED)
    public CandidateProfile addOrUpdateCandidateProfile(@RequestBody CandidateProfile candidateProfile) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<User> userOptional = userRepository.findByEmail(username);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found with username: " + username);
        }
        User user = userOptional.get();
        Candidat candidat = (Candidat) user;
        Optional<CandidateProfile> existingProfileOptional = candidatProfilService.findByCandidat(candidat);

        CandidateProfile candidateProfileToSave;
        if (existingProfileOptional.isPresent()) {
            candidateProfileToSave = existingProfileOptional.get();
            candidateProfileToSave.setCompetences(candidateProfile.getCompetences());
            candidateProfileToSave.setExperiencesProfessionnelles(candidateProfile.getExperiencesProfessionnelles());
            candidateProfileToSave.setDiplome(candidateProfile.getDiplome());
            candidateProfileToSave.setGouvernorat(candidateProfile.getGouvernorat());
            candidateProfileToSave.setNiveau(candidateProfile.getNiveau());
        } else {
            candidateProfileToSave = new CandidateProfile();
            candidateProfileToSave.setCandidat(candidat);
            candidateProfileToSave.setCompetences(candidateProfile.getCompetences());
            candidateProfileToSave.setExperiencesProfessionnelles(candidateProfile.getExperiencesProfessionnelles());
            candidateProfileToSave.setDiplome(candidateProfile.getDiplome());
            candidateProfileToSave.setGouvernorat(candidateProfile.getGouvernorat());
            candidateProfileToSave.setNiveau(candidateProfile.getNiveau());
        }

        return candidatProfilService.saveCandidateProfile(candidateProfileToSave);
    }
}
