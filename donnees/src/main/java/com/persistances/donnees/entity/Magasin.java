package com.persistances.donnees.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "magasins")
public class Magasin {
    
    @Id
    @GeneratedValue
    private Long id;

    private String label;
    private String Adresse;

    public Magasin() {
    }

    public Magasin(Long id, String label, String Adresse) {
        this.id = id;
        this.label = label;
        this.Adresse = Adresse;
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

    public String getAdresse() {
        return this.Adresse;
    }

    public void setAdresse(String Adresse) {
        this.Adresse = Adresse;
    }

}
