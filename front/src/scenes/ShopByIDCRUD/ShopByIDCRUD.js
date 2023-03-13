import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Api from '../../Api';

import { useParams } from "react-router-dom";
import CategorieInput from '../../components/CategorieInput/CategorieInput';


function ShopByIDCRUD() {

    const { id_shop } = useParams();

    const [showAddModal, setShowAddModal] = useState(false);
    const [currentProduit, setCurrentProduits] = useState({});
    const [currentCategorie, setCurrentCategorie] = useState("");

    const [produits, setProduits] = useState([]);
    const[stocks, setStocks] = useState({});

    const haveStocks = () => {
        const data = {};
        produits.map(produit => {
            Api.get(`stocks/produit/${produit.id}`)
            .then((res) => {
                data[produit.id] = res.data[0].quantity
            })
            .catch((error) => {
                console.log(error);
            })
        });
        setStocks(data);
        }
        
    const updtedProduitsTable = () => {
        Api.get(id_shop + '/produits')
            .then((res) => {
                setProduits(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => haveStocks, []);
    useEffect(() => updtedProduitsTable, []);


    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => {
        setCurrentProduits({})
        setShowAddModal(true);
    }

    const handleAddCategorie = (shop) => {
        let data = {
            "categorie": {
                "id": 10
            },
            "description": shop.description,
            "label": shop.label,
            "prix": shop.prix
        }

        Api.post('produits?magasinId=' + id_shop , data)
            .then((res) => {
                data = {
                    "quantity": 0,
                    "produit": {
                        "id": res.data.id
                    }
                }
                Api.post('stocks', data)
                .then((res) => {
                    updtedProduitsTable()
                    handleAddModalClose()
                })
                
            })
            .catch((error) => {
                //TODO : vérification que tu c'est bien passé
            })
    };


    const handleDeleteProduits = (id) => {
        // Suppression d'une espèce de la table "Species"
        Api.delete(`produits/${id}`)
            .then(res => {
                const updatedShops = produits.filter(item => item.id !== id);
                setProduits(updatedShops);
            });
    };


        
        


    const handleDecreaseStock = (id) => {
        Api.get(`stocks/produit/${id}`)
        .then((res) => {
            const currentStock = res.data[0];
            const updatedStock = { ...currentStock, quantity: currentStock.quantity - 1 };
            
            const data = {
                "quantity": updatedStock.quantity,
                "produit": {
                    "id": id
                }
            }
            
            Api.put(`stocks/${currentStock.id}`, data)
                .then((res) => {
                    updtedProduitsTable();
                    haveStocks()
                })
        })
        .catch((error) => {
            console.log(error);
        })
    };
    
    const handleIncreaseStock = (id) => {
        Api.get(`stocks/produit/${id}`)
            .then((res) => {
                const currentStock = res.data[0];
                const updatedStock = { ...currentStock, quantity: currentStock.quantity + 1 };
                
                const data = {
                    "quantity": updatedStock.quantity,
                    "produit": {
                        "id": id
                    }
                }
                
                Api.put(`stocks/${currentStock.id}`, data)
                    .then((res) => {
                        updtedProduitsTable();
                        haveStocks()
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    };



    return (
        <div>
            <Table className='red-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Actions</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {produits.map(produit => (
                        <tr key={produit.id}>
                            <td>{produit.id}</td>
                            <td>{produit.label}</td>
                            <td>{produit.prix} €</td>
                            
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteProduits(produit.id)}>Supprimer</Button>
                            </td>

                            <td>
                                <Button variant="success" onClick={() => handleIncreaseStock(produit.id)}>+</Button>{' '}
                                { stocks[produit.id.toString()] > 0 ? (
                                    <Button variant="danger" onClick={() => handleDecreaseStock(produit.id)}>-</Button>
                                ) : (
                                    <Button variant="danger" disabled>-</Button>
                                )}
                                <p>{ stocks[produit.id.toString()] }</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="primary" onClick={handleAddModalShow}>Ajouter un produit</Button>


            <Modal show={showAddModal} onHide={handleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Label</Form.Label>
                        <Form.Control type="text" placeholder="Entrer le nom de l'espèce" onChange={e => setCurrentProduits({ ...currentProduit, label: e.target.value })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Entrer la description de l'espèce" onChange={e => setCurrentProduits({ ...currentProduit, description: e.target.value })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Prix</Form.Label>
                        <Form.Control type="number" placeholder="Entrer la description de l'espèce" onChange={e => setCurrentProduits({ ...currentProduit, prix: e.target.value })} />
                    </Form.Group>
                    
                    <CategorieInput categorie={currentCategorie} setter={setCurrentCategorie}></CategorieInput>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddModalClose}>Fermer</Button>
                    <Button variant="primary" onClick={() => handleAddCategorie(currentProduit)}>Ajouter</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
export default ShopByIDCRUD;