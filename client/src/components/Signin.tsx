import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/context';

const SignIn: React.FC = () => {
  const { signin } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await signin(values.email, values.password);
      // console.log(values)
      message.success('Sign In successful!');
      navigate('/application'); 
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
      message.error(errorMessage); 
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <div style={{ maxWidth: 300, margin: 'auto', padding: '50px 0' }}>
      <h2>Sign In</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter your email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
          Sign In
          </Button>
        </Form.Item>
      </Form>
      <p style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
