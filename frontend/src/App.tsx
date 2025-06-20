import React, { useState } from 'react';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import VerificationForm from './components/VerificationForm';
import LoginForm from './components/LoginForm';
import InterestsPage from './components/InterestsPage';

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

  const handleLogin = (formData: { email: string; password: string }) => {
    console.log('User logged in:', formData);
    setUserData({ name: 'User', email: formData.email, password: '' }); // assuming placeholder name
    setIsLoggedIn(true);
    setCurrentState('interests');
    alert(`Login successful! Email: ${formData.email}`);
  };

  const handleSignUp = (formData: UserData) => {
    setUserData(formData);
    setCurrentState('verification');
    console.log('User signed up:', formData);
  };

  const handleVerification = (code: string) => {
    console.log('Verification code entered:', code);
    setCurrentState('verified');
    alert(`Account verified successfully! Code: ${code}`);
  };

  const handleBackToSignUp = () => {
    setCurrentState('signup');
  };

  const switchToSignUp = () => {
    setCurrentState('signup');
  };

  const switchToLogin = () => {
    setCurrentState('login');
  };

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 shadow bg-white">
        <Header userName={isLoggedIn ? userData?.name : undefined} />
        {/* Future: <Navbar /> can go here */}
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {currentState === 'login' && (
          <LoginForm 
            onLogin={handleLogin}
            onSwitchToSignUp={switchToSignUp}
          />
        )}

        {currentState === 'signup' && (
          <SignUpForm 
            onSignUp={handleSignUp}
            onSwitchToLogin={switchToLogin}
          />
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
          <InterestsPage
            onLogout={handleLogout}
            userEmail={userData.email}
          />
        )}
      </main>
    </div>
  );
}

export default App;
