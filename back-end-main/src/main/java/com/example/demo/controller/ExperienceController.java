package com.example.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.model.Experience;
import com.example.demo.model.Offre;
import com.example.demo.service.ExperienceService;
@RestController
@RequestMapping("experience")
@CrossOrigin(origins = " http://localhost:4200")
public class ExperienceController {
	@GetMapping
	String getBonjour(){
		return "Bonjour experience";
	}
	
	private final ExperienceService experienceService;
	
	@Autowired
	public ExperienceController(ExperienceService experienceService) {
		this.experienceService = experienceService;
		}
	
	@GetMapping(value ="all" )
	public List<Experience> getExperiences(){
	return experienceService.getExperiences();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public List<Experience> addExperience(@RequestBody List<Experience> experiences) {
	    return experienceService.addExperience(experiences);
	}
	
	@GetMapping(value="/candidature/{candidature}")
	public List<Experience> getExperienceBycand(@PathVariable long candidature){
		List<Experience> listExperience;
		listExperience = experienceService.getExperienceBycand(candidature);
		return listExperience;
	}
	
	
	
}
