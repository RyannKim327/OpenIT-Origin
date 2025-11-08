const URL = "http://localhost:8000";

const url = (endpoint: string) => {
  const e = endpoint.split("?")[0];
  const p = endpoint.split("?")[1] ?? "";
  if (e.startsWith("/")) {
    e = e.substring(1);
  }
  if (!e.endsWith("/")) {
    e += "/";
  }
  return `${URL}/${e}?${p}`;
};

export function uget() {}
