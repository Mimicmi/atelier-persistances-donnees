package com.persistances.donnees.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;

@Entity
@Table(name = "produits")
public class Produit {
    
    @Id
    @GeneratedValue
    private Long id;

    @ManyToMany(fetch = FetchType.LAZY, 
        cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
        })
    @JoinTable(name = "magasin_produit",
        joinColumns = { @JoinColumn(name = "produit_id") },
        inverseJoinColumns = { @JoinColumn(name = "magasin_id") })
    Set <Magasin> magasin = new HashSet<>();

    private String label;
    private int prix;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "categorie_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Categorie categorie;

    public Produit() {
    }

    public Produit(Long id, Set<Magasin> magasin, String label, int prix, String description, Categorie categorie) {
        this.id = id;
        this.magasin = magasin;
        this.label = label;
        this.prix = prix;
        this.description = description;
        this.categorie = categorie;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Magasin> getMagasin() {
        return this.magasin;
    }

    public void setMagasin(Set<Magasin> magasin) {
        this.magasin = magasin;
    }

    public String getLabel() {
        return this.label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getPrix() {
        return this.prix;
    }

    public void setPrix(int prix) {
        this.prix = prix;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Categorie getCategorie() {
        return this.categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }
}
