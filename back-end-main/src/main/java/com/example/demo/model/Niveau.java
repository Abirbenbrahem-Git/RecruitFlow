package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="niveau")
public class Niveau {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id_niveau;
	String nom;

	public Niveau() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Niveau(long id_niveau, String nom) {
		super();
		this.nom = nom;
	}


	public long getId_niveau() {
		return id_niveau;
	}

	public void setId_niveau(long id_niveau) {
		this.id_niveau = id_niveau;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

}
