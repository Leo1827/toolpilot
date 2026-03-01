import { NextResponse, NextRequest } from "next/server";
import {
  deleteEmail,
  getEmailDetail,
} from "@/services/boomlify.service";

// detalle
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const data = await getEmailDetail(id);

    // normalizar por si Boomlify envuelve la respuesta
    const email = data?.email ?? data?.data ?? data ?? null;

    return NextResponse.json(email);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error obteniendo detalle" },
      { status: 500 }
    );
  }
}

// eliminar
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const data = await deleteEmail(id);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error eliminando" },
      { status: 500 }
    );
  }
}