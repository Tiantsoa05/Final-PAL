/*
  Warnings:

  - Added the required column `option_reponse` to the `Examen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Examen" ADD COLUMN     "option_reponse" TEXT NOT NULL;
