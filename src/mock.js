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

/**
 * 登陆
 */
Mock.mock(RegExp('/login/*'), 'post', (config) => {
    //这里无法在header 里面添加 authorization 直接跳过
    console.log("mock login")
    return Result;
})

/**
 * 获取用户信息
 */
Mock.mock('/sys/userInfo', 'get', () => {
    Result.data = {
        id: '1',
        username: 'Admin2',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    };
    return Result;
})

/**
 * 获取菜单列表
 */
Mock.mock('/sys/menu-list', 'get', () => {

    let menuList = [
        {
            "id": 1,
            "title": "系统管理",
            "icon": "el-icon-s-operation",
            "path": "",
            "name": "sys:manage",
            "component": "",
            "children": [
                {
                    "id": 2,
                    "title": "用户管理",
                    "icon": "el-icon-s-custom",
                    "path": "/sys/users",
                    "name": "sys:user:list",
                    "component": "sys/User",
                    "children": []
                },
                {
                    "id": 3,
                    "title": "角色管理",
                    "icon": "el-icon-rank",
                    "path": "/sys/roles",
                    "name": "sys:role:list",
                    "component": "sys/Role",
                    "children": []
                },
                {
                    "id": 4,
                    "title": "菜单管理",
                    "icon": "el-icon-menu",
                    "path": "/sys/menus",
                    "name": "sys:menu:list",
                    "component": "sys/Menu",
                    "children": []
                }
            ]
        },
        {
            "id": 5,
            "title": "系统工具",
            "icon": "el-icon-s-tools",
            "path": "",
            "name": "sys:tools",
            "component": null,
            "children": [
                {
                    "id": 6,
                    "title": "数字字典",
                    "icon": "el-icon-s-order",
                    "path": "/sys/dicts",
                    "name": "sys:dict:list",
                    "component": "sys/Dict",
                    "children": []
                }
            ]
        }
    ];
    //权限
    let authorityList=['SysUser','SysUser:save'];
    Result.data={}
    Result.data.menuList=menuList;
    Result.data.authorityList=authorityList;
    return Result;
})