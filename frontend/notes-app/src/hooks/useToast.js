import { useState, useCallback } from 'react';

const useToast = () => {
  const [toastState, setToastState] = useState({
    isShown: false,
    message: '',
    type: 'add',
  });

  const showToast = useCallback((message, type = 'add') => {
    setToastState({
      isShown: true,
      message,
      type,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToastState({
      isShown: false,
      message: '',
      type: 'add',
    });
  }, []);

  return {
    toastState,
    showToast,
    hideToast,
  };
};

export default useToast;
