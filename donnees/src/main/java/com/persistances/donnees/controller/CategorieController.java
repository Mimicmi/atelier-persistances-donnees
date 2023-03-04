package com.persistances.donnees.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.persistances.donnees.entity.Categorie;
import com.persistances.donnees.repository.CategorieRepository;

@RestController
public class CategorieController {
    
    @Autowired
    private CategorieRepository categorieRepository;

    @PostMapping("/categories")
    public ResponseEntity<?> createCategorie(@RequestBody Categorie categorie) {
        categorieRepository.save(categorie);
        return new ResponseEntity<>("categorie id: " + categorie.getId(), HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Categorie>> getCategories() {
        List<Categorie> categories = categorieRepository.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<?> getCategorieById(@PathVariable("id") Long id) {
        Optional<Categorie> categorie = categorieRepository.findById(id);

        if(!categorie.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(categorie, HttpStatus.OK);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Categorie> updateCategorie(@PathVariable("id") Long id, @RequestBody Categorie categorie) {
        Optional<Categorie> categorieData = categorieRepository.findById(id);

        if(!categorieData.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        Categorie _categorie = categorieData.get();
        _categorie.setLabel(categorie.getLabel());

        return new ResponseEntity<Categorie>(categorieRepository.save(_categorie), HttpStatus.OK);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<?> deleteCategorie(@PathVariable("id") Long id) {
        try {
            categorieRepository.deleteById(id);
            return new ResponseEntity<>("Catégorie supprimée", HttpStatus.OK);
        } catch (Exception err) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
