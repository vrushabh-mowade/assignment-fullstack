import React, { useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const showUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<User[]>('http://localhost:3000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.post<User>('http://localhost:3000/user', {
        id: Math.floor(Math.random() * 1000), // Random ID for demonstration
        name: 'New User',
      });
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async () => {
    const userIdToDelete = prompt('Enter user ID to delete');
    if (!userIdToDelete) return;

    const id = parseInt(userIdToDelete, 10);

    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async () => {
    const userIdToUpdate = prompt('Enter user ID to update');
    if (!userIdToUpdate) return;

    const id = parseInt(userIdToUpdate, 10);
    const newName = prompt('Enter new name') || '';

    try {
      await axios.put(`http://localhost:3000/user/${id}`, { name: newName });
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === id ? { ...user, name: newName } : user))
      );
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Your React App</h1>
      <div>
        <button
          onClick={showUsers}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Show Users
        </button>
        <button
          onClick={addUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add User
        </button>
      </div>
      <div>
        <button
          onClick={deleteUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Delete User
        </button>
      </div>
      <div>
        <button
          onClick={updateUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Update User
        </button>
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.name}{' '}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
