// Simulates network latency so hooks exhibit real loading states.
// Swap these DAL modules for real fetch() calls when the backend is ready.
export function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
