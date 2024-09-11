import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setname]=useState('')
    const navigate=useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            console.log(`Email: ${email}, Password: ${password}`);
            const {data}= await axios.post('https://bank-api-l3t9.onrender.com/api/register', { name,email, password });
            navigate('/');
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
                            onChange={(e) => setname(e.target.value)}
                            type="email"
                            placeholder='ENTER NAME'
                            className="form-control"
                        />
                    </div>
                </div>
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
                    Register
                </button>
                <button
                    className='btn btn-link'
                    onClick={()=>{
                        navigate('/')
                    }}
                >
                    Back To Home
                </button>
            </div>
        </div>
    );
}

export default RegisterForm;
