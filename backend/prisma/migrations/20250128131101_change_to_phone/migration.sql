/*
  Warnings:

  - You are about to drop the column `Niveau_Etude` on the `Professeur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Professeur" DROP COLUMN "Niveau_Etude",
ADD COLUMN     "num_phone" TEXT;
