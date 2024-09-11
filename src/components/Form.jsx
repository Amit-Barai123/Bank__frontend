import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            console.log(`Email: ${email}, Password: ${password}`);
            const {data}= await axios.post('https://bank-api-l3t9.onrender.com/api/login', { email, password });
            if(data?.user?.role ===1 ){
                localStorage.setItem("adminAuth",JSON.stringify(data));
                navigate('/admin')
            } else {
                localStorage.setItem("userAuth",JSON.stringify(data));
                navigate(`/user/${data?.user?._id}`);
            }
            console.log('Response data:', data);
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    }

    return (
        <div className='form__area'>
            <div>
                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='ENTER YOUR EMAIL'
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='ENTER PASSWORD'
                            className="form-control"
                        />
                    </div>
                </div>
                <button
                    className='btn btn-primary'
                    onClick={handleClick}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Form;
