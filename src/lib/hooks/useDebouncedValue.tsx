import { useState } from "react";
import { useDebouncedCallback } from "~/lib/hooks/useDebouncedCallback";

const useDebouncedValue = <T,>(
  initialState: T | (() => T),
  wait?: number,
  leading?: boolean,
): [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  React.Dispatch<React.SetStateAction<T>>,
] => {
  const [state, setState] = useState(initialState);
  return [state, useDebouncedCallback(setState, wait, leading), setState];
};

export default useDebouncedValue;
