package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Diplome;
import com.example.demo.model.Experience;

@Repository
public interface DiplomeRepository extends JpaRepository<Diplome, Long> {
	List<Diplome> findBycandidature(long candidature);
}
