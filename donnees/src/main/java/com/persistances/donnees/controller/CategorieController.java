package com.persistances.donnees.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.persistances.donnees.entity.Categorie;
import com.persistances.donnees.repository.CategorieRepository;

@RestController
public class CategorieController {
    
    @Autowired
    private CategorieRepository categorieRepository;

    @PostMapping("categories")
    public ResponseEntity<?> createCategorie(@RequestBody Categorie categorie) {
        categorieRepository.save(categorie);
        return new ResponseEntity<>("categorie id: " + categorie.getId(), HttpStatus.OK);
    }
}
