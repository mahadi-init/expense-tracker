import { BASE_URL } from "../lib/config";

export default async function get<T>(url: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`);
  const data = await res.json();
  return data;
}
