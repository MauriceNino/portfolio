import { useEffect, useState } from 'react';

export const useSSRCheck = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);

  useEffect(() => {
    setIsSSR(() => false);
  }, []);

  return isSSR;
};
