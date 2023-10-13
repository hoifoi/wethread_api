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
    // {
    //     id: 3,
    //     name: "송은우",
    //     email: "king@wecode.com",
    //     password: "captinamerica",
    //   },
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
    // {
    //     id: 3,
    //     title: "깔끔한 파이썬 탄탄한 백엔드",
    //     content: "파이썬 개발 환경 구축부터 API 개발, HTTP, Database, Unit Test, AWS Deploy까지 백엔드 개발 입문의 모든 것!",
    //     userId: 3,
    // },
];
const postList=
{
	"data" : [
	{"userId": 1,
	"userName":"Rebekah Johnson",
    "postingId":1,
    "postingTitle":"간단한 HTTP API 개발 시작!",
    "postingContent":"Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현."
	},
	{"userId":2,
    "userName":"Fabian Predovic",
    "postingId":2,
    "postingTitle":"HTTP의 특성",
    "postingContent":"Request/Response와 Stateless!!"
	},
	{"userId":3,
	"userName":"new user 1",
    "postingId":3,
    "postingTitle":"내용 1",
	"postingContent":"sampleContent3"
	},
	{"userId":4,
	"userName":"new user 2",
    "postingId":4,
    "postingTitle":"내용 2",
    "postingContent":"sampleContent4"
	}
]
}

app.use(express.json())

app.get('/ping', (req,res)=>res.json({message:'/pong'}))
app.get('/checkData',(req,res)=>res.json({message:postList}))
app.get('/users',(req,res)=>res.json({message:users}))
app.get('/users/:userId',(req,res)=>{
    const data = req.params.userId // 주소창에 달리는 userId를 data에 대입
    const findedUser = users.find((user)=>user.id=data) // users에서 id가 data와 같은 것을 찾아 findedUser에 대입
    res.json({findedUser})
})

app.post('/signup',(req,res)=>{
    const data=req.body;
    res.status(200).json({message:"userCreated!",data})
    users.push(data)
    console.log(users)
})
app.post('/addPost',(req,res)=>{
    const data=req.body
    res.status(200).json({message:'postCreated!',data})
    posts.push(data)
    console.log(posts)
})

app.listen(8000,()=>{
    console.log('listening on port 8000')
})
