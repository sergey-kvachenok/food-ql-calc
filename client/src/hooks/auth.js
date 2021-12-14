import { useState, useCallback, useEffect } from 'react';

const storageName = 'foodCalcData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, email, id) => {
    setToken(jwtToken);
    setEmail(email);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        email,
        token: jwtToken,
        userId: id,
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.email, data.userId);
    }
  }, [login]);

  return { login, logout, token, email, userId };
};
