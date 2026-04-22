/**
 * Tạo slug từ tiêu đề
 * - Xóa diacritics (ế, á, ơ, etc)
 * - Chuyển thành chữ thường
 * - Thay khoảng trắng bằng dấu gạch
 * - Xóa ký tự đặc biệt
 */
export function generateSlug(title: string): string {
  // Normalize Unicode để xóa diacritics
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Xóa diacritical marks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Chỉ giữ a-z, 0-9, space, dash
    .replace(/\s+/g, "-") // Thay space bằng dash
    .replace(/-+/g, "-") // Xóa dash liền
    .replace(/^-|-$/g, ""); // Xóa dash ở đầu/cuối
}

/**
 * Check xem slug đã tồn tại hay chưa
 */
export async function checkSlugExists(
  slug: string,
  prisma: any,
  type: "post" | "event" | "announcement",
  excludeId?: string,
): Promise<boolean> {
  let existing;

  if (type === "post") {
    existing = await prisma.post.findUnique({ where: { slug } });
  } else if (type === "event") {
    existing = await prisma.event.findUnique({ where: { slug } });
  } else if (type === "announcement") {
    existing = await prisma.announcement.findUnique({ where: { slug } });
  }

  // Nếu excludeId được cung cấp, cho phép slug của chính record đó
  if (excludeId && existing && existing.id === excludeId) {
    return false;
  }

  return !!existing;
}

/**
 * Tạo unique slug nếu slug đã tồn tại
 */
export async function generateUniqueSlug(
  baseSlug: string,
  prisma: any,
  type: "post" | "event" | "announcement",
  excludeId?: string,
): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (await checkSlugExists(slug, prisma, type, excludeId)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
