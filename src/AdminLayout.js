import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined, DashboardOutlined, PrinterOutlined, UserOutlined, LoginOutlined 
} from '@ant-design/icons';

import { Layout, Menu, Button, theme, Image, Typography, Space } from 'antd';
import TableOperator from './component/TableOperators';

import ProduitComponent from './component/ProduitComponent';
import { Footer } from 'antd/es/layout/layout';
import TirageComponent from './component/TiragesComponent';
import DashboardCard from './component/DashboardCard';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {

    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();

  // Fonction de déconnexion
  const handleLogout = () => {
    // Ici, vous devez ajouter du code pour effacer les informations d'authentification
    // Par exemple, supprimer le token d'authentification du stockage local.
    // Puis redirigez l'utilisateur vers la page de connexion.
    // Par exemple :
    localStorage.removeItem('authToken'); // Supprimer le token du local storage
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <Layout   style={{
        minHeight: '100vh',
        backgroundColor: '#28a745'
  
      }}>
        <Sider style={{backgroundColor: ' rgb(40, 167, 69)'}}  trigger={null} collapsible collapsed={collapsed}>
          <div  />
          
          <Menu style={{marginTop:'60%', color:'#000d03', backgroundColor: ' rgb(40, 167, 69)'}}
            onClick={({ key }) => {
              if (key === "logout") {
                handleLogout(); // Appeler la fonction de déconnexion
              } else {
                navigate(key);
              }
              }}
              
             // theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              { label: "Dashboard", key: "/dashboard", icon: <DashboardOutlined /> },
              { label: "Operator", key: "/operator", icon: <UserOutlined /> },
              { label: "Produits", key: "/produits", icon: <AppstoreAddOutlined /> },
              { label: "Tirages", key: "/tirages", icon: <PrinterOutlined /> },
             
            ]}
          />
          
        </Sider>
        <Layout>
        <Header
    style={{
      display: 'flex',
      justifyContent: 'space-between', // Aligner les éléments horizontalement
      alignItems: 'center',
      padding: '4px 20px 4px 12px',
      background: colorBgContainer,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Image width={50} src="https://nmasanders.com/wp-content/uploads/2020/11/logo.png" />
      <Typography.Title style={{ fontSize: '26px', margin: '0 500px', textAlign: 'center'}}>
        Gestion des tries de sacs
      </Typography.Title>
    </div>
    <Space>
      <LoginOutlined style={{ fontSize: 20 }} />
    </Space>
  </Header>
  
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
  
  <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/operator" element={<Operator />} />
      <Route path="/produits" element={<Produits />} />
      <Route path="/tirages" element={<Tirages />} />
  </Routes>
          </Content>
          <Footer style={{ textAlign: 'center',color:'black', backgroundColor: ' rgb(255, 253, 252)'}}>
            © 2023 NMA Sanders – Tous droits réservés
          </Footer>
        </Layout>
      </Layout>
    );
  };
  function Dashboard() {
    return (
    <div>
     <DashboardCard />
    </div>
    );
    }  
    
    function Operator() {
    return (
    <div>
    <TableOperator />
    </div>
    );
    }
    
    function Produits() {
    return (
    <div>
    <ProduitComponent />
    </div>
    );
    }
    
    function Tirages() {
    return (
    <div>
    <h2>Tirages</h2>
      <TirageComponent />
    </div>
    );
    }
  


export default AdminLayout