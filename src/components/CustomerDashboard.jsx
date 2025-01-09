import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCustomerTickets, deleteTicket } from '../api/apiUtils';

const CustomerDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch tickets on component mount
  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCustomerTickets();
        setTickets(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch tickets.');
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  // Handle ticket deletion
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteTicket(id);
        setTickets(tickets.filter((ticket) => ticket.id !== id));
        Swal.fire('Deleted!', 'The ticket has been deleted.', 'success');
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete the ticket.');
      }
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Redirect to Add Ticket page
  const handleAddTicket = () => {
    navigate('/customer-dashboard/create');
    toast.success('Ticket added successfully!'); // Show success alert after redirect
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue-500 text-lg">Loading tickets...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Customer Dashboard</h1>
        <div>
          <button
            onClick={handleAddTicket}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 mr-4"
          >
            Add Ticket
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {tickets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 bg-white rounded shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {ticket.subject}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
              <span
                className={`px-3 py-1 text-xs rounded ${
                  ticket.status === 'Open'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                Status: {ticket.status}
              </span>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() =>
                    navigate(`/customer-dashboard/edit/${ticket.id}`)
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">No tickets found.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
