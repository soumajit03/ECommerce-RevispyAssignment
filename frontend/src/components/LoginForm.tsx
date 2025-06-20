import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (formData: { email: string; password: string }) => void;
  onSwitchToSignUp: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
        Login
      </h2>
      
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          Welcome back to ECOMMERCE
        </h3>
        <p className="text-sm text-gray-600">
          The next gen business marketplace
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            placeholder="Enter"
            className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 ${
              focusedField === 'email'
                ? 'border-gray-400 ring-2 ring-gray-100'
                : 'border-gray-300 hover:border-gray-400'
            } focus:outline-none`}
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter"
              className={`w-full px-4 py-3 pr-12 border rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 ${
                focusedField === 'password'
                  ? 'border-gray-400 ring-2 ring-gray-100'
                  : 'border-gray-300 hover:border-gray-400'
              } focus:outline-none`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <span className="text-sm font-medium">
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 active:bg-gray-900"
        >
          LOGIN
        </button>

        {/* Sign Up Link */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Don't have an Account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-black font-medium hover:underline transition-all duration-200"
            >
              SIGN UP
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;