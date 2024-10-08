package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="diplome")
public class Diplome {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id_diplome;
	String diplome;
	LocalDate datediplome;
	long candidature;

	public Diplome() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Diplome(long id_diplome, String diplome, LocalDate datediplome,long candidature) {
		super();
		this.diplome = diplome;
		this.datediplome = datediplome;
		 this.candidature = candidature;
	}

	public long getId_diplome() {
		return id_diplome;
	}

	public void setId_diplome(long id_diplome) {
		this.id_diplome = id_diplome;
	}

	public String getDiplome() {
		return diplome;
	}

	public void setDiplome(String diplome) {
		this.diplome = diplome;
	}

	public LocalDate getDatediplome() {
		return datediplome;
	}

	public void setDatediplome(LocalDate datediplome) {
		this.datediplome = datediplome;
	}

	public long getId_candidature() {
		return candidature;
	}

	public void setId_candidature(long candidature) {
		this.candidature = candidature;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
