// lib/validation.ts
// FIX M3: Không import ContentStatus từ @prisma/client trong shared validation
// Lý do: @prisma/client không available ở Edge Runtime (middleware, etc.)
// Dùng string literal union thay thế — type-safe và không có side effects
import { z } from "zod";

// Định nghĩa enum locally, đồng bộ với prisma schema
const ContentStatusEnum = z.enum(["DRAFT", "PENDING", "PUBLISHED"]);
type ContentStatus = z.infer<typeof ContentStatusEnum>;

// Base schema dùng chung
const baseContentSchema = z.object({
  title: z
    .string()
    .min(3, "Tiêu đề phải có ít nhất 3 ký tự")
    .max(200, "Tiêu đề không quá 200 ký tự"),
  slug: z.string().min(1, "Slug không được để trống"),
  content: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự"),
  excerpt: z.string().optional(),
  coverImage: z
    .string()
    .url("URL ảnh không hợp lệ")
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "Vui lòng chọn danh mục"),
  status: ContentStatusEnum,
  featured: z.boolean().default(false),
  publishDate: z.coerce.date().optional().nullable(),
});

// Schema cho Posts
export const postSchema = baseContentSchema.extend({
  type: z.literal("post"),
});

// Schema cho Events
export const eventSchema = baseContentSchema
  .extend({
    type: z.literal("event"),
    description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
    eventDate: z.coerce.date({
      required_error: "Vui lòng chọn ngày diễn ra",
      invalid_type_error: "Ngày không hợp lệ",
    }),
    location: z.string().min(3, "Địa điểm phải có ít nhất 3 ký tự"),
  })
  .omit({ content: true })
  .extend({
    content: z.string().optional().default(""),
  });

// Schema cho Announcements — đơn giản hơn
export const announcementSchema = z.object({
  type: z.literal("announcement"),
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự").max(200),
  slug: z.string().min(1, "Slug không được để trống"),
  content: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự"),
  status: ContentStatusEnum,
  publishDate: z.coerce.date().optional().nullable(),
  priority: z.number().int().min(0).max(10).default(0),
  expiryDate: z.coerce.date().optional().nullable(),
});

// Discriminated union
export const contentSchema = z.discriminatedUnion("type", [
  postSchema,
  eventSchema,
  announcementSchema,
]);

export type PostFormData = z.infer<typeof postSchema>;
export type EventFormData = z.infer<typeof eventSchema>;
export type AnnouncementFormData = z.infer<typeof announcementSchema>;
export type ContentFormData = z.infer<typeof contentSchema>;
export type { ContentStatus };
