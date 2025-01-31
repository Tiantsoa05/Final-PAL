import nspell from 'nspell'
import dictionary from 'dictionary-en'
import fs from 'fs'
import path from 'path'

const dictionaries = {
    en: { aff: './dictionary/English.aff', dic: './dictionary/English.dic' },
    fr: { aff: './dictionary/French.aff', dic: './dictionary/French.dic' },
    it: { aff: './dictionary/Italian.aff', dic: './dictionary/Italian.dic' },
};
  
  // Helper to load the dictionary
  const loadDictionary = (lang) => {
    if (!dictionaries[lang]) {
      throw new Error(`Language ${lang} is not supported.`);
    }
  
    const { aff, dic } = dictionaries[lang];
    const affData = fs.readFileSync(path.resolve(aff), 'utf8');
    const dicData = fs.readFileSync(dic, 'utf8');
    return nspell(affData, dicData);
  };
  
 
export const checkSpell = async (req, res) => {
    const { text, lang } = req.body;
  
    console.log(req.body)
   // const [text,lang] = ["Hello i'm havin a green coulor",'en']

    if (!text || !lang) {
      return res.status(400).json({ error: 'Please provide text and language code (en, fr, it).' });
    }
  
    try {

        const spell = loadDictionary(lang);
        const words = text.split(' ');

        const correctedWords = words.map((word) => {
            if (!spell.correct(word)) {
                const suggestions = spell.suggest(word);
                return suggestions.length > 0 ? suggestions[0] : word;
            }
            return word;
        });

        // Reformulation de la phrase corrigée
        const correctedText = correctedWords.join(' ');

        res.status(200).json({ original: text, suggestion:correctedText });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
  