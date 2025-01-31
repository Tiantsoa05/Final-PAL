/*
  Warnings:

  - Added the required column `id_langue` to the `Examen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `point_examen` to the `Examen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Examen" ADD COLUMN     "id_langue" INTEGER NOT NULL,
ADD COLUMN     "point_examen" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_id_langue_fkey" FOREIGN KEY ("id_langue") REFERENCES "Langue"("id_langue") ON DELETE RESTRICT ON UPDATE CASCADE;
