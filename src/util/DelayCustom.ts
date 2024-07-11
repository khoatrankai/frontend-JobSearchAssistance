import React, { useRef } from 'react'

type Props = {}

const DelayCustom = () => {
    const useDebounce = (callback: any, delay: number) => {
        const timeoutRef = useRef<any>(null);

        return (...args: any) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    };
    const useThrottle = (callback:any,delay:number) => {
        const lastCall = useRef<any>(0);
      
        return (...args:any) => {
          const now = new Date().getTime();
          if (now - lastCall.current >= delay) {
            lastCall.current = now;
            callback(...args);
          }
        };
      };
  return {useDebounce,useThrottle}
}

export default DelayCustom