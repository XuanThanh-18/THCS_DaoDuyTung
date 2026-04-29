// lib/auth.ts — FIXED VERSION
// Fix: Lazy check JWT_SECRET thay vì throw ở module scope
// Lý do: throw ở module scope crash toàn bộ app khi import, kể cả trang public
// Lazy check chỉ throw khi function thực sự được gọi

import { jwtVerify, SignJWT, JWTPayload } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";
const TOKEN_EXPIRY = "7d";

export interface AuthPayload extends JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// ── Lazy secret getter — chỉ throw khi được gọi ──────────
function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "[auth] JWT_SECRET chưa được set. Thêm vào file .env.local:\n" +
        "JWT_SECRET=<random-string-32-chars>\n" +
        "Tạo bằng: openssl rand -base64 32",
    );
  }
  return new TextEncoder().encode(secret);
}

// ── Sign token ───────────────────────────────────────────
export async function signToken(payload: AuthPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getSecret());
}

// ── Verify token ─────────────────────────────────────────
export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
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
