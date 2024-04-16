import React, { useState } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      username
      roles
    }
  }
`;

const AddUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [createUser, { error }] = useMutation(CREATE_USER);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [serverError, setServerError] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setFormErrors([]);
    setServerError("");

    if (!name || !username || !password || roles.length === 0) {
      setFormErrors(["Please fill in all fields."]);
      setShowModal(true);
      return;
    }

    try {
      const { data } = await createUser({
        variables: {
          input: {
            name,
            username,
            password,
            roles,
            settings: { tribe: 1, player: 33 },
          },
        },
      });

      setUserData(data.createUser);
      setShowModal(true);
      setName("");
      setUsername("");
      setPassword("");
      setRoles([]);
    } catch (error) {
      console.error("Failed to create user:", error);
      setServerError("Server error: \n " + error.message);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserData(null);
    setFormErrors([]);
    setServerError("");
  };

  return (
    <Container>
      <h2>Add User</h2>
      <Form onSubmit={handleCreateUser}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="roles">
          <Form.Label>Roles</Form.Label>
          <Form.Control
            type="text"
            value={roles}
            onChange={(e) => setRoles(e.target.value.split(","))}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Create User
        </Button>
      </Form>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formErrors.length > 0 && (
            <div className="text-danger">
              {formErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          {error && <div className="text-danger">{error.message}</div>}
          {serverError && <div className="text-danger">{serverError}</div>}
          {userData && (
            <table className="table">
              <tbody>
                <tr>
                  <td>ID:</td>
                  <td>{userData.id}</td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>{userData.name}</td>
                </tr>
                <tr>
                  <td>Username:</td>
                  <td>{userData.username}</td>
                </tr>
                <tr>
                  <td>Roles:</td>
                  <td>{userData.roles.join(", ")}</td>
                </tr>
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddUser;
