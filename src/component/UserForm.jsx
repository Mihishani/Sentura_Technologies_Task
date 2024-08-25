import React, { useState, useEffect } from 'react';
import { createUser, updateUser, listUsers, deleteUser } from '../api.js';

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        listUsers()
            .then(response => {
                setUsers(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { name, email };

        if (editingUserId) {
            updateUser(editingUserId, userData)
                .then(() => {
                    setUsers(users.map(user => (user.id === editingUserId ? { ...user, ...userData } : user)));
                    resetForm();
                })
                .catch(error => console.error('Error updating user:', error));
        } else {
            createUser(userData)
                .then(response => {
                    setUsers([...users, response.data]);
                    resetForm();
                })
                .catch(error => console.error('Error creating user:', error));
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setEditingUserId(null);
    };

    const handleEdit = (user) => {
        setName(user.name);
        setEmail(user.email);
        setEditingUserId(user.id);
    };

    const handleDelete = (userId) => {
        deleteUser(userId)
            .then(() => setUsers(users.filter(user => user.id !== userId)))
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">{editingUserId ? 'Edit User' : 'Create User'}</h2>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {editingUserId ? 'Update' : 'Create'}
                </button>
                {editingUserId && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                )}
            </form>

            <h2 className="text-2xl font-bold mb-4">User List</h2>
            {Array.isArray(users) && users.length > 0 ? (
                <ul className="list-disc pl-5">
                    {users.map((user) => (
                        <li key={user.id} className="mb-2">
                            {user.name} - {user.email}
                            <button
                                onClick={() => handleEdit(user)}
                                className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default UserForm;
