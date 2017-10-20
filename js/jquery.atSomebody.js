/**
 * Created by ALLIN on 2017/10/20.
 */
(function ($) {
    $.fn.atSomebody = function(options) {
        var atObj = {
            options:options,
            el:{
              originalObj:$(this),
                inputObj:null,
                inputBar:null
            },
            template:{
              inputBar:"<div class='atSomebodyBar'><input type='text' class='atSomebodyInput'/><ul class='atSomebodyList'><li class='atSomebodyItem'><img class='atSomebodyLogo' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508478135460&di=ed418838d32beabea5fbff449332e20c&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3829338173%2C728973309%26fm%3D214%26gp%3D0.jpg' alt=''><span class='atSomebodyDoctor'>某某医生</span><span  class='atSomebodyHospital'>某某医院</span></li></ul></div>"
            },
            data:{
              listenCode:64,
                lastWord:"",
                atOnOff:false,
                listenKey:8
            },
            init:function(){
                console.log("hello");
                var t = this;

                t.remouldEl(false);
                return t;
            },
            atSomebodyBegin:function(str){
              var t = this;
              var valStr = str;
              var nowLen = valStr.length;
              var searchStr = valStr.substring(1,nowLen);

              console.log(searchStr);
              if(searchStr.length){
                  var postData= {paramJson:t.options.postData(searchStr)};
                  $.ajax({
                      type : "GET",  //提交方式
                      url : t.options.path,//路径
                      data :postData,//数据，这里使用的是Json格式进行传输
                      success : function(data) {//返回数据根据结果进行相应的处理
                          t.showList(t.options.filterData(data));
                      }
                  });
              }
                return t;
            },
            showList:function(data){
              var t = this;
                var listObj = t.el.inputBar.find(".atSomebodyList");
                var str = "";
              if(data.length){
                  if(t.el.inputBar.position().top>300){
                      listObj .addClass("upSide").removeClass("downSide")
                  }else{
                      listObj .addClass("downSide").removeClass("upSide")
                  }
                  $.each(data,function(i,v){
                      str+='<li class="atSomebodyItem" data-customerId="'+v.customerId+'"><img class="atSomebodyLogo" src="'+v.logoUrl+'" alt=""><span class="atSomebodyDoctor">'+v.customerName+'</span><span class="atSomebodyHospital">'+v.hospital+'</span></li>';
                  });
              }
                listObj.html(str);
              if(str.length){
                  listObj.show();
              }else{
                  listObj.hide();
              }
              t.checkSomebody();
              return t;
            },
            checkSomebody:function(){
              var t = this;
              $(".atSomebodyItem").off("click").on("click",function(){
                  var isThis =$(this);
                  t.el.inputBar.before("<i class='atSomebodyTips' data-selected-id='"+isThis.attr('data-coustomerId')+"'>"+isThis.text()+"</i>");
                  t.iClick();
                  t.el.inputObj.val("").focus().removeClass("atSomebodyInputLight");
                  var listObj = t.el.inputBar.find(".atSomebodyList");
                  listObj.hide().html("");
                  t.data.atOnOff = false;
              });
              return t;
            },
            iClick:function(){
                var t = this;
                t.el.originalObj.find("i").off("click").on("click",function(e){
                    e.stopPropagation();
                    t.remouldEl(true,$(this));
                });
                return t;
            },
            inputStart:function(){
              var t = this;
                t.el.inputObj.off("input propertychange").on("input propertychange", function () {
                    var inputObj = $(this);
                    var valStr =inputObj.val();
                    var len = valStr.length;
                    t.data.lastWord = valStr[len-1];
                    if(t.data.lastWord){
                        if(t.data.lastWord.charCodeAt()===t.data.listenCode){
                            t.data.atOnOff = true;
                            inputObj.addClass("atSomebodyInputLight");
                        }else{
                            if(!t.data.atOnOff){
                                t.el.inputBar.before("<i>"+t.data.lastWord+"</i>");
                                t.iClick();
                                t.el.inputObj.val("").focus();
                            }else{
                                t.atSomebodyBegin(valStr);
                            }

                        }
                    }
                });
                t.el.inputObj.off("keydown").on("keydown",function(e){
                    var obj = $(this);
                    if(e.keyCode===t.data.listenKey){
                        t.el.inputBar.prev().remove();
                    }
                    e.stopPropagation();
                });
                t.el.originalObj.off("click").on("click",function(){
                    t.remouldEl(false);
                });
              return t;
            },
            remouldEl:function(ori,el){
                var t = this;
                $(".atSomebodyBar").remove();
                if(ori){
                    el.after(t.template.inputBar);
                }else{
                    t.el.originalObj.addClass("atSomebody").append(t.template.inputBar);
                }
                t.el.inputBar = $(".atSomebodyBar");
                t.el.inputObj = $(".atSomebodyInput");
                t.el.inputObj.focus();
                t.inputStart();
                return t;
            }
        };
        atObj.init();
    };
})(jQuery);