package com.example.demo.repository;

import com.example.demo.model.Employeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeurRepository extends JpaRepository<Employeur, Long> {
    List<Employeur> findAll();
    Employeur save(Employeur employeur);
    Optional<Employeur> findById(Long id);
    void delete(Employeur employeur);
    void deleteById(Long id);


    Employeur findByEmail(String email);
}
