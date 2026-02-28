"use client";

import { useCallback, useEffect, useState } from "react";

interface TempMailResponse {
  email: string;
  id: string;
}

interface UseTempMailReturn {
  email: string | null;
  emailId: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

export function useTempMail(): UseTempMailReturn {
  const [email, setEmail] = useState<string | null>(null);
  const [emailId, setEmailId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMail = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      // POST para crear email
      const res = await fetch("/api/mail", {
        method: "POST",
        cache: "no-store",
      });

      const data: TempMailResponse = await res.json();

      console.log("TEMP MAIL ", data);

      setEmail(data.email);
      setEmailId(data.id);
    } catch (error) {
      console.error("Error fetching temp mail:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMail();

    const interval = setInterval(fetchMail, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchMail]);

  return { email, emailId, loading, refresh: fetchMail };
}