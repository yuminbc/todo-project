const express = require('express') // express.Router를 생성
const WordRouter = express.Router() 
const todo = require('./todo') // todo라는 하위 로직을 가져온다
const word = require('./Word')

WordRouter.use('/words',word)//router를 이용해서 하위폴더 하나 더 생성
WordRouter.use('/todos',todo)
//router를 이용해서 하위폴더 하나 더 생성
// router.use('/todos', todo)
// => api/todos/ app.get('edit')
// 하위에 처리 로직이 있으면 불러들인 값을 실행

// WordRouter.route('/(:word)?').get((req, res) => {
//     let words = []
//     const { word } = req.params
//     console.log(word)
//     // res.send(word)

//     if (word !== undefined) {
//         //데이터베이스에서 쿼리로 단어를 검색
//         res.json({ status: 200, msg: '특정 단어 검색' })
//     } else {
//         //데이터베이스에서 쿼리로 전체 단어를 검색
//         res.json({ status: 200, msg: '전체 단어 검색' })
//     }
// })    // /api/words/     , /api/words/학원
// // ()? 는 옵션주는 기능

module.exports = WordRouter