package com.persistances.donnees.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
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
        joinColumns = { @JoinColumn(name = "magasin_id") },
        inverseJoinColumns = { @JoinColumn(name = "produit_id") })
    Set <Magasin> projects = new HashSet<Magasin>();

    private String label;
    private String prix;
    private String description;


    public Produit() {
    }

    public Produit(Long id, Set<Magasin> projects, String label, String prix, String description) {
        this.id = id;
        this.projects = projects;
        this.label = label;
        this.prix = prix;
        this.description = description;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Magasin> getProjects() {
        return this.projects;
    }

    public void setProjects(Set<Magasin> projects) {
        this.projects = projects;
    }

    public String getLabel() {
        return this.label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getPrix() {
        return this.prix;
    }

    public void setPrix(String prix) {
        this.prix = prix;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
