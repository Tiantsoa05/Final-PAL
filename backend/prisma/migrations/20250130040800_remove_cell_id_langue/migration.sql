/*
  Warnings:

  - You are about to drop the column `id_langue` on the `Examen` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Examen" DROP CONSTRAINT "Examen_id_langue_fkey";

-- AlterTable
ALTER TABLE "Examen" DROP COLUMN "id_langue";
