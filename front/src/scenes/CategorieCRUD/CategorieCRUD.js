import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Api from '../../Api';

function CategorieCRUD() {

    const [categories, setCategories] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentSpecies, setCurrentCategories] = useState({});

    const updtedCategorieTable = () => {
        Api.get('species')
            .then((res) => {
                setCategories(res.data)
            })
            .catch((error) => {
            })
    }

    useEffect(() => updtedCategorieTable, []);

    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => {
        setCurrentCategories({})
        setShowAddModal(true);
    }
    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalShow = (shops) => {
        setCurrentCategories(shops);
        setShowEditModal(true);
    };

    const handleAddCategorie = (shop) => {
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

    const handleEditCategorie = (shops) => {
        // Mise à jour d'une espèce existante dans la table "Species"
        Api.put(`species/${shops.id}`, shops)
            .then(res => {
                //TODO : vérification que tu c'est bien passé
                updtedSpecieTable()
            });
        handleEditModalClose();
    };

    const handleDeleteCategories = (id) => {
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
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(categorie => (
                        <tr key={categorie.id}>
                            <td>{categorie.label}</td>
                            
                            <td className='d-flex'>
                                <Button variant="warning" onClick={() => handleEditModalShow(categorie)}>Editer</Button>{' '}
                                <Button variant="danger" onClick={() => (categorie.id)}>Supprimer</Button>
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
                            <Form.Control type="text" placeholder="Entrer le nom de l'espèce" onChange={e => setCurrentCategories({ ...currentSpecies, specie: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" placeholder="Entrer la description de l'espèce" onChange={e => setCurrentCategories({ ...currentSpecies, description: e.target.value })} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddModalClose}>Fermer</Button>
                    <Button variant="primary" onClick={() => handleAddCategorie(currentSpecies)}>Ajouter</Button>
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
                            <Form.Control type="text" defaultValue={currentSpecies.specie} onChange={e => setCurrentCategories({ ...currentSpecies, specie: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" defaultValue={currentSpecies.description} onChange={e => setCurrentCategories({ ...currentSpecies, description: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>Fermer</Button>
                    <Button variant="primary" onClick={() => handleEditCategorie(currentSpecies)}>Enregistrer</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
export default CategorieCRUD;


