import { NextResponse } from "next/server";
import { findUserByEmail, toPublicUser } from "@/lib/db/users";
import { setSessionCookie } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { formatZodIssues, loginSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  // Limit by IP (stop a single attacker hammering many accounts) and by
  // email (stop distributed attempts against one account), independently.
  const ipLimit = await rateLimit({
    action: "login-ip",
    identifier: ip,
    limit: 20,
    windowSeconds: 15 * 60,
  });
  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Probá de nuevo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(ipLimit.retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: formatZodIssues(parsed.error) },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  const emailLimit = await rateLimit({
    action: "login-email",
    identifier: email.toLowerCase(),
    limit: 10,
    windowSeconds: 15 * 60,
  });
  if (!emailLimit.allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos para esta cuenta. Probá de nuevo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(emailLimit.retryAfterSeconds) } }
    );
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const publicUser = toPublicUser(user);
  await setSessionCookie({
    userId: publicUser.id,
    email: publicUser.email,
    name: publicUser.name,
    role: publicUser.role,
  });

  return NextResponse.json({ user: publicUser });
}
