import { NextResponse } from "next/server";
import { getEmailMessages } from "@/services/boomlify.service";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // NUEVO en Next 15
    const { id } = await params;

    const data = await getEmailMessages(id);

    // normalización segura
    const messages = Array.isArray(data)
      ? data
      : data.messages ?? data.data ?? [];

    return NextResponse.json(messages);
  } catch (error) {
    console.error("messages route error:", error);

    return NextResponse.json(
      { error: "Error obteniendo mensajes" },
      { status: 500 }
    );
  }
}