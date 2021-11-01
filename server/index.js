// node_modules 내 express 관련 코드를 가져온다
var express = require('express')// node_mpdules 내에 express 관련 코드 가져오기
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var routes = require('./src/routes')

var corsOptions = { //cors 옵션
    origin: '*',
    credentials: true
}

 
app.use(cors(corsOptions)) // CORS 설정 
app.use('/static',express.static(__dirname+'/public'))
app.use(cors())
app.use(express.json()) // request body 파싱
app.use(logger('tiny')) // Logger 설정


app.use("/api",routes) // api 라우팅
//사용자가 요청한 페이지가 없는 경우 에러처리


app.use((req, res, next) => {
    res.status(404).send("Sorry can't find page")
})// 사용자가 요청한 페이지가 없는 경우 에러처리 


app.use((err, req, res, next) => { //서버 내부 오류 처리
    console.error(err.stack)
    res.status(500).send("something is broken on server !")
})

const CONNECT_URL = 'mongodb://localhost:27017/kor_dic_db'
// mongoose.connect(CONNECT_URL, { //Momgo DB 서버연결
//     useNewUrlParser: true,
//     useUnifiedTopology: true

// }).then(() => console.log("mongodb connected..."))
//     .catch(e => console.log(`failed to connect mongodb: ${e}`))


app.get('/hello', (req, res) => { //URL 응답 테스트
    res.send('Hello World !')
})

//id값에 따라 출력값을 다르게 할때
// app.get('/hello/:id', (req, res) => {
//     res.send(req.params.id)
// })




//로컬호스트 서버
// app.listen(5000, () => { //5000 포트로 서버 오픈
//     console.log('server is running on port 5000..')
// })

//서버


// const points = [3, 4];
// const app = {}
// app.doubleNums = (points) => {
//     return points.map(p => {
//         return p * p
//     })
// }
// app.sum = (points_doubled) => {
//     let s = 0;
//     points_doubled.forEach(p => {
//         s += p;
//     })
//     return s;
// }
// app.sq = (s) => {
//     return Math.sqrt(s)
// }

// const pipeline = [app.doubleNums, app.sum, app.sq]
// const result = app.sq(app.sum(app.doubleNums(points)))
// console.log(result)