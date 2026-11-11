import { settingsSimulationStore } from "@stores/settings";

const REQUEST_TIMEOUT_MS = 60_000;

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }

  /** The API key is missing, invalid, or lacks the required permission. */
  get isAuthError(): boolean {
    return this.status === 401 || this.status === 403;
  }

  /** The requested model cannot be served for this account. */
  get isModelError(): boolean {
    return (
      this.code === "model_not_supported" ||
      this.code === "model_not_found" ||
      this.status === 404
    );
  }
}

function extractError(payload: unknown): { message?: string; code?: string } {
  if (typeof payload !== "object" || payload === null) return {};
  const error = (payload as { error?: unknown }).error;

  if (typeof error === "string") return { message: error };
  if (typeof error === "object" && error !== null) {
    const { message, code } = error as { message?: unknown; code?: unknown };
    return {
      message: typeof message === "string" ? message : undefined,
      code: typeof code === "string" ? code : undefined,
    };
  }
  return {};
}

export async function hfPost<T>(url: string, body: unknown): Promise<T> {
  const apiKey = settingsSimulationStore.get().apiKey?.trim();

  if (!apiKey) {
    throw new ApiError("No Hugging Face API key has been set.", 401);
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    const timedOut =
      error instanceof DOMException && error.name === "TimeoutError";
    throw new ApiError(
      timedOut
        ? "The request to Hugging Face timed out."
        : "Hugging Face could not be reached. Check your network connection.",
      0,
    );
  }

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const { message, code } = extractError(payload);
    throw new ApiError(
      message ?? `Request failed with status ${response.status}.`,
      response.status,
      code,
    );
  }

  return payload as T;
}
