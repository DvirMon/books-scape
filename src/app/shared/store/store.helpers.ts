export function createInitialState<T>(initialState?: T): T {
  return initialState || {} as T;
}

export function withStoreConfiguration(options: { name: string }) : unknown {
  return options
}
