package com.persistances.donnees.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.persistances.donnees.entity.Categorie;
import com.persistances.donnees.entity.Magasin;
import com.persistances.donnees.entity.Produit;
import com.persistances.donnees.repository.CategorieRepository;
import com.persistances.donnees.repository.MagasinRepository;
import com.persistances.donnees.repository.ProduitRepository;

@RestController
public class ProduitController {
    
    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private MagasinRepository magasinRepository;

    @PostMapping("/produits")
    public Produit createProduit(@RequestBody Produit produit, @RequestParam Long magasinId) {
        Optional<Categorie> categorie = categorieRepository.findById(produit.getCategorie().getId());
        if (!categorie.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        Magasin magasin = magasinRepository.findById(magasinId).get();
        produit.getMagasin().add(magasin);
        return produitRepository.save(produit);
    }

    @GetMapping("/produits")
    public ResponseEntity<List<Produit>> getProduits() {
        List<Produit> produits = produitRepository.findAll();
        return new ResponseEntity<>(produits, HttpStatus.OK);
    }

    @GetMapping("/produits/{id}")
    public ResponseEntity<?> getProduitById(@PathVariable("id") Long id) {
        Optional<Produit> produit = produitRepository.findById(id);
        if(!produit.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(produit, HttpStatus.OK);
    }
}
