import { BASE_URL } from "../lib/config";

export default async function post<T>(url: string, value: any) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
  const data = await res.json();
  return data as {
    success: boolean;
    data: T;
  };
}
