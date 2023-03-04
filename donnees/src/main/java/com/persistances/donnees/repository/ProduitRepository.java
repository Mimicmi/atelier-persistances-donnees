package com.persistances.donnees.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.persistances.donnees.entity.Produit;

public interface ProduitRepository extends JpaRepository <Produit, List> {
    
}
