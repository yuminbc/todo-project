const express = require('express')
const TodoRouter = express.Router()
//models폴더에 있는 Todo와 관련된 코드를 들고온다.
const Todo = require('../models/Todo')

TodoRouter.route('/').get(async (req, res) => {
    const todos = await Todo.find()
    console.log(todos)
    res.json({ status: 200, todos })
})
// 위아래 코드 같은 것!!!
//TodoRouter.get('/', (req, res) => {
//     res.send('all todo list')
// })

TodoRouter.get('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) throw err;
        res.json({ status: 200, todo })
    })
})

//post는 생성하는 함수
//TodoRouter.route('/').post( (req, res) => 
TodoRouter.post('/', (req, res) => {
    console.log(`name: ${req.body.name}`)
    Todo.findOne({ name: req.body.name, done: false }, (err, todo) => {// 중복체크
        if (err) throw err;
        if (!todo) {// 데이터베이스에서 해당 할일을 조회하지 못한 경우
            const newTodo = new Todo(req.body);
            newTodo.save().then(() => {
                res.json({ status: 201, msg: 'new todo created in db !', newTodo })
            })
        } else {// 생성하려는 할일과 같은 이름이고 아직 끝내지 않은 할일이 이미 데이터베이스에 존재하는 경우
            const msg = 'this todo already exists in db !'
            console.log(msg)
            res.json({ status: 204, msg })
        }
    })
})

TodoRouter.put('/:id', (req, res) => {
    //데이터베이스 접속 후 id 값으로 모델 조회하고 변경함
    // res.send(`todo ${req.params.id} updated`)
    //{new: true}는 수정한 데이터 값을 db로 가져올수 있게하는 거
    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, todo) => {
        if (err) throw err;
        res.json({ status: 204, mag: `todo ${req.params.id} updated db !`, todo })
    })
})

TodoRouter.delete('/:id', (req, res) => {
    //데이터베이스 접속 후 id 값으로 모델 조회하고 삭제함
    // res.send(`todo ${req.params.id} deleted`)
    Todo.findByIdAndDelete(req.params.id, (err, todo) => {
        if (err) throw err;
        res.json({ status: 204, msg: `todo ${req.params.id} deleted db !`, todo })
    })
})

module.exports = TodoRouter

//  /api/todos