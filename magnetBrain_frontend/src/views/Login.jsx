import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const LoginScreen = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login({ username, password });
      localStorage.setItem('token', token);
      setToken(token); // <-- this triggers re-render
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen gap-6 px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <h6 className="text-sm mt-1">Hello Team, this is my task for the Competency Assessment Round.</h6>
      </div>

      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-white">Sign In</h3>
          <h6 className="text-sm text-gray-300">Sign in and start managing your tasks.</h6>
        </div>

        {error && <p className="text-red-400 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right text-sm">
            <a href="/register" className="text-indigo-300 hover:underline">Register</a>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 border border-white rounded text-white hover:bg-white hover:text-black transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
