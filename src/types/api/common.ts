export type ResponseWrapper<T extends string, D> = {
  topic: T;
  data: D;
};
