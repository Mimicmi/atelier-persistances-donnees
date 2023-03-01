import Api from '../../Api';
import React, { useState, useEffect } from 'react';
import { Form  } from 'react-bootstrap';


const ProduitInput = ({ produit, setProduit }) => {

    const [produits, setProduits] = useState([]);

    useEffect(() => {
        Api.get('produit' )
            .then(res => res.data)
            .then(
                (result) => {
                    setProduits(result);
                }
            )
    }, [])


    return (
        <div>
            <Form.Group>
                <Form.Select value={produit} onChange={(event) => setProduit(event.target.value)}>
                    <option value="" disabled>Selectionner votre produit à ajouter</option>
                    {produits.map(produitMap => (
                        <option value={produitMap.id}>{produitMap.label}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );

}

export default ProduitInput;
