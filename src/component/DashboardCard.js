import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { UserOutlined, AppstoreAddOutlined,  PrinterOutlined,   } from '@ant-design/icons'; // Importez des icônes
import axios from 'axios';

const DashboardCard = () => {
  const [productCount, setProductCount] = useState(0);
  const [operatorCount, setOperatorCount] = useState(0);
  const [sacCount, setSacCount] = useState(0);

  useEffect(() => {
    // Récupérez les données depuis votre API ou source de données
    axios.get('http://localhost:8080/products')
      .then(response => {
        setProductCount(response.data.length); // Obtenez le nombre de produits
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données produit :', error);
      });

    axios.get('http://localhost:8080/operators/')
      .then(response => {
        setOperatorCount(response.data.length); // Obtenez le nombre d'opérateurs
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données opérateurs :', error);
      });

    axios.get('http://localhost:8080/tirages')
      .then(response => {
        setSacCount(response.data.length); // Obtenez le nombre de tirages de sacs
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données tirage sacs :', error);
      });
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Card
          title={<span><AppstoreAddOutlined /> Nombre de produits :</span>}
          bordered={true}
          style={{ backgroundColor: 'rgb(40, 167, 69)' }}
        >
          {productCount}
          {/* Affichez les données produit dans cette carte */}
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card
          title={<span><UserOutlined /> Nombre d'opérateurs :</span>}
          bordered={true}
          style={{ backgroundColor: 'rgb(40, 167, 69)' }}
        >
          {operatorCount}
          {/* Affichez les données opérateurs dans cette carte */}
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card
          title={<span><PrinterOutlined /> Nombre de tirages de sacs :</span>}
          bordered={true}
          style={{ backgroundColor: 'rgb(40, 167, 69)' }}
        >
          {sacCount}
          {/* Affichez les données tirage sacs dans cette carte */}
        </Card>
      </Col>
    </Row>
  );
}

export default DashboardCard;
