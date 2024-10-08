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

import com.example.demo.model.Diplome;
import com.example.demo.model.Experience;
import com.example.demo.service.DiplomeService;

@RestController
@RequestMapping("/api/v3/diplome")
@CrossOrigin(origins = " http://localhost:4200")
public class DiplomeController {
	@GetMapping
	String getBonjour(){
		return "Bonjour diplome";
	}
	
	private final DiplomeService diplomeService;
	
	@Autowired
	public DiplomeController(DiplomeService diplomeService) {
		this.diplomeService = diplomeService;
		}
	
	@GetMapping(value ="all" )
	public List<Diplome> getDiplomes(){
	return diplomeService.getDiplomes();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public List<Diplome> addDiplome(@RequestBody List<Diplome> diplomes) {
	    return diplomeService.addDiplome(diplomes);
	}
	
	@GetMapping(value="/candidature/{candidature}")
	public List<Diplome> getDiplomeBycand(@PathVariable long candidature){
		List<Diplome> listDiplome;
		listDiplome = diplomeService.getDiplomeBycand(candidature);
		return listDiplome;
	}
	
}
