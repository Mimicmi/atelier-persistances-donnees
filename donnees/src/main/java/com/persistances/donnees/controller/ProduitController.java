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

    @PutMapping("/produits/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable("id") Long id, @RequestParam Long magasinId, @RequestBody Produit produitDetails) {
        Optional<Produit> produit = produitRepository.findById(id);
        Optional<Magasin> magasin = magasinRepository.findById(magasinId);

        if(!produit.isPresent() || !magasin.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        Magasin magasinToUpdate = magasin.get();
        magasinToUpdate = magasinRepository.save(magasinToUpdate);

        Produit _produit = produit.get();
        _produit.setLabel(produitDetails.getLabel());
        _produit.setPrix(produitDetails.getPrix());
        _produit.setDescription(produitDetails.getDescription());
        _produit.setCategorie(produitDetails.getCategorie());

        _produit.getMagasin().clear();
        _produit.getMagasin().add(magasinToUpdate);

        return ResponseEntity.ok(produitRepository.save(_produit));
    }

    @DeleteMapping("/produits/{id}")
    public ResponseEntity<?> deleteProduit(@PathVariable("id") Long id) {
        try {
            produitRepository.deleteById(id);
            return new ResponseEntity<>("Produit supprimé", HttpStatus.OK);
        } catch (Exception err) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
