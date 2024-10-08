package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Diplome;
import com.example.demo.model.Experience;
import com.example.demo.repository.DiplomeRepository;

@Service
public class DiplomeService {
private final DiplomeRepository diplomeRepo;
	
	@Autowired
	public DiplomeService(DiplomeRepository diplomeRepo) {
	super();
	this.diplomeRepo = diplomeRepo;
	}
	
	public List<Diplome> getDiplomes()
	{
	return diplomeRepo.findAll();
	}
	
	public List<Diplome> addDiplome(List<Diplome> diplomes) {
		return diplomeRepo.saveAll(diplomes);
	}
	
	public List<Diplome> getDiplomeBycand(long candidature){
		List<Diplome> listDiplome;
		listDiplome = diplomeRepo.findBycandidature(candidature);
		return listDiplome;
	}
}
