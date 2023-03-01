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

    @GetMapping("magasins/{id}")
    public ResponseEntity<Magasin> getMagasinById(@PathVariable("id") Long id) {
        Optional<Magasin> magasin = magasinRepository.findById(id);

        if (!magasin.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(magasin.get(), HttpStatus.OK);
    }

    @PostMapping("magasins")
    public ResponseEntity<?> createMagasin(@RequestBody Magasin magasin) {
        magasinRepository.save(magasin);
        return new ResponseEntity<>(magasin.getId(), HttpStatus.CREATED);
    }

    @DeleteMapping("magasins/{id}")
    public ResponseEntity<?> deleteMagasin(@PathVariable("id") Long id) {
        try {
            magasinRepository.deleteById(id);
            return new ResponseEntity<>("Magasin supprimé", HttpStatus.OK);
        } catch (Exception err) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("magasins/{id}")
    public ResponseEntity<Magasin> updateMagasin(@PathVariable("id") Long id, @RequestBody Magasin magasin) {
        Optional<Magasin> magasinData = magasinRepository.findById(id);

        if(!magasinData.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        Magasin _magasin = magasinData.get();
        _magasin.setAdresse(magasin.getAdresse());
        _magasin.setLabel(magasin.getLabel());
        return new ResponseEntity<>(magasinRepository.save(_magasin), HttpStatus.OK);
    }
}