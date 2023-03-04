package com.persistances.donnees.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.persistances.donnees.entity.Categorie;

public interface CategorieRepository extends JpaRepository <Categorie, Long> {
    
}
