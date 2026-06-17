import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';

export const useClientCookies = () => {
  const [cookies, setCookies] = useState<Cookies | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCookies(new Cookies());
  }, []);

  return { cookies, isClient };
};

export const useClientCookie = (cookieName: string) => {
  const { cookies, isClient } = useClientCookies();
  const [cookieValue, setCookieValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isClient && cookies) {
      setCookieValue(cookies.get(cookieName));
    }
  }, [cookies, isClient, cookieName]);

  return { cookieValue, isClient };
};
