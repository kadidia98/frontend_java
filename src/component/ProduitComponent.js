import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification, Select } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Column } = Table;

const ProduitComponent = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products'); // URL API
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  const handleAddProduct = async (values) => {
    try {
      await axios.post('http://localhost:8080/product', values);   
       
      
      fetchData();
      form.resetFields();
      setVisible(false);
      notification.success({
        message: 'Le produit est ajouté dans la liste',
        description: 'Le produit a été ajouté avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'ajout du produit.',
      });
    }
  };

  const handleEditProduct = async (values) => {
    try {
      await axios.put(`http://localhost:8080/product`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      fetchData();
      form.resetFields();
      setVisible(false);
      notification.success({
        message: 'Le produit est modifié dans la liste',
        description: 'Le produit a été modifié avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de la modification du produit:', error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de la modification du produit.',
      });
    }
  };
  

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/product/${productId.id}`); // URL API
      fetchData();
      notification.success({
        message: 'le produit est supprimé dans la liste',
        description: 'le produit a été supprimer avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de la suppression du produit.',
      });
    }
  };

  const showEditModal = (product) => {
    setEditingProduct(product);
    setVisible(true);
  };

  const showAddModal = () => {
    setEditingProduct(null);
    setVisible(true);
  };

  return (
    <div>
      <h1>Liste des produits</h1>
      <Button type="default" onClick={showAddModal}>Ajouter un produit</Button>

      <Table dataSource={products}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Libellé" dataIndex="libelle" key="libelle" />
        <Column title="Colisage" dataIndex="colisage" key="colisage" />
        <Column title="Famille" dataIndex="famille" key="famille" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <span>
              <Button type="link" icon={<EditOutlined />} onClick={() => showEditModal(record)}></Button>
              <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDeleteProduct(record)}></Button>
            </span>
          )}
        />
      </Table>

      <Modal
        title={editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          name="productForm"
          onFinish={editingProduct ? handleEditProduct : handleAddProduct}
          initialValues={editingProduct}
        >
          <Form.Item
            name="libelle"
            label="Libellé"
            rules={[{ required: true, message: 'Veuillez saisir le libellé du produit' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="colisage"
            label="Colisage"
            rules={[{ required: true, message: 'Veuillez saisir le colisage du produit' }]}
          >
             <Select placeholder="Sélectionnez le colisage">
              <Select.Option value="sac de 50kg">Sac de 50kg</Select.Option>
              <Select.Option value="sac de 40kg">Sac de 40kg</Select.Option>
              <Select.Option value="sac de 10kg">Sac de 10kg</Select.Option>
             </Select>
           
          </Form.Item>

          <Form.Item
            name="famille"
            label="Famille"
            rules={[{ required: true, message: 'Veuillez sélectionner la famille du produit' }]}
          >
            <Select placeholder="Sélectionnez la famille">
              <Select.Option value="aliment_betail">Aliment bétail</Select.Option>
              <Select.Option value="aliment_volaille">Aliment volaille</Select.Option>
              <Select.Option value="farine">Farine</Select.Option>
              <Select.Option value="pate">Pâte</Select.Option>
            </Select>
            
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProduct ? 'Modifier' : 'Ajouter'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProduitComponent;
