import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendReplyToTicket } from '../api/apiUtils';
import apiClient from '../api/apiUtils';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [replies, setReplies] = useState({});
  const navigate = useNavigate();

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await apiClient.get('/tickets');
        setTickets(response.data.tickets || []);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        alert('Failed to load tickets');
      }
    };

    fetchTickets();
  }, []);

  // Handle reply to a ticket
  const handleReply = async (ticketId) => {
    const reply = replies[ticketId];
    if (!reply || reply.trim() === '') {
      alert('Reply cannot be empty!');
      return;
    }

    try {
      await sendReplyToTicket(ticketId, reply);
      alert('Reply sent successfully');
      setReplies((prevReplies) => ({ ...prevReplies, [ticketId]: '' }));
      // Optionally, refresh tickets to reflect the update
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    }
  };

  // Handle reply input change
  const handleReplyChange = (ticketId, value) => {
    setReplies((prevReplies) => ({ ...prevReplies, [ticketId]: value }));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Full-Width Navbar */}
      <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 shadow-lg w-full">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  {ticket.subject}
                </h3>
                <p className="text-gray-700">{ticket.description}</p>
                <p className="text-gray-500 mt-2">
                  Status: <span className="font-bold">{ticket.status}</span>
                </p>
                <p className="text-gray-500 mt-2">
                  Customer ID: {ticket.customerId}
                </p>

                {/* Reply Section */}
                <textarea
                  placeholder="Write your reply here"
                  value={replies[ticket.id] || ''}
                  onChange={(e) => handleReplyChange(ticket.id, e.target.value)}
                  className="border-gray-300 border rounded-lg p-2 w-full mt-4 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition duration-300"
                  onClick={() => handleReply(ticket.id)}
                >
                  Send Reply
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-500 col-span-full">
              No tickets available
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
