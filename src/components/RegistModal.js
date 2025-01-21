import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const RegistModal = ({ show, handleClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError('Please fill in all fields!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed. Try again.');
            }

            setSuccess('Registration successful!');
            setError(null); // Clear error
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.message);
            setSuccess(null); // Clear success
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered dialogClassName='custom-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="registerUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Your Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group controlId="registerEmail" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="registerPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3 w-100">
                        Register
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RegistModal;