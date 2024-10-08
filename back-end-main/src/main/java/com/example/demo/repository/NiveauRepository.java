package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Niveau;

@Repository
public interface NiveauRepository extends JpaRepository<Niveau, Long> {

}
