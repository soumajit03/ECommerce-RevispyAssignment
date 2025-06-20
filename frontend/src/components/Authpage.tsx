import React, { useState } from 'react';
import { loginUser, registerUser } from '../api';

interface AuthPageProps {
  onLoginSuccess: (email: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerUser(form);
        alert('Registration successful. You can log in now.');
        setIsRegister(false);
      } else {
        const res = await loginUser(form);
        onLoginSuccess(form.email);
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {isRegister ? 'Register' : 'Login'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
        <p
          className="text-sm text-center text-blue-500 cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Already have an account? Login' : 'New here? Register'}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
