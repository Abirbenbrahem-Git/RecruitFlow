package com.example.demo.repository;
import com.example.demo.model.Civilite;
import com.example.demo.model.Gouvernorat;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CiviliteRepository extends JpaRepository<Civilite, Long> {
    Gouvernorat findByNom(String nom);
}
