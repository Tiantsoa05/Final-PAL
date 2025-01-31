/*
  Warnings:

  - Added the required column `id_prof` to the `Examen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Examen" ADD COLUMN     "id_prof" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_id_prof_fkey" FOREIGN KEY ("id_prof") REFERENCES "Professeur"("id_prof") ON DELETE RESTRICT ON UPDATE CASCADE;
