// 각 메소드에 필요한 함수를 따로 분리 했을 때 아래와 같이 경로를 포함한 함수를 만들어주고 맨 아래에 exports함수를 만들어준다
const { signUp } = require('./services/userServices')
const { createdPost, getAllPosts } = require('./services/postServices')



const createThread = async(req,res)=>{
    console.log("function start")  // 오류 발생에 대비 함수가 발동하는지 체크를 한다(함수를 잘 작성 했다면 이 문구가 뜰 것이고 그렇지 않으면 함수 설정을 잘못 한것)
    // request body에서 사용자의 게시글 정보를 받는다
    const title = req.body.title
    const content = req.body.content
    const userId = req.body.userId
    console.log(title,content,userId)  // 보낸 정보가 잘 들어오는지 확인
    // posts의 title, content, user_id를 DB에 입력
    // 가능하면 쿼리는 소문자로 써야 하는 것 외에는 대문자로 구별을 해주는 것이 장기적으로는 좋다
    const postData = await appDataSource.query(`
        INSERT INTO posts (
            title,
            content,
            user_id
        ) VALUES (
            '${title}',
            '${content}',
            '${userId}'
        )
    `)
    // DB에 저장되었는지 확인하기
    // front에게 잘 저장되었다고 저장
    return res.status(201).json({"message":"SIGNUP_SUCCESS"})
}

const getAllpost = async(req,res)=>{
    // 프론트로 부터 따로 받을 정보는 없음
    // DB에서 모든 게시글 정보를 불러옵니다(작성자 이름까지)
    const postData = await appDataSource.query(`
        select u.id, u.name, p.title, p.content, p.user_id, p.created_at as createdAt from users u join posts p on u.id = p.usdrs_id
    `)  // 테이블 뒤에 약어를 쓰면 그 약어를 쿼리에서 쓸 수 있다 users 대신에 u를 쓰면 users.id 대신에 u.id를 쓸 수 있는 방식
        // 칼럼 뒤에 as "바꾸고 싶은 이름"을 쓰면 원래 칼럼 대신 다른 이름으로 노출이 되게 할 수 있다
        // 원래는 created_at이지만 createdAt으로 쏴주는 식(프론트는 스네이크 표기법을 따로 배우지 않아 이 과정이 필요할 수 있다)
        // 하지만 이 경우는 typeORM처럼 npm에서 주는 함수가 따로 있어 이 함수를 쓰면 편할것이다
    // 데이터 잘 가지고 왔는지 확인
    console.log(postData)
    // 잘 가져왔으면 프론트에게 게시글 데이터 보내기
    return res.status(200).json({"message":"SUCCESS","postData":postData})
}

app.post("/posts",createThread)
app.get("/posts",getAllPosts)   // 함수 이름은 동사로 확실히 표현해주는게 좋음 allPost보다는 getAllPost가 더 좋다는 의미

module.exports = {createdPost, getAllPosts}