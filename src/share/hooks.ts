import { Dispatch, Reducer, ReducerState, useEffect, useReducer } from "react";

export const usePatchReducer = function <T, A = Partial<T>>(
  init: T
): [ReducerState<Reducer<T, Partial<T>>>, Dispatch<A>] {
  return useReducer((p, a) => ({ ...p, ...a }), init);
};

export const useDidMount = (f: () => void) => {
  useEffect(f, []);
};
