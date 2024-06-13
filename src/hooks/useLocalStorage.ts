export function useLocalStorage(key: string) {
  if (typeof window === "undefined") return null;
  if (!key) throw new Error("useLocalStorage key is required");
  if (typeof key !== "string")
    throw new TypeError("useLocalStorage key must be a string");
  const get = () => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }
    return null;
  };
  const set = (value: any) => {
    if (value === undefined) return;
    localStorage.setItem(key, JSON.stringify(value));
  };
  const remove = () => localStorage.removeItem(key);
  return { get, set, remove };
}
