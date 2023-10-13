const http = require('http')
const { sendProducts } = require('./sendProducts')

const server = http.createServer((req, res) => {
  const { url, method } = req
  res.setHeader('Content-Type', 'application/json')

  if (url === '/ping' && method === 'GET') {
    return res.end(JSON.stringify({ message: '/ pong' }))
  }

  if (url === '/signup' && method === 'POST') return res.end(JSON.stringify({ message: '회원가입 완료!' }))
  if (url === '/login' && method === 'POST') return res.end(JSON.stringify({ message: '로그인 완료!' }))
  console.log("SENDPRODUCTS: ", sendProducts)
  if (url === '/products' && method === 'GET') return sendProducts(res)

  res.end(JSON.stringify({ message: 'this response answers to every request' }))
})

server.listen(8000, () => { console.log('server is listening on PORT 8000')})