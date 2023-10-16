import { useState } from 'react';
import { Form, Input, Button, Card, Typography, Watermark } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); //  useNavigate pour la navigation

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/login', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        setErrorMessage('Email ou mot de passe incorrect'); //  le message d'erreur en cas d'échec de connexion
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la connexion : ' + error.message); // le message d'erreur en cas d'erreur de serveur
    }
  };

  const validateEmail = (rule, value, callback) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      callback('Veuillez entrer une adresse email valide');
    } else {
      callback();
    }
  };

  return (
    <Watermark content={['NMA SANDERS', 'Nourrir la vie']}>
    
  
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ maxWidth: '500px', width: '100%', margin: '0 20px', backgroundColor: ' rgb(40, 167, 69)' }}>
        <Title level={3} style={{ textAlign: 'center' }}>Connexion</Title>
        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Veuillez entrer votre adresse email!' },
              { validator: validateEmail, message: 'Veuillez entrer une adresse email valide' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Adresse email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mot de passe"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="default" htmlType="submit">
              Connexion
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </Watermark>
  );
}

export default Login;
