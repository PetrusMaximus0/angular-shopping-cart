export interface ILoadingState<T> {
  error: Error | null;
  data: T | null;
}
