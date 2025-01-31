/*
  Warnings:

  - You are about to drop the column `password` on the `Etudiant` table. All the data in the column will be lost.
  - Added the required column `mdp` to the `Etudiant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Etudiant" DROP COLUMN "password",
ADD COLUMN     "mdp" TEXT NOT NULL;
