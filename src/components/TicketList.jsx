import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../api/apiUtils';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await fetchTickets();
        setTickets(response.data.tickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, []);

  const handleUpdate = (id) => {
    alert(`Update ticket with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete ticket with ID: ${id}`);
  };

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ticket List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{ticket.id}</td>
                <td className="border px-4 py-2">{ticket.subject}</td>
                <td className="border px-4 py-2">{ticket.description}</td>
                <td className="border px-4 py-2 text-center">
                  {ticket.status}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleUpdate(ticket.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketList;
