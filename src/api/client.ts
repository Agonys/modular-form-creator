import type { ApiError } from '@/types/resource'

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
    ...init,
  })

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as ApiError | null

    throw {
      name: 'ApiError',
      message: error?.message ?? 'Unknown error',
      status: response.status,
      details: error?.details,
    }
  }

  return response.json()
}

const createMethod =
  (method: RequestInit['method']) =>
  <T>(path: string, body?: unknown) =>
    api<T>(path, {
      method,
      ...(body !== undefined && {
        body: JSON.stringify(body),
      }),
    })

export const apiClient = {
  get: <T>(path: string) => api<T>(path),

  post: createMethod('POST'),
  patch: createMethod('PATCH'),
  put: createMethod('PUT'),
  delete: createMethod('DELETE'),
}
