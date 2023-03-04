package com.persistances.donnees.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.persistances.donnees.entity.Magasin;

public interface MagasinRepository extends JpaRepository <Magasin, Long>{

}
