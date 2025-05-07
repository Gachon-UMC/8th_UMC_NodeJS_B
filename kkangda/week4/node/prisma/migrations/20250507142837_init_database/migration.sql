-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(10) NOT NULL,
    `gender` TINYINT NOT NULL,
    `birth` DATE NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `detail_address` VARCHAR(255) NULL,
    `phone` CHAR(11) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_preference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `food_category_id` INTEGER NOT NULL,

    INDEX `f_category_id`(`food_category_id`),
    INDEX `user_id`(`member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `food_preference` ADD CONSTRAINT `food_preference_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `food_preference` ADD CONSTRAINT `food_preference_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
