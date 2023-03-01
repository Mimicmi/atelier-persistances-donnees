import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Api from '../../Api';

function ShopCRUD() {

    const [shops, setShops] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentSpecies, setCurrentSpecies] = useState({});

    const updtedSpecieTable = () => {
        Api.get('species')
            .then((res) => {
                setShops(res.data)
            })
            .catch((error) => {
            })
    }

    useEffect(() => updtedSpecieTable, []);

    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => {
        setCurrentSpecies({})
        setShowAddModal(true);
    }
    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalShow = (shops) => {
        setCurrentSpecies(shops);
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

    const handleEditShop = (shops) => {
        // Mise à jour d'une espèce existante dans la table "Species"
        Api.put(`species/${shops.id}`, shops)
            .then(res => {
                //TODO : vérification que tu c'est bien passé
                updtedSpecieTable()
            });
        handleEditModalClose();
    };

    const handleDeleteSpecies = (id) => {
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
                        <th>Rentrer</th>
                    </tr>
                </thead>
                <tbody>
                    {shops.map(shop => (
                        <tr key={shop.id}>
                            <td>{shop.label}</td>
                            <td>{shop.Adresse}</td>
                            
                            <td className='d-flex'>
                                <Button variant="warning" onClick={() => handleEditModalShow(shop)}>Editer</Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteSpecies(shop.id)}>Supprimer</Button>
                            </td>

                            <th>Rentrer dans le magasin</th>
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
                            <Form.Control type="text" placeholder="Entrer le nom de l'espèce" onChange={e => setCurrentSpecies({ ...currentSpecies, specie: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" placeholder="Entrer la description de l'espèce" onChange={e => setCurrentSpecies({ ...currentSpecies, description: e.target.value })} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddModalClose}>Fermer</Button>
                    <Button variant="primary" onClick={() => handleAddShop(currentSpecies)}>Ajouter</Button>
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
                            <Form.Control type="text" defaultValue={currentSpecies.specie} onChange={e => setCurrentSpecies({ ...currentSpecies, specie: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" defaultValue={currentSpecies.description} onChange={e => setCurrentSpecies({ ...currentSpecies, description: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>Fermer</Button>
                    <Button variant="primary" onClick={() => handleEditShop(currentSpecies)}>Enregistrer</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
export default ShopCRUD;


