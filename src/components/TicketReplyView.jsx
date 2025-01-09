import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTicketById } from '../api/apiUtils'; // Import your utility function

const TicketReplyView = () => {
  const { id } = useParams(); // Get the ticket ID from the URL
  const navigate = useNavigate(); // For navigation
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetchTicketById(id); // Call your utility function
        setTicket(response.data); // Set the ticket data
      } catch (err) {
        console.error('Error fetching ticket:', err);
        setError('Failed to fetch ticket details. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="p-4">
        <p className="text-gray-500">No ticket details available.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Ticket Details</h1>
      </header>
      <main className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold">{ticket.subject}</h2>
        <p className="text-gray-600 mt-2">{ticket.description}</p>
        <p className="text-gray-500 mt-4">
          Status: <span className="font-bold">{ticket.status}</span>
        </p>
        {ticket.reply ? (
          <div className="mt-6 bg-green-100 p-4 rounded">
            <h3 className="font-bold text-green-700">Admin's Reply:</h3>
            <p>{ticket.reply}</p>
          </div>
        ) : (
          <p className="text-gray-500 mt-6">No reply from admin yet.</p>
        )}
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </main>
    </div>
  );
};

export default TicketReplyView;
