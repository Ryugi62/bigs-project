export function jsonOk<T>(data: T, init?: ResponseInit & { status?: number }) {
  const status = init?.status ?? 200;
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
}

export function jsonError(status: number, message?: string, data?: unknown, code?: string) {
  const body = {
    error: {
      message: message || 'Request failed',
      code,
      details: data,
    },
  };
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
