package com.example.demo.service;
import com.example.demo.model.Employeur;
import com.example.demo.repository.EmployeurRepository;
import com.example.demo.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.user.UserRepository;
import java.util.List;

@Service
public class EmployeurService {

    private final EmployeurRepository employeurRepository;
    private final UserRepository userRepository;

    @Autowired
    public EmployeurService(EmployeurRepository employeurRepository , UserRepository userRepository) {
        this.employeurRepository = employeurRepository;
        this.userRepository = userRepository;
    }


    public List<Employeur> getAllEmployeurs() {
        return employeurRepository.findAll();
    }

    public Employeur addEmployeur(Employeur employeur) {
        return employeurRepository.save(employeur);
    }
    public Employeur getEmployeurById(Long id){
        Employeur employeur;
        employeur = employeurRepository.findById(id).get();
        return employeur;
    }
    @Transactional
    public void deleteEmployeurById(Integer id) {
        try {
            // Recherchez l'employeur par son ID
            Employeur employeur = employeurRepository.findById(Long.valueOf(id)).orElse(null);

            if (employeur != null) {
                Integer userId = employeur.getId(); // Obtenez l'ID de l'utilisateur à partir de l'employeur

                User user = userRepository.getOne(Math.toIntExact(Long.valueOf(id)));
                if (user != null) {
                    // Supprimez l'utilisateur
                    userRepository.delete(user);
                }

                // Supprimez l'employeur
                employeurRepository.delete(employeur);
            } else {
                // Gérer le cas où l'employeur n'est pas trouvé
                System.out.println("Employeur non trouvé pour l'ID : " + id);
            }
        } catch (Exception e) {
            // Gérer les erreurs
            e.printStackTrace();
        }
    }

    public Employeur updateEmployeur(Employeur employeur) {
        return employeurRepository.save(employeur);
    }

    public Employeur getEmployeurDetailsByUsername(String email) {
        return employeurRepository.findByEmail(email);
    }
}

