import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/context';

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; name: string; password: string }) => {
    setLoading(true);
    try {
      await signup(values.email, values.name, values.password);
      
      message.success('Signup successful!');
      navigate('/signin');
    } catch (error) {
      message.error((error as Error).message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: 'auto', padding: '50px 0' }}>
      <h2>Sign Up</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item 
          label="Password" 
          name="password" 
          rules={[
            { required: true, message: 'Please enter your password!' },
            { min: 8, message: 'Password must be at least 8 characters long.' },
            { pattern: /[A-Za-z]/, message: 'Password must contain at least one letter.' },
            { pattern: /\d/, message: 'Password must contain at least one number.' },
            { pattern: /[!@#$%^&*]/, message: 'Password must contain at least one special character.' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item 
          label="Confirm Password" 
          name="confirm" 
          dependencies={['password']} 
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <p style={{ textAlign: 'center' }}>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
