export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** Czy wysyłka jest skonfigurowana (Supabase + funkcja send-contact-email). */
export const isContactConfigured = Boolean(url && key);

/**
 * Wysyła wiadomość z formularza lub czatu (funkcja Supabase przesyła ją e-mailem do kancelarii).
 * Bez konfiguracji działa w trybie demonstracyjnym: pokazuje sukces, ale niczego nie wysyła.
 */
export async function sendContact(payload: ContactPayload): Promise<void> {
  if (!isContactConfigured) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return;
  }
  const response = await fetch(`${url}/functions/v1/send-contact-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ phone: '', ...payload }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Błąd serwera (${response.status})`);
  }
}
