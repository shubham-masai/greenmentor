import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/user/action';
import { Link,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { isLoading, isError, msg, token } = useSelector((store) => {
        return {
            isLoading: store.userReducer.isLoading,
            isError: store.userReducer.isError,
            msg: store.userReducer.msg,
            token: store.userReducer.token,
        }
    }, shallowEqual)

    useEffect(() => {
        if (msg) {
            if (token) {
                toast.success(msg, { autoClose: 1000, onClose: () => Navigate('/dashboard') });
            } else {
                toast.error(msg, { autoClose: 1000 });
            }
        }
    }, [msg, token]);
    const handleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            email, password
        }
        dispatch(userLogin(obj));
        setEmail("");
        setPassword("");
    };

    return (
        <div className="flex justify-center flex-col items-center p-[1rem]">
            <ToastContainer />
            <h1 className='font-caveats text-[3rem] font-semibold  text-customLogo ' style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}>TaskNinja.</h1>
            <div className="max-w-md w-full bg-white p-8">
                <h2 className="text-[1.5rem] text-center font-poppins font-semibold mb-4">Sign in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email Address'
                            className="mt-1 w-full border border-black rounded-[20rem] p-[0.8rem] pl-[2rem]"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            className="mt-1 w-full border border-black rounded-[20rem] p-[0.8rem] pl-[2rem]"
                        />
                    </div>
                    <button type="submit" className="mt-1 w-full border border-black text-white text-center text-[1rem] font-poppins font-semibold rounded-[20rem] p-[0.8rem] btn">
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-1.082A7.963 7.963 0 0120 12h4c0 6.627-5.373 12-12 12v-4zm-10-1.082V4c-4.418 0-8 3.582-8 8h4a7.963 7.963 0 014-6.291zm14 7.373c.565-.75 1-1.617 1-2.591h-4a7.962 7.962 0 01-3.707-1.709l1.414-1.414C16.612 13.634 17 11.865 17 10c0-3.86-3.14-7-7-7-1.864 0-3.634.389-5.209 1.093l1.414 1.414C7.057 4.503 8.291 4 10 4c3.314 0 6 2.686 6 6 0 1.709-.503 3.243-1.29 4.567z"></path>
                                </svg>
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            <span>Sign in</span>
                        )}
                    </button>
                </form>
                <p className="text-center mt-4">Don't have an account? <Link to="/register" className="text-customLogo font-semibold">Sign up</Link></p>
            </div>
        </div>
    );
};

export default Login;