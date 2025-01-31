-- CreateTable
CREATE TABLE "Langue" (
    "id_langue" SERIAL NOT NULL,
    "nom_langue" TEXT NOT NULL,

    CONSTRAINT "Langue_pkey" PRIMARY KEY ("id_langue")
);

-- CreateTable
CREATE TABLE "Professeur" (
    "id_prof" SERIAL NOT NULL,
    "nom_prof" TEXT NOT NULL,
    "prenom_prof" TEXT NOT NULL,
    "mail_prof" TEXT NOT NULL,
    "mdp_prof" TEXT NOT NULL,
    "Diplome" TEXT NOT NULL,
    "Niveau_Etude" TEXT NOT NULL,
    "id_langue" INTEGER NOT NULL,

    CONSTRAINT "Professeur_pkey" PRIMARY KEY ("id_prof")
);

-- CreateTable
CREATE TABLE "Niveau" (
    "id_niveau" SERIAL NOT NULL,
    "valeur_niveau" TEXT NOT NULL,

    CONSTRAINT "Niveau_pkey" PRIMARY KEY ("id_niveau")
);

-- CreateTable
CREATE TABLE "Cours" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu_cours" TEXT NOT NULL,
    "id_langue" INTEGER NOT NULL,
    "id_professeur" INTEGER NOT NULL,

    CONSTRAINT "Cours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etudiant" (
    "id_etudiant" SERIAL NOT NULL,
    "nom_etudiant" TEXT NOT NULL,
    "prenom_etudiant" TEXT NOT NULL,
    "e_mail" TEXT NOT NULL,
    "Date_Naissance" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "id_prof" INTEGER,
    "id_niveau" INTEGER,

    CONSTRAINT "Etudiant_pkey" PRIMARY KEY ("id_etudiant")
);

-- CreateTable
CREATE TABLE "PayerDroit" (
    "id" SERIAL NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_etudiant" INTEGER NOT NULL,
    "id_professeur" INTEGER NOT NULL,

    CONSTRAINT "PayerDroit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discuter" (
    "id_messages" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "heure_envoi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "send_type" INTEGER NOT NULL,
    "id_prof" INTEGER NOT NULL,
    "id_etudiant" INTEGER NOT NULL,

    CONSTRAINT "Discuter_pkey" PRIMARY KEY ("id_messages")
);

-- CreateTable
CREATE TABLE "Dictionnaire" (
    "id_dictionnaire" SERIAL NOT NULL,
    "mot" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "synonyme" TEXT NOT NULL,
    "id_langue" INTEGER NOT NULL,

    CONSTRAINT "Dictionnaire_pkey" PRIMARY KEY ("id_dictionnaire")
);

-- CreateTable
CREATE TABLE "Exercice" (
    "id_exercice" SERIAL NOT NULL,
    "titre_exercice" TEXT NOT NULL,
    "contenu_exercice" TEXT NOT NULL,

    CONSTRAINT "Exercice_pkey" PRIMARY KEY ("id_exercice")
);

-- CreateTable
CREATE TABLE "Chapitre" (
    "id_chapitre" SERIAL NOT NULL,

    CONSTRAINT "Chapitre_pkey" PRIMARY KEY ("id_chapitre")
);

-- CreateTable
CREATE TABLE "Examen" (
    "id_examen" SERIAL NOT NULL,
    "question_examen" TEXT NOT NULL,
    "reponse_examen" TEXT NOT NULL,

    CONSTRAINT "Examen_pkey" PRIMARY KEY ("id_examen")
);

-- AddForeignKey
ALTER TABLE "Professeur" ADD CONSTRAINT "Professeur_id_langue_fkey" FOREIGN KEY ("id_langue") REFERENCES "Langue"("id_langue") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours" ADD CONSTRAINT "Cours_id_langue_fkey" FOREIGN KEY ("id_langue") REFERENCES "Langue"("id_langue") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours" ADD CONSTRAINT "Cours_id_professeur_fkey" FOREIGN KEY ("id_professeur") REFERENCES "Professeur"("id_prof") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etudiant" ADD CONSTRAINT "Etudiant_id_prof_fkey" FOREIGN KEY ("id_prof") REFERENCES "Professeur"("id_prof") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etudiant" ADD CONSTRAINT "Etudiant_id_niveau_fkey" FOREIGN KEY ("id_niveau") REFERENCES "Niveau"("id_niveau") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayerDroit" ADD CONSTRAINT "PayerDroit_id_etudiant_fkey" FOREIGN KEY ("id_etudiant") REFERENCES "Etudiant"("id_etudiant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayerDroit" ADD CONSTRAINT "PayerDroit_id_professeur_fkey" FOREIGN KEY ("id_professeur") REFERENCES "Professeur"("id_prof") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discuter" ADD CONSTRAINT "Discuter_id_prof_fkey" FOREIGN KEY ("id_prof") REFERENCES "Professeur"("id_prof") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discuter" ADD CONSTRAINT "Discuter_id_etudiant_fkey" FOREIGN KEY ("id_etudiant") REFERENCES "Etudiant"("id_etudiant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dictionnaire" ADD CONSTRAINT "Dictionnaire_id_langue_fkey" FOREIGN KEY ("id_langue") REFERENCES "Langue"("id_langue") ON DELETE RESTRICT ON UPDATE CASCADE;
