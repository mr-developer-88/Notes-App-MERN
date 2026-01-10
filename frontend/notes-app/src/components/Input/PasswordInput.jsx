import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash} from "react-icons/fa6"

const PasswordInput = ({ value, onChange, placeholder, disabled }) => {

    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        if (disabled) return;
        setIsShowPassword(!isShowPassword);
    };

  return (
    <div className='w-full mb-3'>
        <div className="flex items-center w-full bg-white dark:bg-gray-900 border border-gray-300/80 dark:border-gray-700 rounded-lg px-4 py-1.5 shadow-sm
                        transition-all duration-300
                        focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1 focus-within:ring-offset-gray-50 dark:focus-within:ring-offset-gray-950">
            <input 
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                disabled={disabled}
                className="w-full text-sm bg-transparent py-2.5 mr-3 rounded outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />

            {isShowPassword ? (
                <FaRegEye
                    size={20}
                    className={`cursor-pointer ${disabled ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" : "text-blue-500 hover:text-blue-600"}`}
                    onClick={toggleShowPassword}
                />
            ) : (
                <FaRegEyeSlash
                    size={20}
                    className={`cursor-pointer ${disabled ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" : "text-slate-400 hover:text-slate-300"}`}
                    onClick={toggleShowPassword}
                />
            )}
        </div>
    </div>
  )
}

export default PasswordInput