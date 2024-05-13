import React, { useState } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const usersRef = db.collection('users');
      const snapshot = await usersRef.where('username', '==', username).get();

      if (snapshot.empty) {
        setError('Invalid username or password');
        return;
      }

      snapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.password === password) {
          const userInfo = {
            username: userData.username,
          };
          localStorage.setItem('user', JSON.stringify(userInfo));
          navigate('/');
        } else {
          setError('Invalid username or password');
        }
      });
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in');
    }
  };

  return (
    <div className="max-w-sm flex flex-col min-h-screen justify-center mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded-md p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-blue-500 text-white font-bold py-2 rounded-md"
          onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
