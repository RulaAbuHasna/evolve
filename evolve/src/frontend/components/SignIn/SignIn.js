import React from 'react';
import { useState } from 'react';
//firebase setup
import { fetchUserDoc } from '../../../backend/firebase.utils';
import { Input, InputLabel } from '@material-ui/core';

export function SignIn() {
    const [uid, setUid] = useState('');
    const [password, setPassword] = useState('');
    const token = window.localStorage.getItem("token");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!uid || !password) {
            alert('Please fill out the form')
            return;
        }

        const userAuth = { uid, password, token }
        fetchUserDoc(userAuth)
            .then((data) => {
                setUid('');
                setPassword('')
                window.location.href = data?.isStudent ? `/student/${data.data.id}` : `/prof/${data.data.id}`;
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className='flex flex-row'>
            <div className='flex-1 h-screen'>
                <img src='https://wallpaper.dog/large/961991.jpg' alt='logo' />
            </div >
            <div className='flex flex-1 justify-center items-center'>
                <form className='flex flex-col place-items-center gap-7 border border-gray-600 rounded p-32'>
                    <div className=''>
                        <InputLabel>
                            ID
                        </InputLabel>
                        <Input value={uid} onChange={(e) => setUid(e.target.value)} />
                    </div>
                    <div>
                        <InputLabel>
                            Password
                        </InputLabel>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                    </div>
                    <button onClick={handleSubmit} className='w-24 h-8 bg-red-500 text-white rounded'>Login</button>
                </form>
            </div>
            <button onClick={() => window.location.pathname = '/home'} className='w-24 h-8 bg-red-500 text-white rounded'>Take a peak</button>
        </div>
    );
}