import { NextResponse, NextRequest } from "next/server";
import { getEmailMessages } from "@/services/boomlify.service";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const data = await getEmailMessages(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error obteniendo mensajes" },
      { status: 500 }
    );
  }
}