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

-- 是否支持增删区域宽度 addAndDelAbleSpan  ={num||3}

-- 是否可排序区域宽度 sortAbleSpan  ={num||3}

-- 是否显示列头    showHeader = {true/false} 非必须 默认true

-- plusPlace 添加位置 默认是 'next' 'last' 为末尾添加一行

-- plusType 添加类型  默认是 'copy'复制， costom 为自定义 

-- plusTypeData 配合plusType自定义的时候使用， 为添加的数据格式


-- hasMinus 判断该行是否支持删除该行按钮 hasMinus  默认为‘hasMinus’属性 ，也可以自定义键名。

-- hasPlus 判断该行是否支持添加一行按钮 hasPlus  默认为‘hasPlus’属性

-- commonPlus 判断统一有或没有加一项按钮

-- delAsk  删除操作是否询问，默认是false

-- allowLenZero 是否允许0项

-- upDownControlText  '上移/下移' 自定义文字

-- addDelControlText  '添加/删除',自定义文字

-- 回调函数 onChange = {data => { console.log(data)} } 非必须（但是如果不传，你用该组件的意义是啥？） //参数data为改变后的数据 


## columns列头信息格式
-- title： 列的头名称； 必须

-- dataIndex：对应数据data中键名； 必须

-- key：每列的唯一key，因为里面的map方法我已经用了index了，哈哈。 一般可以与dataIndex同名（提倡这么做）；必须， 不过我已经搞成非必须了。

-- render：选择渲染的组件，目前支持 text，input， inputNumber, select， boolean（switch），render函数 (item , text, index)；非必须，那就默认为text。

-- selectList： 当render为select的时候：需要定义下拉都有哪些项； 如果用了select，为必须

-- span: 宽度，1-24;(和table的antd 的布局一样)

-- checkedText 为布尔类型时的true值文字

-- unCheckedText 为布尔类型时的false值文字

-- min 最小值，max 最大值，都是在 render为 inputNumber时使用，默认 -无穷

## data数据信息格式

-- 每一个键名都应该在列中对应一个dataIndex。

-- render为link，说明要用外传事件。描述文字目前写死，文字为：编辑


```
columns = [
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
]

data = [
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