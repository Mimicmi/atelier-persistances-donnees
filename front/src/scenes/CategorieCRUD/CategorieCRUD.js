import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Api from '../../Api';

function CategorieCRUD() {

    const [categories, setCategories] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentSpecies, setCurrentCategories] = useState({});

    const updtedCategorieTable = () => {
        Api.get('categories')
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
    const handleEditModalShow = (categories) => {
        setCurrentCategories(categories);
        setShowEditModal(true);
    };

    const handleAddCategorie = (categorie) => {

        Api.post('categories', categorie)
            .then((res) => {
                updtedCategorieTable()
                handleAddModalClose()
            })
            .catch((error) => {
                //TODO : vérification que tu c'est bien passé
            })
    };

    const handleEditCategorie = (categories) => {
        // Mise à jour d'une espèce existante dans la table "Species"
        Api.put(`categories/${categories.id}`, categories)
            .then(res => {
                //TODO : vérification que tu c'est bien passé
                updtedCategorieTable()
            });
        handleEditModalClose();
    };

    const handleDeleteCategories = (id) => {
        // Suppression d'une espèce de la table "Species"
        Api.delete(`categories/${id}`)
            .then(res => {
                const updatedShops = categories.filter(item => item.id !== id);
                setCategories(updatedShops);
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
                            <td>{categorie.id}</td>
                            <td>{categorie.label}</td>
                            
                            <td>
                                <Button variant="warning" onClick={() => handleEditModalShow(categorie)}>Editer</Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteCategories(categorie.id)}>Supprimer</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="primary" onClick={handleAddModalShow}>Ajouter une catégorie</Button>

            <Modal show={showAddModal} onHide={handleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un catégorie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" placeholder="Entrer le nom de l'espèce" onChange={e => setCurrentCategories({ ...currentSpecies, label: e.target.value })} />
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
                    <Modal.Title>Editer une catégorie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nom d'une catégorie</Form.Label>
                            <Form.Control type="text" defaultValue={currentSpecies.specie} onChange={e => setCurrentCategories({ ...currentSpecies, label: e.target.value })} />
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


