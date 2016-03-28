/**
 * Created by zss-manong on 2016/3/23.
 */
$(document).ready(function(){
    //使每个筛选标签的前10个之后的标签隐藏
    //标签数量不大于8个的，隐藏更多按钮。
    $(".f-labels").each(function(){
       if($(this).children("li").length <= 8){
           $(this).parent().next(".more").hide();
       }else{
           $(this).children("li:gt(7)").hide();//表示大于第7个的，开始索引从0开始
       }
    });

    //使多选的确定和取消按钮消失
    var $m_a = $(".multiple-btn");
    $m_a.hide();

    //筛选标签的hover样式
    $(".filter li>a").hover(function(){
        $(this).css({"color":"#D11C00","font-weight":600});
    },function(){
        $(this).css({"color":"#7b7b7b","font-weight":500});
    });

    //一行筛选样式的阴影效果
    $(".f-row").hover(function(){
        $(this).css("box-shadow","1px 2px 3px #c0c0c0");
    },function(){
        $(this).css("box-shadow","0px 0px 0px");
    });

    //一行末尾更多和多选按钮的样式
    $(".multiple,.more").hover(function(){
        $(this).css("box-shadow","1px 1px 3px #c0c0c0");
    },function(){
        $(this).css("box-shadow","0px 0px 0px");
    });

    //更多
    //****绝对重要提示1：不能通过定义变量的形式对上一个变量进行引用，每一条选择器必须有$(this)，也就是变量初始化后不能在用于初始化另一个变量****
    //****绝对重要提示2：当使用children后代选择器的时候，为了避免不必要的麻烦，应该尽量使用带参数的，比如元素名称或者类名，因为使用bootstrap存在before以及after的伪类，也算dom树结构的一个节点****
    $(".more").each(function(){
            $(this).click(function(){
                var $f_head = $(this).parent().children(".f-head");
                var $f_select = $(this).parent().children(".f-select");
                var $hidden_li = $(this).parent().children(".f-select").children("ul").children("li:gt(7)");//表示大于第7个的，开始索引从0开始
                var $first_li = $(this).parent().children(".f-select").children("ul").children("li:eq(0)"); //第一个的索引为0
                var $icon_change = $(this).children("a").children(".glyphicon");
                var $text_change = $(this).children("a").children(".text");

                // if($(".glyphicon").hasClass("glyphicon-chevron-up"))
                //类选择器不知道为什么不能用？
               if ($hidden_li.is(":visible"))   //必须保证li标签的数量大于8
                {
                    $icon_change.removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
                    $text_change.text(" 更多");
                    $hidden_li.hide();
                    $first_li.show();//显示'全部'
                    $f_head.height(33);
                    $f_select.height(16); //ul的padding为34-(9 x 2 )=16原来的高度为34px,这里的height为除去margin和padding的内容部分的高度
                    //此处的height为内容的高度
                }
                else {
                    $icon_change.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
                    $text_change.text(" 收起");
                    $hidden_li.show();
                    $first_li.hide(); //隐藏'全部'
                    var department_height = $f_select.css("height", "auto").height();
                    $f_head.height(department_height + 17); //ul的padding: 9 x 2 -1 (-1是因为department-head的margin-top为1px)
                    //这里的height为div的高度
                }
            })
    });

    //多选
    $(".multiple").each(function(){
        $(this).click(function(){  //以下所有后代元素选择器均可用find代替
            var $f_row = $(this).parent();
            var $f_head = $(this).parent().children(".f-head");
            var $f_select = $(this).parent().children(".f-select");
            var $multiple_btn = $(this).parent().children(".f-select").children(".multiple-btn");
            var $multiple_enter = $(this).parent().children(".f-select").children(".multiple-btn").children(".multiple-enter").children("a");
            var $hidden_li = $(this).parent().children(".f-select").children("ul").children("li:gt(7)");//表示大于第7个的，开始索引从0开始
            var $all_li = $(this).parent().children(".f-select").children("ul").children("li");
            var $first_li = $(this).parent().children(".f-select").children("ul").children("li:eq(0)"); //第一个的索引为0
            var $last_li = $(this).parent().children(".f-select").children("ul").children("li:last-child");//指的是li元素的父元素（ul）的最后一个子元素。
            var $more = $(this).prev(".more");

            $(this).hide();
            $more.hide();
            $last_li.css("margin-bottom","40px");
            if($hidden_li.length > 0){
                $hidden_li.show();
            }
            $multiple_btn.show();
            $f_row.css("background-color","#EFECEB");
            $first_li.hide(); //隐藏'全部'
            var department_height =  $f_select.css("height","auto").height();
            $f_head.height(department_height+17); //ul的padding: 9 x 2 -1 (-1是因为department-head的margin-top为1px)
                                                                //这里的height为div的高度

            $all_li.each(function(){
                $(this).bind("click.multiple",function(){
                    if($(this).hasClass("selected")){
                        var selected_length = $(this).parent().children("li.selected").length;
                        if(selected_length < 2){ //jq不具有容错机制，rm class失败不能执行下一步的add class
                            $multiple_enter.removeClass("active").addClass("disabled");

                        }
                        $(this).removeClass("selected");
                    }else{
                        var selected_length = $(this).parent().children("li.selected").length;
                        if(selected_length === 0){
                            $multiple_enter.removeClass("disabled").addClass("active");
                        }
                        $(this).addClass("selected");
                    }
                    $(this).hover(function(){
                        $(this).css("border-color","#D11C00");
                    },function(){
                        $(this).css("border-color","#a8a8a8");
                    });

                });
                /*
                $(this).bind("mouseover.border1",function(){
                    $(this).css("border-color","#D11C00");
                });
                $(this).bind("mouseout.border2",function(){
                    $(this).css("border-color","#a8a8a8");
                });
                 */
            });
        });
    });


    //多选-取消所有选择
    $(".multiple-delete").each(function() {
        $(this).click(function () {
            var $f_row = $(this).parent().parent().parent();
            var $f_head = $(this).parent().parent().parent().children(".f-head");
            var $f_select = $(this).parent().parent();
            var $multiple_btn = $(this).parent();
            var $multiple_enter = $(this).prev(".multiple-enter").children("a");
            var $hidden_li = $(this).parent().parent().children("ul").children("li:gt(7)");//表示大于第7个的，开始索引从0开始
            var $all_li = $(this).parent().parent().children("ul").children("li");
            var $first_li = $(this).parent().parent().children("ul").children("li:eq(0)"); //第一个的索引为0
            var $last_li = $(this).parent().parent().children("ul").children("li:last-child");
            var $more = $(this).parent().parent().parent().children(".more");
            var $multiple = $(this).parent().parent().parent().children(".multiple");
            var $icon_change = $(this).parent().parent().parent().children(".more").children("a").children(".glyphicon");
            var $text_change = $(this).parent().parent().parent().children(".more").children("a").children(".text");
            //使多选时，选择按钮的效果消失
            $all_li.each(function () {
                $(this).unbind("click.multiple");
                if($(this).hasClass("selected")){  //为什么要加判断呢？是因为jq不能容错！
                    $(this).removeClass("selected");
                }
                if($multiple_enter.hasClass("active")){
                    $multiple_enter.removeClass("active").addClass("disabled");
                }
            });
            //其他
            $icon_change.removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
            $text_change.text(" 更多");
            if ($hidden_li.length > 0) {
                $hidden_li.hide();
                $more.show();
            }
            $multiple_btn.hide();
            $last_li.css("margin-bottom", "20px");
            $f_row.css("background-color", "transparent");//div默认背景色为透明的，如果设置成白色的将遮盖住阴影的颜色。
            $multiple.show();
            $first_li.show();//显示'全部'
            $f_head.height(33);
            $f_select.height(16); //ul的padding为34-(9 x 2 )=16原来的高度为34px,这里的height为除去margin和padding的内容部分的高度
            //此处的height为内容的高度

        });
    });













})


