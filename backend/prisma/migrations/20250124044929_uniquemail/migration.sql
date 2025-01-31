/*
  Warnings:

  - A unique constraint covering the columns `[e_mail]` on the table `Etudiant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Etudiant_e_mail_key" ON "Etudiant"("e_mail");
