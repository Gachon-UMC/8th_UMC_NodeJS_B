/*
  Warnings:

  - You are about to alter the column `name` on the `store` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - Added the required column `rating` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` ADD COLUMN `rating` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(40) NOT NULL;

-- AlterTable
ALTER TABLE `store` ADD COLUMN `address` VARCHAR(255) NOT NULL,
    ADD COLUMN `status` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(20) NOT NULL;
