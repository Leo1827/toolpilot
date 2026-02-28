import { NextResponse } from "next/server";
import {
  deleteEmail,
  getEmailDetail,
} from "@/services/boomlify.service";

// detalle
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getEmailDetail(params.id);

    // normalizar por si Boomlify envuelve la respuesta
    const email =
      data.email ?? data.data ?? data ?? null;

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
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await deleteEmail(params.id);

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