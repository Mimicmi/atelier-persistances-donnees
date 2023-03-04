package com.persistances.donnees.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.persistances.donnees.entity.Stock;

public interface StockRepository extends JpaRepository <Stock, Long> {
    
}
