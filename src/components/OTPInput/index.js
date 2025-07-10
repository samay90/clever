import React, { useRef, useState } from 'react';
import './index.css';
const OtpInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (element, index) => {
    const val = element.value.replace(/\D/, ''); // Only digits
    if (!val) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (onChange) onChange(newOtp.join(''));

    // Move to next input
    if (index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        if (onChange) onChange(newOtp.join(''));
      } else if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '');
    const newOtp = [...otp];
    for (let i = 0; i < length; i++) {
      newOtp[i] = pasteData[i] || '';
    }
    setOtp(newOtp);
    if (onChange) onChange(newOtp.join(''));
    // Focus last filled input
    const lastIndex = newOtp.findIndex((val) => !val);
    if (lastIndex !== -1) {
      inputs.current[lastIndex].focus();
    } else {
      inputs.current[length - 1].focus();
    }
  };

  return (
    <div className="otp_input" onPaste={handlePaste}>
      {otp.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          ref={(el) => (inputs.current[idx] = el)}
          onChange={(e) => handleChange(e.target, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
