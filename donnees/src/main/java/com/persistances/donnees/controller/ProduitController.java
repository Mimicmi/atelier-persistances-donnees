package com.persistances.donnees.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

// import com.persistances.donnees.entity.Categorie;
// import com.persistances.donnees.entity.Magasin;
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

    @PostMapping("produits")
    public ResponseEntity<?> createProduit(@RequestBody Produit produit) {
        // Optional<Categorie> categorie = categorieRepository.findById(produit.getId());
        //Optional<Magasin> magasin = magasinRepository.findById(produit.getId());

        // if(!categorie.isPresent()) {
        // if(!categorie.isPresent() || !magasin.isPresent()) {
            // throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        // }
        produitRepository.save(produit);
        return new ResponseEntity<>(produit.getId(), HttpStatus.OK);
    }
}
