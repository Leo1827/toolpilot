const BASE_URL = process.env.BOOMLIFY_BASE_URL!;
const API_KEY = process.env.BOOMLIFY_API_KEY!;

if (!BASE_URL) throw new Error("Missing BOOMLIFY_BASE_URL");
if (!API_KEY) throw new Error("Missing BOOMLIFY_API_KEY");

// cliente centralizado (LA CLAVE)
async function boomlifyFetch(
  path: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Boomlify error: ${text}`);
  }

  return res.json();
}

// ================================
// ENDPOINTS LIMPIOS
// ================================

// Crear email
export const createTempEmail = () =>
  boomlifyFetch("/api/v1/emails/create", {
    method: "POST",
  });

// Listar emails
export const listEmails = () =>
  boomlifyFetch("/api/v1/emails");

// Detalle
export const getEmailDetail = (emailId: string) =>
  boomlifyFetch(`/api/v1/emails/${emailId}`);

// Mensajes
export const getEmailMessages = (emailId: string) =>
  boomlifyFetch(`/api/v1/emails/${emailId}/messages`);

// Eliminar
export const deleteEmail = (emailId: string) =>
  boomlifyFetch(`/api/v1/emails/${emailId}`, {
    method: "DELETE",
  });

  