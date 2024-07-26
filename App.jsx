import React, { useState } from 'react';
import './App.css';
import UserForm from './assets/components/UserForm';
import UserTable from './assets/components/UserTable';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  const addUser = (user) => {
    const existingUser = users.find(u => u.username === user.username);
    if (existingUser && (!currentUser || currentUser.username !== user.username)) {
      setError('Username already exists!');
      return;
    }

    setError('');
    if (currentUser) {
      setUsers(users.map((u) => (u.id === currentUser.id ? { ...user, id: currentUser.id } : u)));
      setCurrentUser(null);
    } else {
      setUsers([...users, { ...user, id: uuidv4() }]);
    }
  };

  const editUser = (id) => {
    const user = users.find((u) => u.id === id);
    setCurrentUser(user);
    setError('');
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    setError('');
  };

  return (
    <div className="App">
      <h1>User Information</h1>
      <UserForm addUser={addUser} currentUser={currentUser} />
      {error && <p className="error-message">{error}</p>}
      <UserTable users={users} editUser={editUser} deleteUser={deleteUser} />
    </div>
  );
}

export default App;