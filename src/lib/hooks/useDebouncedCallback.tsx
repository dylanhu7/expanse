import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export const useDebouncedCallback = <CallbackArgs extends unknown[]>(
  callback: (...args: CallbackArgs) => void,
  wait = 100,
  leading = false,
): ((...args: CallbackArgs) => void) => {
  const storedCallback = useRef(callback);
  useLayoutEffect(() => {
    storedCallback.current = callback;
  });
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  // Cleans up pending timeouts when the deps change
  useEffect(
    () => () => {
      timeout.current && clearTimeout(timeout.current);
      timeout.current = void 0;
    },
    [wait, leading, storedCallback],
  );

  return useCallback(
    function (...args) {
      const { current } = timeout;
      // Calls on leading edge
      if (current === void 0 && leading) {
        timeout.current = setTimeout(() => {
          timeout.current = void 0;
        }, wait);
        return storedCallback.current.apply(null, args);
      }
      // Clear the timeout every call and start waiting again
      current && clearTimeout(current);
      // Waits for `wait` before invoking the callback
      timeout.current = setTimeout(() => {
        timeout.current = void 0;
        storedCallback.current.apply(null, args);
      }, wait);
    },
    [wait, leading, storedCallback],
  );
};

export const useDebouncedCallbackAsync = <CallbackArgs extends unknown[]>(
  callback: (...args: CallbackArgs) => Promise<void>,
  wait = 100,
  leading = false,
): ((...args: CallbackArgs) => Promise<void>) => {
  const storedCallback = useRef(callback);
  useLayoutEffect(() => {
    storedCallback.current = callback;
  });
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  // Cleans up pending timeouts when the deps change
  useEffect(
    () => () => {
      timeout.current && clearTimeout(timeout.current);
      timeout.current = void 0;
    },
    [wait, leading, storedCallback],
  );

  return useCallback(
    async function (...args) {
      const { current } = timeout;
      // Calls on leading edge
      if (current === void 0 && leading) {
        timeout.current = setTimeout(() => {
          timeout.current = void 0;
        }, wait);
        return storedCallback.current.apply(null, args);
      }
      // Clear the timeout every call and start waiting again
      current && clearTimeout(current);
      // Waits for `wait` before invoking the callback
      timeout.current = setTimeout(() => {
        timeout.current = void 0;
        void storedCallback.current.apply(null, args);
      }, wait);
    },
    [wait, leading, storedCallback],
  );
};
