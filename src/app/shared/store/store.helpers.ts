export function createInitialState<T>(initialState?: T): T {
  return initialState || {} as T;
}
