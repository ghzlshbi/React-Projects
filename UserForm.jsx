import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, currentUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^09\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) {
      setError('Invalid phone number!');
      return;
    }
    setError('');
    addUser(formData);
    setFormData({
      username: '',
      name: '',
      phone: '',
      address: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <button type="submit">{currentUser ? 'Update' : 'Add'}</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default UserForm;
