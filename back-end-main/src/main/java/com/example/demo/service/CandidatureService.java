package com.example.demo.service;
import com.example.demo.model.Candidature;
import com.example.demo.repository.CandidatureRepository;
import com.example.demo.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CandidatureService {

    private final CandidatureRepository candidatureRepository;

    @Autowired
    public CandidatureService(CandidatureRepository candidatureRepository) {
        this.candidatureRepository = candidatureRepository;
    }
    @Transactional
    public List<Candidature> getCandidaturesByAuthenticatedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(getUserIdFromAuthentication(authentication));
        if (userId == null) {
            throw new RuntimeException("Unable to retrieve authenticated user ID");
        }

        return candidatureRepository.findByUserId((long) Math.toIntExact(userId));
    }

    private Integer getUserIdFromAuthentication(Authentication authentication) {
        Object principal = authentication.getPrincipal();
        if (principal instanceof User) {
            return ((User) principal).getId();
        } else {
            return null;
        }
    }
    @Transactional
    public List<Candidature> getCandidaturesByAuthenticatedUserIdemployeur() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.valueOf(getUserIdFromAuthentication(authentication));
        if (userId == null) {
            throw new RuntimeException("Unable to retrieve authenticated user ID");
        }

        return candidatureRepository.findByUserIdAndOffreId((long) Math.toIntExact(userId));
    }
}
