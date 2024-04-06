
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, editTaskStatus } from '../redux/dashboard/action';

const TaskCard = ({ _id, title, description, createdAt, updatedAt, status, isEven }) => {
    const token = localStorage.getItem("token");
    const [showDescription, setShowDescription] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    const handleClick = () => {
        setShowDescription(!showDescription);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const closeEdit = () => {
        setEditMode(false);
    }
    const handleSave = (e) => {
        e.preventDefault();
        let obj = {
            title: editedTitle,
            description: editedDescription
        }
        dispatch(editTask(_id, obj,token));
        setEditMode(false);
    };

    const toggleStatus = () => {
        dispatch(editTaskStatus(_id,token));
    }

    const handleDelete = () => {
        dispatch(deleteTask(_id,token));
    }
    return (
        <div className={`border p-4 mb-4 rounded-lg ${isEven ? 'bg-customLogo text-white' : 'bg-gray-200 text-black'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="flex-grow md:w-3/4 ">
                    {editMode ? (
                        <div className='flex flex-col'>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => { setEditedTitle(e.target.value) }}
                                className="text-lg font-semibold mb-2 focus:outline-none text-black w-[90%]"
                            />
                            <textarea
                                value={editedDescription}
                                onChange={(e) => { setEditedDescription(e.target.value) }}
                                className="text-sm mt-2 focus:outline-none border border-gray-400 p-1 text-black w-[90%]"
                            />
                        </div>
                    ) : (
                        <>
                            <h3 className="text-lg font-semibold mb-2">{title}</h3>
                            {showDescription ? (
                                <>
                                    <p className="text-sm font-poppins cursor-pointer" onClick={handleClick}>
                                        Less Description
                                    </p>
                                    <p className="text-sm mt-2">{description}</p>
                                </>
                            ) : (
                                <p className="text-sm cursor-pointer font-poppins" onClick={handleClick}>
                                    Show Description
                                </p>
                            )}
                        </>
                    )}
                    <p className="text-xs mt-2">
                        Updated: {new Date(updatedAt).toLocaleString()}
                    </p>
                    <p className="text-xs mt-2">
                        Created: {new Date(createdAt).toLocaleString()}
                    </p>
                </div>

                <div className='flex mt-[1rem] flex-col item-end md:w-0.5/4'>

                    <button className={`text-xs px-2 py-1 rounded-md ${status ? 'bg-green-500' : 'bg-blue-500'} text-white mb-2`} onClick={toggleStatus}>
                        {status ? 'Complete' : 'In Progress'}
                    </button>
                    {editMode ? (
                        <>
                            <button onClick={handleSave} className="text-xs px-2 py-1 bg-yellow-500 text-white rounded-md mb-2">
                                Save
                            </button>
                            <button onClick={closeEdit} className="text-xs px-2 py-1 bg-yellow-500 text-white rounded-md mb-2">
                                cancle
                            </button>
                        </>
                    ) : (
                        <button onClick={handleEdit} className="text-xs px-2 py-1 bg-yellow-500 text-white rounded-md mb-2">
                            Edit
                        </button>
                    )}
                    <button className="text-xs px-2 py-1 bg-red-500 text-white rounded-md" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
