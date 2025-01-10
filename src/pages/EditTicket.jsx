import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTicketById, updateTicket } from '../api/apiUtils';

const EditTicket = () => {
  const { id } = useParams();
  console.log('Ticket ID:', id);
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    subject: '',
    description: '',
    status: 'Open', // Default value
  });
  const [error, setError] = useState(null);

  // Fetch ticket details when component loads
  useEffect(() => {
    const loadTicket = async () => {
      try {
        const { data } = await fetchTicketById(id);
        setTicket(data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch ticket.');
      }
    };
    loadTicket();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTicket(id, ticket); // Update the ticket
      alert('Ticket updated successfully');
      navigate('/customer-dashboard'); // Navigate back to dashboard
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update ticket.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Ticket</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Subject</label>
          <input
            type="text"
            value={ticket.subject}
            onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={ticket.description}
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={ticket.status}
            onChange={(e) => setTicket({ ...ticket, status: e.target.value })}
            className="w-full border rounded px-2 py-1"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Ticket
        </button>
      </form>
    </div>
  );
};

export default EditTicket;
