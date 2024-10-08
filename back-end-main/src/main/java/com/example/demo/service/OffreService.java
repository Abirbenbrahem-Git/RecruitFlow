package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Gouvernorat;
import com.example.demo.model.Niveau;
import com.example.demo.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Offre;
import com.example.demo.repository.OffreRepository;
@Service
public class OffreService {
private final OffreRepository offreRepo;
	@Autowired
	public OffreService(OffreRepository offreRepo) {
	super();
	this.offreRepo = offreRepo;
	}
	
	public List<Offre> getOffres()
	{
	return offreRepo.findAll();
	}
	
	public List<Offre> getOffreByGouvernorat(String nom) {
	    return offreRepo.findByGouvernoratNom(nom);
	}

	public List<Offre> getOffreByNiveau(String nom) {
	    return offreRepo.findByNiveauNom(nom);
	}
	public Offre addOffre(Offre offre) {
		offre = offreRepo.save(offre);
	    return offre;
	}
	
	public Offre getOffreById(Long id_offre){
		Offre offre;
		offre = offreRepo.findById(id_offre).get();
		return offre;
	}
	
	public void deleteOffreByid(Long id_offre){
		offreRepo.deleteByid(id_offre);
	}
	
	 public Offre updateOffre(Offre offre) {
	        return offreRepo.save(offre);
	    }
	public List<Offre> getOffreByGouvernoratAndNiveau(Gouvernorat gouvernorat, Niveau niveau) {
		return offreRepo.findByGouvernoratAndNiveau(gouvernorat, niveau);
	}
	@Transactional
	public List<Offre> getoffresByAuthenticatedUserId() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.valueOf(getUserIdFromAuthentication(authentication));
		if (userId == null) {
			throw new RuntimeException("Unable to retrieve authenticated user ID");
		}

		return offreRepo.findByUserId((long) Math.toIntExact(userId));
	}
	private Integer getUserIdFromAuthentication(Authentication authentication) {
		Object principal = authentication.getPrincipal();
		if (principal instanceof User) {
			return ((User) principal).getId();
		} else {
			return null;
		}
	}
}
