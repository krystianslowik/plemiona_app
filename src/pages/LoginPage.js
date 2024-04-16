import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import AuthService from "../services/AuthService";
import { Container, Form, Button, Modal } from "react-bootstrap";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [login, { loading, error: mutationError }] =
    useMutation(LOGIN_MUTATION);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setShowModal(false);

    try {
      const { data } = await login({ variables: { username, password } });
      AuthService.saveUserData(data.login);
      navigate("/dashboard");
    } catch (error) {
      setError(mutationError ? mutationError.message : "Login failed.");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Container className="vh-100 justify-content-center d-flex align-items-center">
        <Form className="col-4" onSubmit={handleSubmit}>
          <h3>plemiona.app</h3>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={handleUsernameChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
            ></Form.Control>
          </Form.Group>
          <Button variant="dark" type="submit" disabled={loading}>
            Log in
          </Button>
        </Form>
        <Modal show={showModal} onHide={handleCloseModal} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Login Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default LoginPage;
