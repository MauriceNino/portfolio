import { useEffect, useState } from 'react';

export const useIsSSR = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);

  useEffect(() => {
    setIsSSR(() => false);
  }, []);

  return isSSR;
};
