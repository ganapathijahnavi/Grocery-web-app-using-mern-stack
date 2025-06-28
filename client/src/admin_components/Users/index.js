import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 1100px;
  margin: 10vh auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Total = styled.p`
  font-size: 1rem;
  color: #444;
  margin-bottom: 2rem;
`;

const UserCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-left: 6px solid #007bff;
  border-radius: 10px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  transition: 0.2s ease-in-out;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  }
`;

const Row = styled.p`
  margin: 6px 0;
  font-size: 15px;
  color: #333;

  span {
    font-weight: 600;
    color: #111;
  }
`;

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminJwtToken");

    if (!token) {
      console.error("⚠️ No admin token found");
      return;
    }

    axios
      .get("http://localhost:5100/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) =>
        console.error("Error fetching users:", err.response?.data || err.message)
      );
  }, []);

  return (
    <Container>
      <Title>Registered Users</Title>
      <Total><strong>Total Users:</strong> {users.length}</Total>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <UserCard key={user._id}>
            <Row><span>User ID:</span> {user._id}</Row>
            <Row><span>Username:</span> {user.username}</Row>
            <Row><span>Email:</span> {user.email}</Row>
          </UserCard>
        ))
      )}
    </Container>
  );
};

export default Users;
