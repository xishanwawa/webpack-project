# SortAbleList 使用说明

## 引入组件 
```
import SortAbleList from 'components/SortAbleList' (？！path路径根据自己情况定)
```

## 使用组件 
```
<SortAbleList />
```

## 组件属性API
-- 列头信息 columns = {columns} 必须

-- 数据信息 data = {data} 必须

-- 是否可排序 sortAble = {true/false} 非必须 默认true

-- 是否支持增删  addAndDelAble = {true/false} 非必须 默认true

-- 是否可编辑    editAble = {true/false} 非必须 默认true

-- 回调函数 onChange = {data => { console.log(data)} } 非必须（但是如果不传，你用该组件的意义是啥？） //参数data为改变后的数据 


## columns列头信息格式
-- title： 列的头名称； 必须

-- dataIndex：对应数据data中键名； 必须

-- key：每列的唯一key，因为里面的map方法我已经用了index了，哈哈。 一般可以与dataIndex同名（提倡这么做）；必须， 不过我已经搞成非必须了。

-- render：选择渲染的组件，目前支持 text，input，select， switch， link(?!外传事件用link，不再支持button。 不是因为合理，是因为懒)；
   非必须，那就默认为text。

-- selectList： 当render为select的时候：需要定义下拉都有哪些项； 如果用了select，为必须

-- Event：当需要用link操作传出事件时定义的方法，参数为当前操作的记录和当前的index； 外传事件， 为必须


## data数据信息格式

-- 每一个键名都应该在列中对应一个dataIndex。

-- render为link，说明要用外传事件。描述文字目前写死，为：编辑


```
columns: [
    { 
    title: 'tab 名称', 
    dataIndex: 'name', 
    key: 'name',
    render: 'input',
    },
    { 
    title: '对应查看表', 
    dataIndex: 'tableType', 
    key: 'tableType',
    render: 'select',
    selectList:[
        {
        name:'表一',
        val:'table1'
        },
        {
        name:'表二',
        val:'table2'
        }
    ]
    }
],
data:[
    { 
    name: '页签不会太长的',
    tableType:'table1', 
    key: 1
    },
    { 
    name: '一般是2到7个字',
    tableType:'table2', 
    key: 2
    },
]
```