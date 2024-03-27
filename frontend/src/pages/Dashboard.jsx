import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createTask, getAllTasks, getUserData, updateUserData } from '../redux/dashboard/action';
import TaskCard from '../components/taskCard';
import TaskCreateModal from '../components/TaskCreateModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CLEAR_MSG } from "../redux/dashboard/actionType"
import EditProfileModal from "../components/EditProfileModal";
const Dashboard = () => {
    const username = "User";

    const [showModal, setShowModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);


    const { isLoading, isError, tasks, msg, userData } = useSelector((store) => {
        return {
            isLoading: store.taskReducer.isLoading,
            isError: store.taskReducer.isError,
            tasks: store.taskReducer.tasks,
            msg: store.taskReducer.msg,
            userData: store.taskReducer.userData
        }
    }, shallowEqual)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    }, [])
    useEffect(() => {
        dispatch(getAllTasks());
    }, [])


    useEffect(() => {
        if (msg) {
            toast.info(msg, {
                autoClose: 500,
                onClose: () => {
                    dispatch({ type: CLEAR_MSG });
                }
            });
        }
    }, [msg]);

    const handleCreateTask = (taskData) => {
        dispatch(createTask(taskData));
    };


    const handleEditProfile = () => {
        setShowProfileModal(true);
    };

    const handleCloseProfileModal = () => {
        setShowProfileModal(false);
    };

    const handleSaveProfile = (editedProfile) => {
        dispatch(updateUserData(editedProfile));
        setShowProfileModal(false);
    };


    return (
        <div className=" mx-auto">
            <div className="flex justify-between items-center mb-4 bg-customLogo py-[2rem] pr-[1rem] rounded-lg p-2 overflow-hidden">
                <h2 className="text-2xl font-semibold">Welcome back, {userData?.name}!</h2>
                <div className="flex items-center">
                    {userData?.profileUrl && (
                        <img src={userData.profileUrl} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                    )}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 rounded" onClick={handleEditProfile}>
                        Edit
                    </button>
                </div>
            </div>



            {/* profile below data */}

            <div className="flex justify-between">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>
                </div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={() => setShowModal(true)}>
                        Create Task
                    </button>
                </div>
            </div>


            <div className='mt-[10px]'>
                {tasks && tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <TaskCard
                            key={task._id}  // here
                            {...task}
                            isEven={index % 2 === 0}
                        />
                    ))
                ) : (
                    <p>No tasks found.</p>
                )}
            </div>
            {showModal && <TaskCreateModal onClose={() => setShowModal(false)} onSubmit={handleCreateTask} />}
            {showProfileModal && <EditProfileModal  userData={userData} onClose={handleCloseProfileModal} onSave={handleSaveProfile} />}
            <ToastContainer />
        </div>
    );
}

export default Dashboard;
