import React from 'react';
import { useState } from 'react';
//firebase setup
import { fetchUserDoc } from '../../backend/firebase.utils';
import { FormGroup, Input, InputLabel } from '@material-ui/core';

export function SignIn() {
    const [uid, setUid] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const userAuth = { uid, password }

        fetchUserDoc(userAuth)
            .then((data) => {
                setUid('');
                setPassword('')
                window.location.href = data?.isStudent ? `/students/${data.data.id}` : `/profs/${data.data.id}`;
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className='flex flex-row'>
            <div className='flex-1'>
                <img src='https://wallpaper.dog/large/961991.jpg' alt='' />
            </div >
            <form className='flex-1 flex flex-col justify-center place-items-center gap-7'>
                <div className=''>
                    <InputLabel>
                        Your Collage ID
                    </InputLabel>
                    <Input value={uid} onChange={(e) => setUid(e.target.value)} />
                </div>
                <div>
                    <InputLabel>
                        Your Password
                    </InputLabel>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                </div>
                <button onClick={handleSubmit} className='w-24 h-8 bg-red-500 text-white rounded'>Login</button>
            </form>
        </div >
    );
}