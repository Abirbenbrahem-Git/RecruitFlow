package com.example.demo.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="experience")
public class Experience {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id_experience;
	String poste;
	LocalDate datedebut;
	LocalDate datefin;
	String responsabilite;
	
	
	 long candidature;
	 
	//@ManyToOne(fetch =FetchType.EAGER)
	//@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	//@JoinColumn(name="id_candidature")
	//Candidature candidature;
	
	//@JsonBackReference
	//@ManyToOne 
	//private Candidature candidature;
	
	
	public Experience() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Experience(long id_experience, String poste, LocalDate datedebut,LocalDate datefin,String responsabilite,long candidature) {
		super();
		this.poste = poste;
		this.datedebut = datedebut;
		this.datefin = datefin;
		this.responsabilite = responsabilite;
		 this.candidature = candidature;
	}

	public long getId_experience() {
		return id_experience;
	}

	public void setId_experience(long id_experience) {
		this.id_experience = id_experience;
	}

	public String getPoste() {
		return poste;
	}

	public void setPoste(String poste) {
		this.poste = poste;
	}

	public LocalDate getDatedebut() {
		return datedebut;
	}

	public void setDatedebut(LocalDate datedebut) {
		this.datedebut = datedebut;
	}

	public LocalDate getDatefin() {
		return datefin;
	}

	public void setDatefin(LocalDate datefin) {
		this.datefin = datefin;
	}

	public String getResponsabilite() {
		return responsabilite;
	}

	public void setResponsabilite(String responsabilite) {
		this.responsabilite = responsabilite;
	}
	
	//public Candidature getCandidature() {
	//	return candidature;
	//}

	//public void setCandidature(Candidature candidature) {
	//	this.candidature = candidature;
	//}
	
	 public long getId_candidature() {
	        return candidature;
	    }

	    public void setId_candidature(long candidature) {
	        this.candidature = candidature;
	    }
	
	
}