/*
  Warnings:

  - Added the required column `star_rating` to the `user_store_review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user_store_review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_store_review` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `star_rating` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
