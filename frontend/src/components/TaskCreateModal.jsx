import React, { useState } from 'react';

const TaskCreateModal = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        onSubmit({ title, description });
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
                <span className="absolute top-0 right-0 cursor-pointer p-2" onClick={onClose}>&times;</span>
                <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none"
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none"
                />
                <div className="flex justify-end">
                    <button 
                        onClick={handleCancel} 
                        className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded mr-2 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCreateModal;
