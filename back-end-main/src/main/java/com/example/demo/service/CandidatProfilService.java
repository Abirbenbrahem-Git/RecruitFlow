package com.example.demo.service;

import com.example.demo.model.Candidat;
import com.example.demo.model.CandidateProfile;
import com.example.demo.repository.CandidatProfilRepository;
import com.example.demo.user.Role;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CandidatProfilService {
    private final CandidatProfilRepository candidatProfilRepository;
    private final UserRepository userRepository;

    @Autowired
    public CandidatProfilService(CandidatProfilRepository candidatProfilRepository, UserRepository userRepository) {
        this.candidatProfilRepository = candidatProfilRepository;
        this.userRepository = userRepository;
    }

    public CandidateProfile saveCandidateProfile(CandidateProfile candidateProfile) {
        return candidatProfilRepository.save(candidateProfile);
    }
    public Role getRole(String username) {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        if (optionalUser.isPresent()) {
            return optionalUser.get().getRole();
        } else {
            throw new EntityNotFoundException("User not found with username: " + username);
        }
    }

    public Integer getId(String username) {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        if (optionalUser.isPresent()) {
            return optionalUser.get().getId();
        } else {
            throw new EntityNotFoundException("User not found with username: " + username);
        }
    }

    private CandidateProfile getCandidateProfileByUserId(Integer userId) {
        Optional<CandidateProfile> optionalCandidateProfile = candidatProfilRepository.findByCandidatId(userId);
        return optionalCandidateProfile.orElse(null);
    }

    private Candidat convertUserToCandidat(User user) {
        Candidat candidat = new Candidat();
        candidat.setId(user.getId());
        candidat.setEmail(user.getEmail());
        return candidat;
    }
    public Optional<CandidateProfile> findByCandidat(Candidat candidat) {
        return candidatProfilRepository.findByCandidatId(candidat.getId());
    }}
