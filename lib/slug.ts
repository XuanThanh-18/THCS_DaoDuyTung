// lib/slug.ts
import { PrismaClient } from "@prisma/client";

// Bảng map đầy đủ ký tự tiếng Việt
const VIET_MAP: Record<string, string> = {
  à: "a",
  á: "a",
  ả: "a",
  ã: "a",
  ạ: "a",
  ă: "a",
  ằ: "a",
  ắ: "a",
  ẳ: "a",
  ẵ: "a",
  ặ: "a",
  â: "a",
  ầ: "a",
  ấ: "a",
  ẩ: "a",
  ẫ: "a",
  ậ: "a",
  è: "e",
  é: "e",
  ẻ: "e",
  ẽ: "e",
  ẹ: "e",
  ê: "e",
  ề: "e",
  ế: "e",
  ể: "e",
  ễ: "e",
  ệ: "e",
  ì: "i",
  í: "i",
  ỉ: "i",
  ĩ: "i",
  ị: "i",
  ò: "o",
  ó: "o",
  ỏ: "o",
  õ: "o",
  ọ: "o",
  ô: "o",
  ồ: "o",
  ố: "o",
  ổ: "o",
  ỗ: "o",
  ộ: "o",
  ơ: "o",
  ờ: "o",
  ớ: "o",
  ở: "o",
  ỡ: "o",
  ợ: "o",
  ù: "u",
  ú: "u",
  ủ: "u",
  ũ: "u",
  ụ: "u",
  ư: "u",
  ừ: "u",
  ứ: "u",
  ử: "u",
  ữ: "u",
  ự: "u",
  ỳ: "y",
  ý: "y",
  ỷ: "y",
  ỹ: "y",
  ỵ: "y",
  đ: "d",
};

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((c) => VIET_MAP[c] ?? c)
    .join("")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type ContentType = "post" | "event" | "announcement" | "gallery";

export async function checkSlugExists(
  slug: string,
  prisma: PrismaClient,
  type: ContentType,
  excludeId?: string,
): Promise<boolean> {
  const where = excludeId ? { slug, NOT: { id: excludeId } } : { slug };

  switch (type) {
    case "post":
      return !!(await prisma.post.findFirst({ where }));
    case "event":
      return !!(await prisma.event.findFirst({ where }));
    case "announcement":
      return !!(await prisma.announcement.findFirst({ where }));
    case "gallery":
      return !!(await prisma.gallery.findFirst({ where }));
    default:
      throw new Error(`Unknown content type: ${type}`);
  }
}

export async function generateUniqueSlug(
  input: string,
  prisma: PrismaClient,
  type: ContentType,
  excludeId?: string,
): Promise<string> {
  const base = generateSlug(input);
  let slug = base;
  let counter = 1;

  while (await checkSlugExists(slug, prisma, type, excludeId)) {
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
}
