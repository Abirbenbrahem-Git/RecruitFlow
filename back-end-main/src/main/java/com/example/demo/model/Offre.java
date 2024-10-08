package com.example.demo.model;

import com.example.demo.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="offre")
public class Offre {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id_offre;
	String titre;
	String description;
	String detail;
	Integer salaire;
	int matchingScore;
	@ManyToOne(fetch =FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@JoinColumn(name="id_gouvernorat")
	public Gouvernorat gouvernorat;

	@ManyToOne(fetch =FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@JoinColumn(name="id_niveau")
	public Niveau niveau;
	@JsonIgnore
	@ManyToOne(fetch =FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@JoinColumn(name="user_id")
	public User user;

	public Offre() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Offre(long id_offre, String titre, String description, String detail, Integer salaire, Gouvernorat gouvernorat, Niveau niveau) {
		super();
		this.titre = titre;
		this.description = description;
		this.detail = detail;
		this.salaire=salaire;
		this.gouvernorat=gouvernorat;
		this.niveau=niveau;
	}

	public long getId_offre() {
		return id_offre;
	}

	public void setId_offre(long id_offre) {
		this.id_offre = id_offre;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public Integer getSalaire() {
		return salaire;
	}

	public void setSalaire(Integer salaire) {
		this.salaire = salaire;
	}

	public Gouvernorat getGouvernorat() {
		return gouvernorat;
	}

	public void setGouvernorat(Gouvernorat gouvernorat) {
		this.gouvernorat = gouvernorat;
	}

	public Niveau getNiveau() {
		return niveau;
	}

	public void setNiveau(Niveau niveau) {
		this.niveau = niveau;
	}

	public int getMatchingScore() {
		return matchingScore;
	}

	public void setMatchingScore(int matchingScore) {
		this.matchingScore = matchingScore;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}

