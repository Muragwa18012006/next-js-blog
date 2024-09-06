import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Eye icons from react-icons

const PasswordInput: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Toggle between showing and hiding the password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="relative w-full">
      <input
        type={passwordVisible ? 'text' : 'password'}
        className="rounded-md px-4 py-2 my-2 w-auto focus:outline-none text-black text-sm"
        placeholder="Enter your password"
      />
      <span
        onClick={togglePasswordVisibility}
        className="absolute right-2 top-2 cursor-pointer"
      >
        {passwordVisible ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
      </span>
    </div>
  );
};

export default PasswordInput;
