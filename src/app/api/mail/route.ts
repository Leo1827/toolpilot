import { NextResponse, NextRequest  } from "next/server";
import {
  createTempEmail,
  listEmails,
} from "@/services/boomlify.service";

// LISTAR emails
export async function GET(_req: NextRequest) {
  try {
    const data = await listEmails();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error listando emails" },
      { status: 500 }
    );
  }
}

// CREAR email
export async function POST(_req: NextRequest) {
  try {
    const data = await createTempEmail();

    return NextResponse.json({
      id: data.email.id,
      email: data.email.address,
      expiresAt: data.email.expires_at,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando email" },
      { status: 500 }
    );
  }
}