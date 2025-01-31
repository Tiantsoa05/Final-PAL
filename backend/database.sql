--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: tiantsoa
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO tiantsoa;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: tiantsoa
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Chapitre; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public."Chapitre" (
    id_chapitre integer NOT NULL
);


ALTER TABLE public."Chapitre" OWNER TO tiantsoa;

--
-- Name: Chapitre_id_chapitre_seq; Type: SEQUENCE; Schema: public; Owner: tiantsoa
--

CREATE SEQUENCE public."Chapitre_id_chapitre_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Chapitre_id_chapitre_seq" OWNER TO tiantsoa;

--
-- Name: Chapitre_id_chapitre_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tiantsoa
--

ALTER SEQUENCE public."Chapitre_id_chapitre_seq" OWNED BY public."Chapitre".id_chapitre;


--
-- Name: Cours; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public."Cours" (
    id integer NOT NULL,
    id_professeur integer NOT NULL,
    contenu_cours text NOT NULL,
    id_langue integer NOT NULL,
    titre text NOT NULL
);


ALTER TABLE public."Cours" OWNER TO tiantsoa;

--
-- Name: Cours_id_seq; Type: SEQUENCE; Schema: public; Owner: tiantsoa
--

CREATE SEQUENCE public."Cours_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cours_id_seq" OWNER TO tiantsoa;

--
-- Name: Cours_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tiantsoa
--

ALTER SEQUENCE public."Cours_id_seq" OWNED BY public."Cours".id;


--
-- Name: Dictionnaire; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public."Dictionnaire" (
    id_dictionnaire integer NOT NULL,
    mot text NOT NULL,
    definition text NOT NULL,
    synonyme text NOT NULL,
    id_langue integer NOT NULL
);


ALTER TABLE public."Dictionnaire" OWNER TO tiantsoa;

--
-- Name: Dictionnaire_id_dictionnaire_seq; Type: SEQUENCE; Schema: public; Owner: tiantsoa
--

CREATE SEQUENCE public."Dictionnaire_id_dictionnaire_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Dictionnaire_id_dictionnaire_seq" OWNER TO tiantsoa;

--
-- Name: Dictionnaire_id_dictionnaire_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tiantsoa
--

ALTER SEQUENCE public."Dictionnaire_id_dictionnaire_seq" OWNED BY public."Dictionnaire".id_dictionnaire;


--
-- Name: Discuter; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public."Discuter" (
    id_messages integer NOT NULL,
    message text NOT NULL,
    heure_envoi timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    send_type integer NOT NULL,
    id_prof integer NOT NULL,
    id_etudiant integer NOT NULL
);


ALTER TABLE public."Discuter" OWNER TO tiantsoa;

--
-- Name: Discuter_id_messages_seq; Type: SEQUENCE; Schema: public; Owner: tiantsoa
--

CREATE SEQUENCE public."Discuter_id_messages_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Discuter_id_messages_seq" OWNER TO tiantsoa;

--
-- Name: Discuter_id_messages_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tiantsoa
--

ALTER SEQUENCE public."Discuter_id_messages_seq" OWNED BY public."Discuter".id_messages;


