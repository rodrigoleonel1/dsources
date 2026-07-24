import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser, findUserByEmail, toPublicUser } from "@/lib/db/users";
import { setSessionCookie } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
import { ensureIndexes } from "@/lib/db/indexes";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(60),
  email: z.string().trim().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(72),
});

export async function POST(req: Request) {
  await ensureIndexes();

  const ip = getClientIp(req);
  const limit = await rateLimit({
    action: "register",
    identifier: ip,
    limit: 5,
    windowSeconds: 60 * 60,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Probá de nuevo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json(
      { error: "Ya existe una cuenta con ese email" },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser({ name, email, passwordHash });
  const publicUser = toPublicUser(user);

  await setSessionCookie({
    userId: publicUser.id,
    email: publicUser.email,
    name: publicUser.name,
    role: publicUser.role,
  });

  return NextResponse.json({ user: publicUser }, { status: 201 });
}
