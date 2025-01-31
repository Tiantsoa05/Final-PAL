const {translate} = require('traduction')
// automatically pick platform
const say = require('say')


class PracticeController{
    async fetchDictionnaryWord(req,res){
        const {mot} = req.body
    
        fetch('https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-gb/'+mot, {
            headers: {
              "app_Id": "be8a0b02",
              "app_key": "e1c6b57610f256508f57b538c5d33df8"
            },
            timeout: 30000
          }
        ).then(response=>response.json()).catch(error=>console.log(error))

        return res.status(200).json({response:"hey"})
    }

    async traduceWord(req,res){
      const {from,to,word} = req.body
      console.log(req.body)
      const traducedWord = await translate(word,from,to)
      
      res.status(200).json({word, traduction: traducedWord})
    }

    async generateVoiceByWord(req,res){
      say.speak('Hello!')
      // Export spoken audio to a WAV file
      
    }
}

module.exports = new PracticeController()