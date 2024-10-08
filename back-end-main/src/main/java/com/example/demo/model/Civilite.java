package com.example.demo.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Civilite")
public class Civilite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id_Civilite;
    String nom;

    public Civilite() {
        super();
        // TODO Auto-generated constructor stub
    }

    public Civilite(long id_Civilite, String nom) {
        super();
        this.nom = nom;
    }
    public Civilite(String id) {
        this.id_Civilite = Long.parseLong(id);
    }
    public long getId_Civilite() {
        return id_Civilite;
    }

    public void setId_Civilite(long id_Civilite) {
        this.id_Civilite = id_Civilite;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Long getId() {
        return id_Civilite;
    }
}

