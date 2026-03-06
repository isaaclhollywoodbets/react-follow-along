import { API_BASE_URL } from "../config";

function getErrorMessage(data: unknown, status: number) {
  if (typeof data === "string" && data) {
    return data;
  }

  if (data && typeof data === "object") {
    const maybeError = data as { message?: unknown; title?: unknown };

    if (typeof maybeError.message === "string" && maybeError.message) {
      return maybeError.message;
    }

    if (typeof maybeError.title === "string" && maybeError.title) {
      return maybeError.title;
    }
  }

  return `Request failed (${status})`;
}

async function readJsonSafe(res: Response): Promise<unknown> {
  if (res.status === 204) return null;

  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = new URL(path, API_BASE_URL).toString();

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const data = await readJsonSafe(res);

  if (!res.ok) {
    const message = getErrorMessage(data, res.status);

    const err = new Error(String(message)) as Error & {
      status?: number;
      data?: unknown;
    };
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}