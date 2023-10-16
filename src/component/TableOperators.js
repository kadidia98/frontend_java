import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Column } = Table;

function TableOperator() {
  // État local pour stocker la liste des opérateurs
  const [operators, setOperators] = useState([]);
  // États pour contrôler l'ouverture des modals
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  // État pour stocker l'opérateur sélectionné
  const [selectedOperator, setSelectedOperator] = useState({});
  // Forme pour gérer les champs du formulaire
  const [form] = Form.useForm();

  // Effet secondaire pour charger la liste des opérateurs depuis l'API au montage
  useEffect(() => {
    fetchOperators();
  }, []);

  // Fonction pour récupérer la liste des opérateurs depuis l'API
  const fetchOperators = async () => {
    try {
      const response = await axios.get('http://localhost:8080/operators/');
      setOperators(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des opérateurs', error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors du chargement des opérateurs.',
      });
    }
  };

  // Gestionnaire de clic pour ouvrir la modal d'ajout
  const handleAddClick = () => {
    setVisibleAdd(true);
  };

  // Gestionnaire de clic pour ouvrir la modal de modification avec l'opérateur sélectionné
  const handleEditClick = (record) => {
    setSelectedOperator(record);
    setVisibleEdit(true);
  };

  // Gestionnaire de clic pour supprimer un opérateur
  const handleDeleteClick = async (record) => {
    try {
      await axios.delete(`http://localhost:8080/operator/${record.id}`);
      fetchOperators(); // Rafraîchir la liste après la suppression
      notification.success({
        message: 'Opérateur supprimé',
        description: 'L\'opérateur a été supprimé avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'opérateur', error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de la suppression de l\'opérateur.',
      });
    }
  };

  // Gestionnaire de soumission pour ajouter un opérateur
  const handleAddOperator = async (values) => {
    try {
      await axios.post('http://localhost:8080/operator/', values);
      fetchOperators(); // Rafraîchir la liste après l'ajout
      setVisibleAdd(false);
      form.resetFields();
      notification.success({
        message: 'Opérateur ajouté',
        description: 'L\'opérateur a été ajouté avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'opérateur', error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'ajout de l\'opérateur.',
      });
    }
  };

  // Gestionnaire de soumission pour modifier un opérateur
  const handleEditOperator = async (values) => {
    try {
      await axios.put(`http://localhost:8080/operator/`, {...values, id: selectedOperator.id});
      fetchOperators(); // Rafraîchir la liste après la modification
      setVisibleEdit(false);
      notification.success({
        message: 'Opérateur modifié',
        description: 'L\'opérateur a été modifié avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de la modification de l\'opérateur', error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de la modification de l\'opérateur.',
      });
    }
  };

  // Rendu de la composante
  return (
    <div>
      <h1>Liste des operateurs</h1>
      {/* Bouton pour ajouter un opérateur */}
      <Button onClick={handleAddClick}>Ajouter un opérateur</Button>
      
      {/* Table pour afficher la liste des opérateurs */}
      <Table dataSource={operators}>
        <Column title="Operateur_id" dataIndex="id" key="id" />
        <Column title="Nom" dataIndex="nom" key="nom" />
        <Column title="Prénom" dataIndex="prenom" key="prenom" />
        <Column title="Téléphone" dataIndex="telephone" key="telephone" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <span>
              {/* Bouton pour modifier un opérateur */}
              <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick(record)}></Button>
              {/* Bouton pour supprimer un opérateur */}
              <Button  type="link" icon={<DeleteOutlined />} onClick={() => handleDeleteClick(record)}></Button>
            </span>
          )}
        />
      </Table>
      
      {/* Modal pour ajouter un opérateur */}
      <Modal
        title="Ajouter un opérateur"
        open={visibleAdd}
        onOk={form.submit}
        onCancel={() => setVisibleAdd(false)}
      >
        <Form form={form} onFinish={handleAddOperator}>
          <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="prenom" label="Prénom" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="telephone" label="Téléphone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Modal pour modifier un opérateur */}
      <Modal
        title="Modifier un opérateur"
        open={visibleEdit}
        onOk={form.submit}
        onCancel={() => setVisibleEdit(false)}
      >
        <Form form={form} onFinish={handleEditOperator} initialValues={selectedOperator}>
          <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="prenom" label="Prénom" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="telephone" label="Téléphone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TableOperator;
