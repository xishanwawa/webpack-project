// import Mock   from 'mockjs'

// let data = Mock.mock('http://g.cn', {
//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//     'list|10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1,
//         "number|100-200": 100,
//         "string|1-5": "★",
//          "array|1": [
//             "北京",
//             "上海",
//             "广州"
//         ],
//         "date":'@datetime("yyyy-MM-dd HH:mm:ss")'
//     }]
// })
// // 输出结果
// export default  data;

//列表接口
Mock.mock('http://g1.cn', {
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        "number|100-200": 100,
        "string|1-5": "★",
        "array|1": [
            "北京",
            "上海",
            "广州"
        ],
        "date":'@datetime("yyyy-MM-dd HH:mm:ss")'
    }]
})