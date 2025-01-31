/*
  Warnings:

  - Added the required column `duree_cours` to the `PayerDroit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayerDroit" ADD COLUMN     "duree_cours" INTEGER NOT NULL;
