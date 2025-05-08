/*
  Warnings:

  - You are about to drop the column `storeId` on the `mission` table. All the data in the column will be lost.
  - You are about to drop the column `isFinished` on the `user_mission` table. All the data in the column will be lost.
  - You are about to drop the column `missionId` on the `user_mission` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_mission` table. All the data in the column will be lost.
  - Added the required column `store_id` to the `mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_finished` to the `user_mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mission_id` to the `user_mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_mission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mission` DROP FOREIGN KEY `mission_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission` DROP FOREIGN KEY `user_mission_missionId_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission` DROP FOREIGN KEY `user_mission_userId_fkey`;

-- DropIndex
DROP INDEX `mission_store_id_fkey` ON `mission`;

-- DropIndex
DROP INDEX `user_mission_mission_id_fkey` ON `user_mission`;

-- DropIndex
DROP INDEX `user_mission_user_id_fkey` ON `user_mission`;

-- AlterTable
ALTER TABLE `mission` DROP COLUMN `storeId`,
    ADD COLUMN `store_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user_mission` DROP COLUMN `isFinished`,
    DROP COLUMN `missionId`,
    DROP COLUMN `userId`,
    ADD COLUMN `is_finished` INTEGER NOT NULL,
    ADD COLUMN `mission_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `mission_store_id_fkey` ON `mission`(`store_id`);

-- CreateIndex
CREATE INDEX `user_mission_mission_id_fkey` ON `user_mission`(`mission_id`);

-- CreateIndex
CREATE INDEX `user_mission_user_id_fkey` ON `user_mission`(`user_id`);

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
