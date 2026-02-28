"use client";

type TempMailMessage = {
  id: string;
  subject?: string | null;
  from?: string | null;
};

import { useTempMail } from "../../hooks/useTempMail";
import { useEffect, useState } from "react";
import {
  RefreshCw,
  Copy,
  Mail,
  Inbox,
  Loader2,
} from "lucide-react";

export default function Home() {
  const { email, loading, refresh, emailId } = useTempMail();
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState<TempMailMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // =============================
  // cargar mensajes
  // =============================
    const fetchMessages = async () => {
    if (!emailId) return;

    try {
        setLoadingMessages(true);

        const res = await fetch(`/api/mail/${emailId}/messages`);

        if (!res.ok) {
        console.warn("Inbox no disponible");
        setMessages([]);
        return;
        }

        const data = await res.json();

        const normalized: TempMailMessage[] = Array.isArray(data)
        ? data
        : [];

        setMessages(normalized);
    } catch (err) {
        console.error("Error loading messages", err);
        setMessages([]);
    } finally {
        setLoadingMessages(false);
    }
    };

  // polling inbox
  useEffect(() => {
    if (!emailId) return;

    fetchMessages();
    const interval = setInterval(fetchMessages, 8000);

    return () => clearInterval(interval);
  }, [emailId]);

  // =============================
  // copiar
  // =============================
  const copyEmail = async () => {
    if (!email) return;
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =============================
  // UI
  // =============================
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <header className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-black text-white">
            <Mail size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Temp Mail</h1>
            <p className="text-sm text-zinc-500">
              Correo temporal instantáneo
            </p>
          </div>
        </header>

        {/* EMAIL CARD */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-zinc-500">
              <Loader2 className="animate-spin mr-2" size={18} />
              Generando correo...
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Inbox className="text-zinc-400" size={18} />
                  <p className="font-mono text-sm md:text-base break-all">
                    {email}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    <Copy size={16} />
                    {copied ? "Copiado" : "Copiar"}
                  </button>

                  <button
                    onClick={refresh}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl bg-black text-white hover:opacity-90 transition"
                  >
                    <RefreshCw size={16} />
                    Nuevo
                  </button>
                </div>
              </div>
            </>
          )}
        </section>

        {/* INBOX */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Bandeja de entrada</h2>
            {loadingMessages && (
              <Loader2 className="animate-spin text-zinc-400" size={16} />
            )}
          </div>

          {/* EMPTY */}
          {!loadingMessages && messages.length === 0 && (
            <div className="text-center py-12 text-zinc-500">
              <Inbox className="mx-auto mb-3 opacity-40" size={32} />
              Esperando mensajes…
            </div>
          )}

          {/* LIST */}
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
              >
                <p className="font-medium text-sm">
                  {msg.subject || "(Sin asunto)"}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  {msg.from || "Remitente desconocido"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-xs text-zinc-400 pt-4">
          Email desechable • Auto refresh activo
        </footer>
      </div>
    </main>
  );
}