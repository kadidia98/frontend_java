import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Column } = Table;

const TirageComponent = () => {
  const [tirages, setTirages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingTirage, setEditingTirage] = useState(null);
  const [products, setProduits] = useState([]);
  const [operators, setOperateurs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const tiragesResponse = await axios.get('http://localhost:8080/tirages');
      const produitsResponse = await axios.get('http://localhost:8080/products');
      const operateursResponse = await axios.get('http://localhost:8080/operators/');
      setTirages(tiragesResponse.data);
      setProduits(produitsResponse.data);
      setOperateurs(operateursResponse.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };
  const handleAddTirage = async (values) => {
    try {
      await axios.post('http://localhost:8080/tirage', values); // URL de l'API
      
      fetchData();
      form.resetFields();
      setVisible(false);
      notification.success({
        message: 'Le tirage est ajouté dans la liste',
        description: 'Le tirage a été ajouté avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du tirage :', error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'ajout du tirage.',
      });
    }
  };

  const handleEditTirage = async (values) => {
    try {
      await axios.put(`http://localhost:8080/tirage`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchData();
      form.resetFields();
      setVisible(false);
      notification.success({
        message: 'Le tirage est modifié dans la liste',
        description: 'Le tirage a été modifié avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de la modification du tirage :', error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de la modification du tirage.',
      });
    }
  };

  const handleDeleteTirage = async (tirageId) => {
    try {
      await axios.delete(`http://localhost:8080/tirage/${tirageId.id}`); // URL de l'API
      fetchData();
      notification.success({
        message: 'Le tirage est supprimé dans la liste',
        description: 'Le tirage a été supprimé avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du tirage :', error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de la suppression du tirage.',
      });
    }
  };

  const showEditModal = (tirage) => {
    setEditingTirage(tirage);
    setVisible(true);
  };

  const showAddModal = () => {
    setEditingTirage(null);
    setVisible(true);
  };

  return (
    <div>
      <h1>Liste des tirages</h1>
      <Button type="default" onClick={showAddModal}>Ajouter un tirage</Button>

      <Table dataSource={tirages}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Nombre de Tirage" dataIndex="nmbr_tirage" key="nmbr_tirage" />
        <Column
         title="Produit"
         dataIndex="product"
         key="product"
         render={(product) => product ? product.libelle : ''}
        />
        <Column
        title="Opérateur"
        dataIndex="operator"
        key="operator"
        render={(operator) => operator ? operator.id : ''}
        />
        <Column title="Date de Tirage" dataIndex="dateTirage" key="dateTirage" />
        <Column title="Heure de Début" dataIndex="heureDebutTirage" key="heureDebutTirage" />
        <Column title="Heure de Fin" dataIndex="heureFinTirage" key="heureFinTirage" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <span>
              <Button type="link" icon={<EditOutlined />} onClick={() => showEditModal(record)}></Button>
              <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDeleteTirage(record)}></Button>
            </span>
          )}
        />
      </Table>

      <Modal
        title={editingTirage ? 'Modifier le tirage' : 'Ajouter un tirage'}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          name="tirageForm"
          onFinish={editingTirage ? handleEditTirage : handleAddTirage}
          initialValues={editingTirage}
        >
          <Form.Item
            name="nmbr_tirage"
            label="Nombre de sac"
            rules={[{ required: true, message: 'Veuillez saisir le numéro de tirage' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
               name="product"
               label="Produit"
                rules={[{ required: true, message: 'Veuillez sélectionner un produit' }]}
          >
          <select>
               {products.map((product) => (
               <option key={product.id} value={product.id}>
                {product.libelle}
               </option>
               ))}
          </select>
        </Form.Item>

        <Form.Item
             name="operator"
             label="Opérateur"
             rules={[{ required: true, message: 'Veuillez sélectionner un opérateur' }]}
        >
        <select>
            {operators.map((operator) => (
            <option key={operator.id} value={operator.id}>
             {operator.id}
            </option>
              ))}
        </select>
        </Form.Item>

          <Form.Item
            name="dateTirage"
            label="Date de Tirage"
            rules={[{ required: true, message: 'Veuillez sélectionner la date de tirage' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="heureDebutTirage"
            label="Heure de Début"
            rules={[{ required: true, message: 'Veuillez saisir l\'heure de début' }]}
          >
            <Input type="time" />
          </Form.Item>

          <Form.Item
            name="heureFinTirage"
            label="Heure de Fin"
            rules={[{ required: true, message: 'Veuillez saisir l\'heure de fin' }]}
          >
            <Input type="time" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTirage ? 'Modifier' : 'Ajouter'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TirageComponent;
