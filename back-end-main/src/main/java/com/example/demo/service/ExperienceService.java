package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Experience;
import com.example.demo.model.Offre;
import com.example.demo.repository.ExperienceRepository;

@Service
public class ExperienceService {
	private final ExperienceRepository experienceRepo;
	
	@Autowired
	public ExperienceService(ExperienceRepository experienceRepo) {
	super();
	this.experienceRepo = experienceRepo;
	}
	
	public List<Experience> getExperiences()
	{
	return experienceRepo.findAll();
	}
	
	public List<Experience>  addExperience(List<Experience> experiences) {
		return experienceRepo.saveAll(experiences);
	}
	
	public List<Experience> getExperienceBycand(long candidature){
		List<Experience> listExperience;
		listExperience = experienceRepo.findBycandidature(candidature);
		return listExperience;
	}
	

}