package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Gouvernorat;
import com.example.demo.model.Offre;

@Repository
public interface GouvernoratRepository extends JpaRepository<Gouvernorat, Long>{
	Gouvernorat findByNom(String nom);
}
