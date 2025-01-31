-- CreateTable
CREATE TABLE "ProgrammeAgenda" (
    "id_prog" SERIAL NOT NULL,
    "tache" TEXT NOT NULL,
    "id_prof" INTEGER NOT NULL,
    "date_tache" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgrammeAgenda_pkey" PRIMARY KEY ("id_prog")
);

-- AddForeignKey
ALTER TABLE "ProgrammeAgenda" ADD CONSTRAINT "ProgrammeAgenda_id_prof_fkey" FOREIGN KEY ("id_prof") REFERENCES "Professeur"("id_prof") ON DELETE RESTRICT ON UPDATE CASCADE;
