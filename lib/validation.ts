import { z } from "zod";
import { ContentStatus } from "@prisma/client";

// Base schema cho tất cả content types
export const baseContentSchema = z.object({
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
  status: z.enum([
    ContentStatus.DRAFT,
    ContentStatus.PENDING,
    ContentStatus.PUBLISHED,
  ]),
  featured: z.boolean().default(false),
  publishDate: z.date().optional(),
});

// Schema cho Posts (tin tức, bài viết)
export const postSchema = baseContentSchema.extend({
  type: z.literal("post"),
});

// Schema cho Events (sự kiện)
export const eventSchema = baseContentSchema
  .extend({
    type: z.literal("event"),
    description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
    eventDate: z.date("Vui lòng chọn ngày diễn ra"),
    location: z.string().min(3, "Địa điểm phải có ít nhất 3 ký tự"),
  })
  .omit({ content: true })
  .extend({ content: z.string().optional().default("") });

// Schema cho Announcements (thông báo)
export const announcementSchema = z.object({
  type: z.literal("announcement"),
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự").max(200),
  slug: z.string().min(1, "Slug không được để trống"),
  content: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự"),
  status: z.enum([
    ContentStatus.DRAFT,
    ContentStatus.PENDING,
    ContentStatus.PUBLISHED,
  ]),
  publishDate: z.date().optional(),
});

// Union schema
export const contentSchema = z.discriminatedUnion("type", [
  postSchema,
  eventSchema,
  announcementSchema,
]);

export type PostFormData = z.infer<typeof postSchema>;
export type EventFormData = z.infer<typeof eventSchema>;
export type AnnouncementFormData = z.infer<typeof announcementSchema>;
export type ContentFormData = z.infer<typeof contentSchema>;