--
-- Name: Etudiant; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public."Etudiant" (
    e_mail text NOT NULL,
    id_etudiant integer NOT NULL,
    id_niveau integer,
    id_prof integer,
    nom_etudiant text NOT NULL,
    prenom_etudiant text NOT NULL,
    password text NOT NULL,
    "Date_Naissance" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Etudiant" OWNER TO tiantsoa;

--
-- Name: Etudiant_id_etudiant_seq; Type: SEQUENCE; Schema: public; Owner: tiantsoa
--

CREATE SEQUENCE public."Etudiant_id_etudiant_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Etudiant_id_etudiant_seq" OWNER TO tiantsoa;

--
-- Name: Etudiant_id_etudiant_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tiantsoa
--

ALTER SEQUENCE public."Etudiant_id_etudiant_seq" OWNED BY public."Etudiant".id_etudiant;


--
-- Name: Examen; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public."Examen" (
    id_examen integer NOT NULL,
    question_examen text NOT NULL,
    reponse_examen text NOT NULL
);


ALTER TABLE public."Examen" OWNER TO tiantsoa;

--
-- Name: Examen_id_examen_seq; Type: SEQUENCE; Schema: public; Owner: tiantsoa
--

CREATE SEQUENCE public."Examen_id_examen_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Examen_id_examen_seq" OWNER TO tiantsoa;

--
-- Name: Examen_id_examen_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tiantsoa
--

ALTER SEQUENCE public."Examen_id_examen_seq" OWNED BY public."Examen".id_examen;


--
-- Name: Exercice; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public."Exercice" (
    id_exercice integer NOT NULL,
    titre_exercice text NOT NULL,
    contenu_exercice text NOT NULL
);


ALTER TABLE public."Exercice" OWNER TO tiantsoa;

--
-- Name: Exercice_id_exercice_seq; Type: SEQUENCE; Schema: public; Owner: tiantsoa
--

CREATE SEQUENCE public."Exercice_id_exercice_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Exercice_id_exercice_seq" OWNER TO tiantsoa;

--
-- Name: Exercice_id_exercice_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tiantsoa
--

ALTER SEQUENCE public."Exercice_id_exercice_seq" OWNED BY public."Exercice".id_exercice;


--
-- Name: Langue; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public."Langue" (
    nom_langue text NOT NULL,
    id_langue integer NOT NULL
);


ALTER TABLE public."Langue" OWNER TO tiantsoa;

--
-- Name: Langue_id_langue_seq; Type: SEQUENCE; Schema: public; Owner: tiantsoa
--

CREATE SEQUENCE public."Langue_id_langue_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Langue_id_langue_seq" OWNER TO tiantsoa;

--
-- Name: Langue_id_langue_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tiantsoa
--

ALTER SEQUENCE public."Langue_id_langue_seq" OWNED BY public."Langue".id_langue;


--
-- Name: Niveau; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public."Niveau" (
    id_niveau integer NOT NULL,
    valeur_niveau text NOT NULL
);


ALTER TABLE public."Niveau" OWNER TO tiantsoa;

--
-- Name: Niveau_id_niveau_seq; Type: SEQUENCE; Schema: public; Owner: tiantsoa
--

CREATE SEQUENCE public."Niveau_id_niveau_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Niveau_id_niveau_seq" OWNER TO tiantsoa;

--
-- Name: Niveau_id_niveau_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tiantsoa
--

ALTER SEQUENCE public."Niveau_id_niveau_seq" OWNED BY public."Niveau".id_niveau;


--
-- Name: PayerDroit; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public."PayerDroit" (
    id integer NOT NULL,
    montant double precision NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_etudiant integer NOT NULL,
    id_professeur integer NOT NULL
);


ALTER TABLE public."PayerDroit" OWNER TO tiantsoa;

--
-- Name: PayerDroit_id_seq; Type: SEQUENCE; Schema: public; Owner: tiantsoa
--

CREATE SEQUENCE public."PayerDroit_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PayerDroit_id_seq" OWNER TO tiantsoa;

--
-- Name: PayerDroit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tiantsoa
--

ALTER SEQUENCE public."PayerDroit_id_seq" OWNED BY public."PayerDroit".id;


--
-- Name: Professeur; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public."Professeur" (
    mail_prof text NOT NULL,
    id_langue integer NOT NULL,
    "Diplome" text NOT NULL,
    "Niveau_Etude" text NOT NULL,
    id_prof integer NOT NULL,
    mdp_prof text NOT NULL,
    nom_prof text NOT NULL,
    prenom_prof text NOT NULL
);


ALTER TABLE public."Professeur" OWNER TO tiantsoa;

--
-- Name: Professeur_id_prof_seq; Type: SEQUENCE; Schema: public; Owner: tiantsoa
--

CREATE SEQUENCE public."Professeur_id_prof_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Professeur_id_prof_seq" OWNER TO tiantsoa;

--
-- Name: Professeur_id_prof_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tiantsoa
--

ALTER SEQUENCE public."Professeur_id_prof_seq" OWNED BY public."Professeur".id_prof;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: tiantsoa
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO tiantsoa;

--
-- Name: Chapitre id_chapitre; Type: DEFAULT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Chapitre" ALTER COLUMN id_chapitre SET DEFAULT nextval('public."Chapitre_id_chapitre_seq"'::regclass);


--
-- Name: Cours id; Type: DEFAULT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Cours" ALTER COLUMN id SET DEFAULT nextval('public."Cours_id_seq"'::regclass);


--
-- Name: Dictionnaire id_dictionnaire; Type: DEFAULT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Dictionnaire" ALTER COLUMN id_dictionnaire SET DEFAULT nextval('public."Dictionnaire_id_dictionnaire_seq"'::regclass);


--
-- Name: Discuter id_messages; Type: DEFAULT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Discuter" ALTER COLUMN id_messages SET DEFAULT nextval('public."Discuter_id_messages_seq"'::regclass);


--
-- Name: Etudiant id_etudiant; Type: DEFAULT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Etudiant" ALTER COLUMN id_etudiant SET DEFAULT nextval('public."Etudiant_id_etudiant_seq"'::regclass);


--
-- Name: Examen id_examen; Type: DEFAULT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Examen" ALTER COLUMN id_examen SET DEFAULT nextval('public."Examen_id_examen_seq"'::regclass);


--
-- Name: Exercice id_exercice; Type: DEFAULT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Exercice" ALTER COLUMN id_exercice SET DEFAULT nextval('public."Exercice_id_exercice_seq"'::regclass);


--
-- Name: Langue id_langue; Type: DEFAULT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Langue" ALTER COLUMN id_langue SET DEFAULT nextval('public."Langue_id_langue_seq"'::regclass);


--
-- Name: Niveau id_niveau; Type: DEFAULT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Niveau" ALTER COLUMN id_niveau SET DEFAULT nextval('public."Niveau_id_niveau_seq"'::regclass);


--
-- Name: PayerDroit id; Type: DEFAULT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."PayerDroit" ALTER COLUMN id SET DEFAULT nextval('public."PayerDroit_id_seq"'::regclass);


--
-- Name: Professeur id_prof; Type: DEFAULT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Professeur" ALTER COLUMN id_prof SET DEFAULT nextval('public."Professeur_id_prof_seq"'::regclass);


--
-- Data for Name: Chapitre; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public."Chapitre" (id_chapitre) FROM stdin;
\.


--
-- Data for Name: Cours; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public."Cours" (id, id_professeur, contenu_cours, id_langue, titre) FROM stdin;
\.


--
-- Data for Name: Dictionnaire; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public."Dictionnaire" (id_dictionnaire, mot, definition, synonyme, id_langue) FROM stdin;
\.


--
-- Data for Name: Discuter; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public."Discuter" (id_messages, message, heure_envoi, send_type, id_prof, id_etudiant) FROM stdin;
\.


--
-- Data for Name: Etudiant; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public."Etudiant" (e_mail, id_etudiant, id_niveau, id_prof, nom_etudiant, prenom_etudiant, password, "Date_Naissance") FROM stdin;
\.


--
-- Data for Name: Examen; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public."Examen" (id_examen, question_examen, reponse_examen) FROM stdin;
\.


--
-- Data for Name: Exercice; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public."Exercice" (id_exercice, titre_exercice, contenu_exercice) FROM stdin;
\.


--
-- Data for Name: Langue; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public."Langue" (nom_langue, id_langue) FROM stdin;
Malagasy	1
Français	2
Anglais	3
Arabe	4
Espagnol	5
Allemand	6
Chinois	7
Italien	8
Portugais	9
Russe	10
\.


--
-- Data for Name: Niveau; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public."Niveau" (id_niveau, valeur_niveau) FROM stdin;
1	Débutant
2	Intermédiaire
3	Avancé
\.


--
-- Data for Name: PayerDroit; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public."PayerDroit" (id, montant, date, id_etudiant, id_professeur) FROM stdin;
\.


--
-- Data for Name: Professeur; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public."Professeur" (mail_prof, id_langue, "Diplome", "Niveau_Etude", id_prof, mdp_prof, nom_prof, prenom_prof) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: tiantsoa
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9a20a934-57c7-49eb-a611-cefa913fff33	83dd8f55ed046cd10548fb8f0d7d00972e21d87009f3bef035e6603deab21c87	2024-11-12 12:23:12.844829+03	20241111061134_migration_etudiant	\N	\N	2024-11-12 12:23:12.298645+03	1
be42c911-6198-4edf-a569-fedc70b7ae2d	ae0914642d78cf39d3d5c79ac26baaf72dc93ebff8497343b3b18a0c4d2106da	2024-11-12 12:23:12.88922+03	20241112063226_etudiant	\N	\N	2024-11-12 12:23:12.856113+03	1
b9a3ec78-2fb7-4a4d-87d5-0f7ee9b7df2f	9be2a7eaa614627cecda6a897a57be74e8c410afe41ff2179c9a99f7e300b825	2024-11-12 12:23:27.49416+03	20241112092327_groupe	\N	\N	2024-11-12 12:23:27.273197+03	1
68cd3424-8870-4c4d-b2fc-010f5b557fde	f1d8064c7a784f568f82a5173f93846b744aae32effab0846111848c32f6d3b5	2024-11-26 23:21:18.050904+03	20241126202117_chat	\N	\N	2024-11-26 23:21:17.366116+03	1
5237dce1-b759-4881-9342-c5305027054d	d88480f9521de371238e205e04c6cb3c65d2f0c4dde4ef89712c9ff65725964b	2024-11-27 05:05:59.916051+03	20241127020559_chat_prisma	\N	\N	2024-11-27 05:05:59.119682+03	1
cb68635d-7166-4b76-82a7-63eda544405f	61787d0b8ac0d107ef17a808802645d0b6aa4657725b60621b0fa94fa19651be	2024-11-28 05:13:23.298306+03	20241128021322_chat_prisma_send_type	\N	\N	2024-11-28 05:13:23.035668+03	1
e1646f38-31a3-48b2-822e-d0aff2b56e74	3c58b717ae75c9cffd91bb807c536497ae16718430b2358877c572d9194d012d	2025-01-18 21:14:07.736449+03	20250118181405_nouveau	\N	\N	2025-01-18 21:14:05.516768+03	1
ebc19670-079b-4329-835b-9a79c4b3b4cf	f274a96ca75cb991ddf2f1ee33f1367414b0abbde9d8d420e2fee7b39a1645a9	2025-01-19 00:34:30.851597+03	20250118213430_nullable_key	\N	\N	2025-01-19 00:34:30.686146+03	1
676cb6cc-acab-4b39-be85-8900d267b4f2	47db1695870b835ad04024f3b9212a5f3f909907577f021be93862568317d55a	2025-01-19 06:11:42.051195+03	20250119031141_nullable_remove	\N	\N	2025-01-19 06:11:41.784981+03	1
a67b69ba-6a28-40fa-8c09-cb1284d47557	029646f8277801f27be2214da77bb994b79e5dbf1c7a058e54914a94acb6f9a1	2025-01-19 10:08:54.591957+03	20250119070854_modif_etudiants	\N	\N	2025-01-19 10:08:54.275169+03	1
\.


--
-- Name: Chapitre_id_chapitre_seq; Type: SEQUENCE SET; Schema: public; Owner: tiantsoa
--

SELECT pg_catalog.setval('public."Chapitre_id_chapitre_seq"', 1, false);


--
-- Name: Cours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tiantsoa
--

SELECT pg_catalog.setval('public."Cours_id_seq"', 1, false);


--
-- Name: Dictionnaire_id_dictionnaire_seq; Type: SEQUENCE SET; Schema: public; Owner: tiantsoa
--

SELECT pg_catalog.setval('public."Dictionnaire_id_dictionnaire_seq"', 1, false);


--
-- Name: Discuter_id_messages_seq; Type: SEQUENCE SET; Schema: public; Owner: tiantsoa
--

SELECT pg_catalog.setval('public."Discuter_id_messages_seq"', 1, false);


--
-- Name: Etudiant_id_etudiant_seq; Type: SEQUENCE SET; Schema: public; Owner: tiantsoa
--

SELECT pg_catalog.setval('public."Etudiant_id_etudiant_seq"', 1, false);


--
-- Name: Examen_id_examen_seq; Type: SEQUENCE SET; Schema: public; Owner: tiantsoa
--

SELECT pg_catalog.setval('public."Examen_id_examen_seq"', 1, false);


--
-- Name: Exercice_id_exercice_seq; Type: SEQUENCE SET; Schema: public; Owner: tiantsoa
--

SELECT pg_catalog.setval('public."Exercice_id_exercice_seq"', 1, false);


--
-- Name: Langue_id_langue_seq; Type: SEQUENCE SET; Schema: public; Owner: tiantsoa
--

SELECT pg_catalog.setval('public."Langue_id_langue_seq"', 10, true);


--
-- Name: Niveau_id_niveau_seq; Type: SEQUENCE SET; Schema: public; Owner: tiantsoa
--

SELECT pg_catalog.setval('public."Niveau_id_niveau_seq"', 3, true);


--
-- Name: PayerDroit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tiantsoa
--

SELECT pg_catalog.setval('public."PayerDroit_id_seq"', 1, false);


--
-- Name: Professeur_id_prof_seq; Type: SEQUENCE SET; Schema: public; Owner: tiantsoa
--

SELECT pg_catalog.setval('public."Professeur_id_prof_seq"', 1, false);


--
-- Name: Chapitre Chapitre_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Chapitre"
    ADD CONSTRAINT "Chapitre_pkey" PRIMARY KEY (id_chapitre);


--
-- Name: Cours Cours_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Cours"
    ADD CONSTRAINT "Cours_pkey" PRIMARY KEY (id);


--
-- Name: Dictionnaire Dictionnaire_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Dictionnaire"
    ADD CONSTRAINT "Dictionnaire_pkey" PRIMARY KEY (id_dictionnaire);


--
-- Name: Discuter Discuter_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Discuter"
    ADD CONSTRAINT "Discuter_pkey" PRIMARY KEY (id_messages);


--
-- Name: Etudiant Etudiant_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Etudiant"
    ADD CONSTRAINT "Etudiant_pkey" PRIMARY KEY (id_etudiant);


--
-- Name: Examen Examen_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Examen"
    ADD CONSTRAINT "Examen_pkey" PRIMARY KEY (id_examen);


--
-- Name: Exercice Exercice_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Exercice"
    ADD CONSTRAINT "Exercice_pkey" PRIMARY KEY (id_exercice);


--
-- Name: Langue Langue_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Langue"
    ADD CONSTRAINT "Langue_pkey" PRIMARY KEY (id_langue);


--
-- Name: Niveau Niveau_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Niveau"
    ADD CONSTRAINT "Niveau_pkey" PRIMARY KEY (id_niveau);


--
-- Name: PayerDroit PayerDroit_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."PayerDroit"
    ADD CONSTRAINT "PayerDroit_pkey" PRIMARY KEY (id);


--
-- Name: Professeur Professeur_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Professeur"
    ADD CONSTRAINT "Professeur_pkey" PRIMARY KEY (id_prof);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Cours Cours_id_langue_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Cours"
    ADD CONSTRAINT "Cours_id_langue_fkey" FOREIGN KEY (id_langue) REFERENCES public."Langue"(id_langue) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Cours Cours_id_professeur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Cours"
    ADD CONSTRAINT "Cours_id_professeur_fkey" FOREIGN KEY (id_professeur) REFERENCES public."Professeur"(id_prof) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Dictionnaire Dictionnaire_id_langue_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Dictionnaire"
    ADD CONSTRAINT "Dictionnaire_id_langue_fkey" FOREIGN KEY (id_langue) REFERENCES public."Langue"(id_langue) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Discuter Discuter_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Discuter"
    ADD CONSTRAINT "Discuter_id_etudiant_fkey" FOREIGN KEY (id_etudiant) REFERENCES public."Etudiant"(id_etudiant) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Discuter Discuter_id_prof_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Discuter"
    ADD CONSTRAINT "Discuter_id_prof_fkey" FOREIGN KEY (id_prof) REFERENCES public."Professeur"(id_prof) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Etudiant Etudiant_id_niveau_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Etudiant"
    ADD CONSTRAINT "Etudiant_id_niveau_fkey" FOREIGN KEY (id_niveau) REFERENCES public."Niveau"(id_niveau) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Etudiant Etudiant_id_prof_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Etudiant"
    ADD CONSTRAINT "Etudiant_id_prof_fkey" FOREIGN KEY (id_prof) REFERENCES public."Professeur"(id_prof) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PayerDroit PayerDroit_id_etudiant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."PayerDroit"
    ADD CONSTRAINT "PayerDroit_id_etudiant_fkey" FOREIGN KEY (id_etudiant) REFERENCES public."Etudiant"(id_etudiant) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PayerDroit PayerDroit_id_professeur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."PayerDroit"
    ADD CONSTRAINT "PayerDroit_id_professeur_fkey" FOREIGN KEY (id_professeur) REFERENCES public."Professeur"(id_prof) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Professeur Professeur_id_langue_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tiantsoa
--

ALTER TABLE ONLY public."Professeur"
    ADD CONSTRAINT "Professeur_id_langue_fkey" FOREIGN KEY (id_langue) REFERENCES public."Langue"(id_langue) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: tiantsoa
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

