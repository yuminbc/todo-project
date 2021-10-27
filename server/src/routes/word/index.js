const express = require('express')
const Word = require('../../models/Word')
const WordRouter = express.Router()

// const word = require('../../models/Word') // word 가져옴

//처리로직
// /api/word/ , /api/words/학원 //(파라미터)
WordRouter.route('/(:word)?').get(async(req, res) => {
    let words = []
    const {word} = req.params 
    console.log(req.params.word)
    // res.send(word)

    // 사용자로부터 쿼리가 존재하는 경우
    // db.collection.find({r_word: word}) // 쿼리로 DB검색
    if(word !== "underfined" && word !== undefined){ // 데이터베이스에서 쿼리 단어를 검색
        // res.json({status:200, msg:'특정 단어 검색'})
        console.log(word)
        words = await Word.find({r_word: word})

    } else { // 데이터베이스에서 전체 단어 검색
        // res.json({status:200, msg:'전체 단어 검색'})
        console.log(word)
        // words = ["no query"]
        console.log(`word database: ${Word}`)//콘솔에 표시
        words = await Word.find()
    }
    res.json({ status:200, words})
}) 

module.exports = WordRouter