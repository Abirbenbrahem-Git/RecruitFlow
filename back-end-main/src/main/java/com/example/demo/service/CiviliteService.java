package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Civilite;
import com.example.demo.repository.CiviliteRepository;

@Service
public class CiviliteService {

    private final CiviliteRepository civiliteRepo;

    @Autowired
    public CiviliteService(CiviliteRepository civiliteRepo) {
        this.civiliteRepo = civiliteRepo;
    }

    public List<Civilite> getCivilites() {
        return civiliteRepo.findAll();
    }

    public Civilite addCivilite(Civilite civilite) {
        civilite = civiliteRepo.save(civilite);
        return civilite;
    }
}
