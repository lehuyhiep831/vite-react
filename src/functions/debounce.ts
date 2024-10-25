function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number
): T {
  let timeoutId: number | undefined = undefined;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  } as T;
}

export { debounce };
