import React, { useState } from 'react';
import { createTicket } from '../api/apiUtils';
import { useNavigate } from 'react-router-dom';

const CreateTicket = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ticketData = { subject, description };
      const response = await createTicket(ticketData);
      alert(response.message);
      navigate('/customer-dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create ticket.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create a New Ticket</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
