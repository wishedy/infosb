#jquery.atSomebody.js
##实现在元素中自由的@某人并加载出人名列表

###引用
####html
>
```html
<元素></元素>：元素必须是一个块级元素 
```

####js
>
```javascript 
var options = {
    path:"接口请求路径"，
    postData：function（str）{
        //str传入的是此时此刻at的具体信息，例如@张三，str会传入张三
        //请求参数的处理，根据实际api书写，最后将data return出
      //return 数据格式{a:1,b:2}
    },
    filterData:function(data){
        //data为后台返回格式，根据实际数据格式，将数据处理成固定格式return出去
        //return数据格式[{customerId:"",customerName:"",hospital:"",logoUrl:""}]这两个字段是必须处理出来的
    }
}

$(元素).atSomebody(options);//元素的选取使用正常的jq方法，自己规定
```
####css
```css
目前的样式是参考唯医病例-发布-提醒某人下的样式
在使用是可以将sass模块jquery.atSomobody.scss当做一个模块引入自己的sass文件，由于各端样式不统一，这里可供修改样式的class做一个说明；

样式说明
整个艾特实现的最外层元素：atSomebody，
艾特input输入框所在的父元素：atSomebodyBar
艾特input输入框：atSomebodyInput
艾特点亮的时候：atSomebodyInputLight
艾特列表最外层：atSomebodyList
艾特单元元素：atSomebodyItem
艾特单元元素Logo：atSomebodyLogo
艾特单元元素人名：atSomebodyDoctor
艾特单元元素医院：atSomebodyHospital

```
####注意
>
>在scss模块中存在两个变量
>
>$size:18px;
>
>$height:30px;
>
>这两个变量，size是规定字体的大小，height是规定一行的高度，以及文字的行高，可自行配置