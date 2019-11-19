declare global
{
  type Thunk<T> = T | (() => T);

  interface NoProps {}
  interface NoState {}
}

export {};