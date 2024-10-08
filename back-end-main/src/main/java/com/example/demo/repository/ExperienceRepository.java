package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Experience;

@Repository
public interface ExperienceRepository  extends JpaRepository<Experience, Long> {
	List<Experience> findBycandidature(long candidature);

}