import React, { useState, useRef, useEffect } from 'react';

interface VerificationFormProps {
  email: string;
  onBack: () => void;
  onVerify: (code: string) => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ email, onBack, onVerify }) => {
  const [code, setCode] = useState(['', '', '', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showCode, setShowCode] = useState(false);

  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    if (username.length <= 3) return email;
    const maskedUsername = username.substring(0, 3) + '*'.repeat(username.length - 3);
    return `${maskedUsername}@${domain}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length && i < 8; i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 7 : Math.min(nextEmptyIndex, 7);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 8) {
      onVerify(fullCode);
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-10">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
        Verify your email
      </h2>

      <p className="text-center text-gray-600 mb-8 leading-relaxed">
        Enter the 8 digit code you have received on<br />
        <span className="font-medium text-gray-900">{maskEmail(email)}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Code
            </label>
            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <span className="font-medium">{showCode ? 'Hide' : 'Show'}</span>
            </button>
          </div>
          <div className="flex justify-center space-x-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el; }}
                type={showCode ? "text" : "password"}
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-400 transition-all duration-200 hover:border-gray-400"
                autoComplete="off"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isCodeComplete}
          className={`w-full py-3 px-4 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
            isCodeComplete
              ? 'bg-black text-white hover:bg-gray-800 active:bg-gray-900'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          VERIFY
        </button>
      </form>

      <div className="text-center pt-6">
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
        >
          ← Back to sign up
        </button>
      </div>
    </div>
  );
};

export default VerificationForm;