package com.example.demo.service;
import com.example.demo.model.Candidat;
import com.example.demo.repository.CandidatRepository;
import com.example.demo.repository.CiviliteRepository;
import com.example.demo.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.user.UserRepository;
import java.util.List;
import java.util.Optional;

@Service
public class CandidatService {

    private final CandidatRepository candidatRepository;
    private final UserRepository userRepository;
    private final CiviliteRepository civiliteRepository;

    @Autowired
    public CandidatService(CandidatRepository candidatRepository, UserRepository userRepository, CiviliteRepository civiliteRepository) {
        this.candidatRepository = candidatRepository;
        this.userRepository = userRepository;
        this.civiliteRepository = civiliteRepository;
    }

    public List<Candidat> getAllCandidats() {
        return candidatRepository.findAll();
    }

   public Candidat addCandidat(Candidat candidat) {
        return candidatRepository.save(candidat);
    }

    public Candidat getCandidatById(Long id) {
        return candidatRepository.findById(id).orElse(null);
    }

    @Transactional
    public void deleteCandidatById(Long id) {
        try {
            Candidat candidat = candidatRepository.findById(id).orElse(null);
            if (candidat != null) {
                User user = userRepository.getOne(Math.toIntExact(id));
                if (user != null) {
                    userRepository.delete(user);
                }
                candidatRepository.delete(candidat);
            } else {
                System.out.println("Candidat non trouvé pour l'ID : " + id);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Candidat updateCandidat(Candidat candidat) {
        return candidatRepository.save(candidat);
    }
    public List<Candidat> getCandidatByGouvernorat(String nom) {
        return CandidatRepository.findByGouvernoratNom(nom);
    }

    public List<Candidat> getCandidatByCivilite(String nom) {
        return CandidatRepository.findByCiviliteNom(nom);
    }

    public Candidat getCandidatDetailsByUsername(String email) {
        return candidatRepository.findByEmail(email);
    }


}
