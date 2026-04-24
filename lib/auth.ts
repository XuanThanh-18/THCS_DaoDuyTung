import { jwtVerify, SignJWT, JWTPayload } from "jose";
import { cookies } from "next/headers";

// ── Fail fast nếu thiếu secret ──────────────────────────
if (!process.env.JWT_SECRET) {
  throw new Error(
    "[auth] JWT_SECRET chưa được set. Thêm vào file .env và khởi động lại server.",
  );
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const COOKIE_NAME = "admin_token";
const TOKEN_EXPIRY = "7d";

export interface AuthPayload extends JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// ── Sign token ───────────────────────────────────────────
export async function signToken(payload: AuthPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(secret);
}

// ── Verify token ─────────────────────────────────────────
export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as AuthPayload;
  } catch {
    return null;
  }
}

// ── Cookie helpers ───────────────────────────────────────
export async function setTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 ngày
    path: "/",
  });
}

export async function getTokenCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function removeTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ── getCurrentUser — dùng trong Server Components & API routes ──
export async function getCurrentUser(): Promise<AuthPayload | null> {
  const token = await getTokenCookie();
  if (!token) return null;
  return verifyToken(token);
}
