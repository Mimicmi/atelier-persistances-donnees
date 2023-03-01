package com.persistances.donnees.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.persistances.donnees.entity.Magasin;
import com.persistances.donnees.repository.MagasinRepository;

@RestController
public class MagasinController {

    @Autowired
    private MagasinRepository magasinRepository;
    
    @GetMapping("magasins")
    public ResponseEntity<List<Magasin>> getMagasins() {
        List<Magasin> magasins = magasinRepository.findAll();
        return new ResponseEntity<>(magasins, HttpStatus.OK);
    }
}