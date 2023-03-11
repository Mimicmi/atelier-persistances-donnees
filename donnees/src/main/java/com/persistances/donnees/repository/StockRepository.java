package com.persistances.donnees.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.persistances.donnees.entity.Stock;

import java.util.List;

public interface StockRepository extends JpaRepository <Stock, Long> {
    List<Stock> findByProduitId(Long produitId);
}
