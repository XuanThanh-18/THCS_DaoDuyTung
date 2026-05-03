-- prisma/migrations/YYYYMMDD_add_document_thumbnail/migration.sql
-- Thêm thumbnailUrl và downloadCount vào bảng Document

ALTER TABLE "Document"
  ADD COLUMN IF NOT EXISTS "thumbnailUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "downloadCount" INTEGER NOT NULL DEFAULT 0;

-- Index để sort theo lượt tải
CREATE INDEX IF NOT EXISTS "Document_downloadCount_idx" ON "Document"("downloadCount");