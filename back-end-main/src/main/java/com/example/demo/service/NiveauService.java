package com.example.demo.service;

import java.util.List;
import com.example.demo.model.Niveau;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.NiveauRepository;

@Service
public class NiveauService {
	private final NiveauRepository niveauRepo;
	
	
	@Autowired
	public NiveauService(NiveauRepository niveauRepo) {
		super();
		this.niveauRepo = niveauRepo;
		}
		
		public List<Niveau> getNiveaus()
		{
		return niveauRepo.findAll();
		}
		
		
		
		public Niveau addNiveau(Niveau niveau) {
			niveau = niveauRepo.save(niveau);
		    return niveau;
		}
}
