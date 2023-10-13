const http = require('http')
const express = require('express')
const app = express()
const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];
const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
]
const data=[
  {
		"userID"           : 1,
	  "userName"         : "Rebekah Johnson",
    "postingId"        : 1,
    "postingTitle"     : "간단한 HTTP API 개발 시작!",
		"postingContent"   : "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현."
	},
	{  
		"userID"           : 2,
	  "userName"         : "Fabian Predovic",
    "postingId"        : 2,
    "postingTitle"     : "HTTP의 특성",
		"postingContent"   : "Request/Response와 Stateless!!"
	},
	{  
		"userID"           : 3,
	  "userName"         : "new user 1",
    "postingId"        : 3,
    "postingTitle"  : "내용 1",
		"postingContent"   : "sampleContent3"
	},
	{  
		"userID"           : 4,
	  "userName"         : "new user 2",
    "postingId"        : 4,
    "postingTitle"  : "내용 2",
		"postingContent"   : "sampleContent4"
	}
]

const sendUsers = (req, res) => {res.json({users})}
const createUsers=(req, res) => {
  const user = ({
    id: 3,
    name: "Noah",
    email: "Noah@gmail.com",
    password: "123noah",
  });
  // res.json({message:'created!','user_id':user})
  res.json({message:'userCreated!'})
}
const sendPosts = (req, res) => {
  res.json({posts});
  // res.json({message:'created!','post':posts})
  res.json({message:'postCreated!'})
}
const checkPosts=(req,res)=>{
  res.json({data});
}
const updatePost=(req,res)=>{
  const inputPost = req.body
  const postId = req.postId
  const post = posts.find((post)=>post.id==postId)

  post.title=inputPost.title;
  post.content=inputPost.content;

  res.json({messge:'updated!','updatedPost':post})
}
  
module.exports = {sendUsers}
module.exports = {createUsers}
module.exports = {sendPosts}
module.exports = {checkPosts}
app.get('/users',sendUsers)
app.post('/users',createUsers)
app.post('/posts', sendPosts)
app.get('/checkposts',checkPosts)
app.patch('/posts/:postId',updatePost)

const server = http.createServer(app)
server.listen(8000, () => {console.log('server is listening on PORT 8000')})

