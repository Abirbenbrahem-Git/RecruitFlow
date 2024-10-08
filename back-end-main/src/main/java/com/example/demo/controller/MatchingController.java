package com.example.demo.controller;
import com.example.demo.model.Candidat;
import com.example.demo.model.Offre;
import com.example.demo.model.CandidateProfile;
import com.example.demo.repository.CandidatRepository;
import com.example.demo.repository.OffreRepository;
import com.example.demo.service.CandidatProfilService;
import com.example.demo.service.CandidatService;
import com.example.demo.user.User;
import com.example.demo.repository.CandidatProfilRepository;
import com.example.demo.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController
@RequestMapping("/api/matching")
@CrossOrigin(origins = " http://localhost:4200")
public class MatchingController {
    private final CandidatService candidatService;
    private final CandidatProfilService candidatProfilService;
    private final CandidatRepository candidatRepository;
    private final CandidatProfilRepository CandidatProfilRepository;
    @Autowired
    private OffreRepository offreRepository;

    public MatchingController(CandidatService candidatService, CandidatProfilService candidatProfilService,  com.example.demo.repository.CandidatRepository candidatRepository, com.example.demo.repository.CandidatProfilRepository candidatProfilRepository) {
        this.candidatService = candidatService;
        this.candidatProfilService = candidatProfilService;
        this.candidatRepository = candidatRepository;
        this.CandidatProfilRepository = candidatProfilRepository;
    }

    private int calculateMatchingScore(Offre offre, CandidateProfile candidateProfile) {
        int matchingScore = 0;


        String[] motscandidateProfile = candidateProfile.getCompetences().split("\\s+");

        for (String mot : motscandidateProfile) {
            if (offre.getDetail().contains(mot)) {
                matchingScore += 1;
            }
        }

        String[] motscandidateProfile1 = candidateProfile.getExperiencesProfessionnelles().split("\\s+");

        for (String mot : motscandidateProfile) {
            if (offre.getDetail().contains(mot)) {
                matchingScore += 1;
            }
        }

        String[] motscandidateProfile2 = candidateProfile.getDiplome().split("\\s+");

        for (String mot : motscandidateProfile2) {
            if (offre.getDetail().contains(mot)) {
                matchingScore += 1;
            }
        }


        if (offre.getGouvernorat().getNom().equalsIgnoreCase(candidateProfile.getGouvernorat().getNom())) {
            matchingScore += 1;
        }

        if (offre.getNiveau().getNom().equalsIgnoreCase(candidateProfile.getNiveau().getNom())) {
            matchingScore += 1;
        }
        return matchingScore;
    }
    @PostMapping("/match-job-offers1")
    public List<Offre> matchJobOffers(Authentication authentication) {
        String username = authentication.getName();
        Optional<Candidat> candidatOptional = Optional.ofNullable(candidatRepository.findByEmail(username));
        if (candidatOptional.isPresent()) {
            Candidat candidat=candidatOptional.get();
            Optional<CandidateProfile> candidateProfileOptionnal = CandidatProfilRepository.findByCandidatId(candidat.getId());
            if(candidateProfileOptionnal.isPresent()){
                CandidateProfile candidateProfile = candidateProfileOptionnal.get();
                List<Offre> offres = offreRepository.findAll();
                for (Offre offre : offres) {
                    int matchingScore = calculateMatchingScore(offre, candidateProfile);
                    offre.setMatchingScore(matchingScore);
                }
                Collections.sort(offres, Comparator.comparing(Offre::getMatchingScore).reversed());
                return offres;
            } else {
                throw new EntityNotFoundException("Aucun profil de candidat trouvé pour l'utilisateur avec l'e-mail : " + username);
            }

        } else {
            throw new EntityNotFoundException("Aucun candidat trouvé avec l'e-mail : " + username);
        }
    }

}
