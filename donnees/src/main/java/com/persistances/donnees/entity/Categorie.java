package com.persistances.donnees.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "categories")
public class Categorie {
    @Id
    @GeneratedValue
    private Long id;

    private String label;

    public Categorie() {
    }

    public Categorie(Long id, String label) {
        this.id = id;
        this.label = label;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return this.label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

}
