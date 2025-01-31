export const LEVEL_TEST = {
    debutant: [
      {
        question: "Pouvez-vous vous présenter simplement ?",
        options: [
          "Bonjour, je m'appelle X",
          "Bonjour, comment allez-vous ?",
          "Je ne sais pas me présenter"
        ]
      },
      {
        question: "Comprenez-vous des phrases simples ?",
        options: [
          "Oui, facilement",
          "Parfois avec difficulté",
          "Non, pas du tout"
        ]
      }
    ],
    intermediaire: [
      {
        question: "Pouvez-vous discuter de sujets variés ?",
        options: [
          "Oui, avec aisance",
          "Avec quelques hésitations",
          "Uniquement sur des sujets simples"
        ]
      },
      {
        question: "Comprenez-vous des contenus médias ?",
        options: [
          "Films et séries sans sous-titres",
          "Avec quelques difficultés",
          "Seulement avec des sous-titres"
        ]
      }
    ],
    avance: [
      {
        question: "Maîtrisez-vous des nuances complexes ?",
        options: [
          "Oui, je comprends les subtilités",
          "Partiellement",
          "Non, je reste basique"
        ]
      },
      {
        question: "Pouvez-vous rédiger des textes complexes ?",
        options: [
          "Oui, aisément",
          "Avec quelques erreurs",
          "Non, c'est difficile"
        ]
      }
    ]
  };
  
  export const calculateLevel = (levelTestAnswers) => {
    // const intermediateCount = Object.values(levelTestAnswers).filter(
    //   ans => ans.includes("avec") || ans.includes("parfois")
    // ).length;
  
    // const advancedCount = Object.values(levelTestAnswers).filter(
    //   ans => ans.includes("aisance") || ans.includes("aisément")
    // ).length;
  
    // if (advancedCount >= 2) {
    //   return 'avance';
    // } else if (intermediateCount >= 2) {
    //   return 'intermediaire';
    // } else {
    //   return 'debutant';
    // }

    let note = 0
    let level = ''

    levelTestAnswers.map(lta=>{
      if(lta.answer===lta.trueResponse){
        note += lta.note
      }
    })

    level = (note<10) ? "débutant" : (note>=10 && note<15) ? "intermédiaire" : "avancé"

    return {note,level}

  };