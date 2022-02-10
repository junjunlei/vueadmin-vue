const Mock = require('mockjs')

const Random = Mock.Random;

let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}

/**
 * 表是要拦截 /captcha 的ajax请求
 */
Mock.mock('/captcha', 'get', () => {
    Result.data = {
        //随机生成32位字符串
        token: Random.string(32),
        //生成验证码为123456的图片
        captchaImg: Random.dataImage("120x40", "12345")
    }
    return Result;
})


Mock.mock(RegExp('/login/*'), 'post', (config) => {
    //这里无法在header 里面添加 authorization 直接跳过
    console.log("mock login")
    return Result;
})

Mock.mock('/sys/userInfo', 'get', () => {
    Result.data = {
        id: '1',
        username: 'Admin2',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    };
    return Result;
})