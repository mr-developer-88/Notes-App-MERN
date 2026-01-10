import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-white font-semibold text-sm shadow-md">
            {getInitials(userInfo.fullName)}
        </div>

        <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">{userInfo.fullName}</p>

            <button 
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors mt-0.5" 
              onClick={onLogout}
            >
                Logout
            </button>
        </div>
    </div>
    )
  )
}

export default ProfileInfo