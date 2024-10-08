package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Gouvernorat;
import com.example.demo.model.Offre;
import com.example.demo.repository.GouvernoratRepository;



@Service
public class GouvernoratService {
private final GouvernoratRepository gouvernoratRepo;
	
	@Autowired
	public GouvernoratService(GouvernoratRepository gouvernoratRepo) {
	super();
	this.gouvernoratRepo = gouvernoratRepo;
	}
	
	public List<Gouvernorat> getGouvernorats()
	{
	return gouvernoratRepo.findAll();
	}
	
	
	
	public Gouvernorat addGouvernorat(Gouvernorat gouvernorat) {
		gouvernorat = gouvernoratRepo.save(gouvernorat);
	    return gouvernorat;
	}
}
