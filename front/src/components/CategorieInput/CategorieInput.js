import Api from '../../Api';
import React, { useState, useEffect } from 'react';
import { Form  } from 'react-bootstrap';


const ProduitInput = ({ categorie, setter }) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Api.get('categories' )
            .then(res => res.data)
            .then(
                (result) => {
                    setCategories(result);
                }
            )
    }, [])


    return (
        <div>
            <Form.Group>
                <Form.Label>Catégorie</Form.Label>
                <Form.Select value={categorie} onChange={(event) => setter(event.target.value)}>
                    <option value="" disabled>Selectionner votre produit à ajouter</option>
                    {categories.map(categorieMap => (
                        <option value={categorieMap.id}>{categorieMap.label}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );

}

export default ProduitInput;
