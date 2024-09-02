import React from 'react'
import { Toaster } from 'react-hot-toast';

const CustomToaster = () => {
  return (
    <Toaster
      toastOptions={{
        error: { className: "text-xs font-semibold text-error bg-[primary]" },
        success: { className: "text-xs font-semibold text-status bg-[primary]" },
        duration: 3000,
        style: {
          color: '#713200',
          fontSize: 'small'
        },
      }}
      reverseOrder={false}
    />
  )
}

export default CustomToaster