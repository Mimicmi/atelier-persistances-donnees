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

import com.persistances.donnees.entity.Produit;
import com.persistances.donnees.entity.Stock;
import com.persistances.donnees.repository.ProduitRepository;
import com.persistances.donnees.repository.StockRepository;

@RestController
public class StockController {
    
    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @GetMapping("/stocks")
    public ResponseEntity<List<Stock>> getStocks() {
        List<Stock> stocks = stockRepository.findAll();
        return new ResponseEntity<>(stocks, HttpStatus.OK);
    }

    @GetMapping("/stocks/{id}")
    public ResponseEntity<?> getStockById(@PathVariable("id") Long id) {
        Optional<Stock> stock = stockRepository.findById(id);
        if (!stock.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(stock, HttpStatus.OK);
    }

    @PostMapping("/stocks")
    public ResponseEntity<?> createStock(@RequestBody Stock stock) {
        Optional<Produit> produit = produitRepository.findById(stock.getProduit().getId());

        if (!produit.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        stockRepository.save(stock);
        return new ResponseEntity<>(stock, HttpStatus.OK);
    }

    @PutMapping("/stocks/{id}")
    public ResponseEntity<Stock> updateStock(@RequestBody Stock stock, @PathVariable("id") Long id) {
        Optional<Stock> stockData = stockRepository.findById(id);
        Optional<Produit> produit = produitRepository.findById(stock.getProduit().getId());

        if (!produit.isPresent() || !stockData.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        Stock _stock = stockData.get();
        _stock.setProduit(stock.getProduit());
        _stock.setQuantity(stock.getQuantity());
        return new ResponseEntity<Stock>(stockRepository.save(_stock), HttpStatus.OK);
    }

    @DeleteMapping("stocks/{id}")
    public ResponseEntity<?> deleteStock(@PathVariable("id") Long id) {
        try {
            stockRepository.deleteById(id);
            return new ResponseEntity<>("Stock supprimé", HttpStatus.OK);
        } catch (Exception err) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/stocks/produit/{produitId}")
    public List<Stock> getStocksByProduitId(@PathVariable Long produitId) {
        return stockRepository.findByProduitId(produitId);
    }
}
