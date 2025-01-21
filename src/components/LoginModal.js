import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const LoginModal = ({ show, handleClose, onLoginSuccess = () => {} }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in both email and password!');
            return;
        }

        try {
            console.log('Sending login request:', { email, password });
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Login response status:', response.status);

            if (!response.ok) {
                const errorResponse = await response.json();
                console.log('Error response from server:', errorResponse);
                throw new Error(errorResponse.error || 'Invalid credentials or server error');
            }

            const data = await response.json();
            console.log('Login success, received data:', data);
            
            // Simpan token dan username di localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            
            // Panggil onLoginSuccess jika ada
            if (typeof onLoginSuccess === 'function') {
                onLoginSuccess(data.username);
            }
            
            handleClose();
            
            // Optional: Refresh halaman atau update state global
            window.location.reload();
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered dialogClassName='custom-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="loginEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group controlId="loginPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3 w-100">
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;