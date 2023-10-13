const { appDataSource } = require('./datasource')

// 신규 회원가입
const signUp = async(req,res)=>{
    const userName = req.body.nickname
    const userEmail = req.body.email
    const userPassword = req.body.password
    const userData = await appDataSource.query(`
        insert into users (nickname, email, password)
            values ('${userName}', '${userEmail}', '${userPassword}')
    `)
    console.log('TYPEORM RETURN DATA : ',userData)
    return res.status(201).json({message:'SIGNUP_SUCCESS'})
}

// 모든 유저 정보 조회
const allUserSearch = async(req,res)=>{
    const userSearch = await appDataSource.query(`
        select * from users
    `)
    return res.status(201).json(userSearch)
}

module.exports = { signUp, allUserSearch }