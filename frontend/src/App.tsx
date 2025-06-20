import React, { useState } from 'react';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import VerificationForm from './components/VerificationForm';
import LoginForm from './components/LoginForm';
import InterestsPage from './components/InterestsPage';
import { registerUser } from './api'; // ✅ Import the API function

type AppState = 'login' | 'signup' | 'verification' | 'verified' | 'interests';

interface UserData {
  name: string;
  email: string;
  password: string;
}

function App() {
  const [currentState, setCurrentState] = useState<AppState>('login');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  
  const handleLogin = async (formData: { email: string; password: string }) => {
  try {
    const response = await loginUser(formData);
    const { name } = response.data;

    const userData = {
      name,
      email: formData.email,
      password: formData.password, // optional: not needed after login
    };

    setUserData(userData);
    setIsLoggedIn(true);
    setCurrentState('interests');
    alert(`Login successful! Email: ${formData.email}`);
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please try again.');
  }
};


  const handleSignUp = async (formData: UserData) => {
    try {
      await registerUser(formData); // ✅ API call to backend
      setUserData(formData);
      setCurrentState('verification');
      console.log('User signed up and saved to DB:', formData);
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please try again.');
    }
  };

  const handleVerification = (code: string) => {
    console.log('Verification code entered:', code);
    setCurrentState('verified');
    alert(`Account verified successfully! Code: ${code}`);
  };

  const handleBackToSignUp = () => setCurrentState('signup');
  const switchToSignUp = () => setCurrentState('signup');
  const switchToLogin = () => setCurrentState('login');
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentState('login');
    setUserData(null);
  };

  const handleContinueShopping = () => {
    setIsLoggedIn(true);
    setCurrentState('interests');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={isLoggedIn ? userData?.name : undefined} />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {currentState === 'login' && (
          <LoginForm onLogin={handleLogin} onSwitchToSignUp={switchToSignUp} />
        )}

        {currentState === 'signup' && (
          <SignUpForm onSignUp={handleSignUp} onSwitchToLogin={switchToLogin} />
        )}

        {currentState === 'verification' && userData && (
          <VerificationForm
            email={userData.email}
            onBack={handleBackToSignUp}
            onVerify={handleVerification}
          />
        )}

        {currentState === 'verified' && (
          <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome to ECOMMERCE!
            </h2>
            <p className="text-gray-600 mb-6">
              Your account has been successfully verified.
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-black text-white py-3 px-6 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {currentState === 'interests' && isLoggedIn && userData?.email && (
  <InterestsPage onLogout={handleLogout} userEmail={userData.email} />
)}

      </main>
    </div>
  );
}

export default App;
