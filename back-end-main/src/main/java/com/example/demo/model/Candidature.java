package com.example.demo.model;

import com.example.demo.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="candidature")
public class Candidature {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id_candidature;
	String prenom;
	String nom;
	String mail;
	Integer telephone;
	String competence;
	long id_offre;
	String statut= "en cours";

	String nomficher;
	String fichiertype;
	@Lob
	byte[] fichier;

	@ManyToOne(fetch =FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@JoinColumn(name="id_gouvernorat")
	public Gouvernorat gouvernorat;

	@JsonIgnore
	@ManyToOne(fetch =FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@JoinColumn(name="user_id")
	public User user;

	//@OneToMany(mappedBy="candidature", fetch = FetchType.EAGER)
	//public List<Experience> experiences;


	//@JsonManagedReference
	//@OneToMany(mappedBy = "candidature", cascade = CascadeType.ALL)
	//private List<Experience> experience;


	public Candidature() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Candidature(long id_candidature, String prenom, String nom,String mail,Integer telephone,String competence,String nomficher,byte[] fichier,String fichiertype,Gouvernorat gouvernorat,long id_offre,String statut) {
		super();
		this.prenom = prenom;
		this.nom = nom;
		this.mail = mail;
		this.telephone=telephone;
		this.competence=competence;
		this.nomficher=nomficher;
		this.fichier=fichier;
		this.fichiertype=fichiertype;
		this.gouvernorat=gouvernorat;
		this.id_offre=id_offre;
		this.statut = "en cours";
	}

	public long getId_candidature() {
		return id_candidature;
	}

	public void setId_candidature(long id_candidature) {
		this.id_candidature = id_candidature;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public Integer getTelephone() {
		return telephone;
	}

	public void setTelephone(Integer telephone) {
		this.telephone = telephone;
	}

	public String getCompetence() {
		return competence;
	}

	public void setCompetence(String competence) {
		this.competence = competence;
	}

	public String getNomficher() {
		return nomficher;
	}

	public void setNomficher(String nomficher) {
		this.nomficher = nomficher;
	}

	public byte[] getFichier() {
		return fichier;
	}

	public void setFichier(byte[] fichier) {
		this.fichier = fichier;
	}

	public String getFichiertype() {
		return fichiertype;
	}

	public void setFichiertype(String fichiertype) {
		this.fichiertype = fichiertype;
	}

	public Gouvernorat getGouvernorat() {
		return gouvernorat;
	}

	public void setGouvernorat(Gouvernorat gouvernorat) {
		this.gouvernorat = gouvernorat;
	}

	public long getOffre() {
		return id_offre;
	}
	public void setOffre(long id_offre) {
		this.id_offre = id_offre;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

}

