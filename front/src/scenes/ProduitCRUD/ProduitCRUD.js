import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Api from '../../Api';

function ProduitCRUD() {

    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentProduit, setcurrentProduit] = useState({});

    const updtedProduitTable = () => {
        Api.get('species')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((error) => {
            })
    }

    useEffect(() => updtedProduitTable, []);

    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => {
        setcurrentProduit({})
        setShowAddModal(true);
    }
    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalShow = (shops) => {
        setcurrentProduit(shops);
        setShowEditModal(true);
    };

    const handleAddShop = (shop) => {
        // Ajout d'une nouvelle espèce à la table "Species"
        Api.post('species', shop)
            .then((res) => {
                updtedSpecieTable()
                handleAddModalClose()
            })
            .catch((error) => {
                //TODO : vérification que tu c'est bien passé
            })
    };

    const handleDeleteProduit = (shops) => {
        // Mise à jour d'une espèce existante dans la table "Species"
        Api.put(`species/${shops.id}`, shops)
            .then(res => {
                //TODO : vérification que tu c'est bien passé
                updtedSpecieTable()
            });
        handleEditModalClose();
    };

    const handleDeleteProduits = (id) => {
        // Suppression d'une espèce de la table "Species"
        Api.delete(`shops/${id}`)
            .then(res => {
                const updatedShops = shops.filter(item => item.id !== id);
                setShops(updatedShops);
            });
    };

    return (
        <div>
            <Table className='red-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom du magasin</th>
                        <th>Adresse</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.label}</td>
                            <td>{product.Adresse}</td>
                            
                            <td className='d-flex'>
                                <Button variant="warning" onClick={() => handleEditModalShow(product)}>Editer</Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteProduits(product.id)}>Supprimer</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="primary" onClick={handleAddModalShow}>Ajouter une espèce</Button>

            <Modal show={showAddModal} onHide={handleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un magasin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nom du magasin</Form.Label>
                            <Form.Control type="text" placeholder="Entrer le nom de l'espèce" onChange={e => setcurrentProduit({ ...currentProduit, specie: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" placeholder="Entrer la description de l'espèce" onChange={e => setcurrentProduit({ ...currentProduit, description: e.target.value })} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddModalClose}>Fermer</Button>
                    <Button variant="primary" onClick={() => handleAddShop(currentProduit)}>Ajouter</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editer un magasin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nom du magasin</Form.Label>
                            <Form.Control type="text" defaultValue={currentProduit.specie} onChange={e => setcurrentProduit({ ...currentProduit, specie: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" defaultValue={currentProduit.description} onChange={e => setcurrentProduit({ ...currentProduit, description: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>Fermer</Button>
                    <Button variant="primary" onClick={() => handleDeleteProduit(currentProduit)}>Enregistrer</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
export default ProduitCRUD;


