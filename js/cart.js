$(function(){
    //顶部下拉菜单
    $('.h_inner').find('.s_down').mouseover(function(){
        $(this).css('background','#fff').children('a').css('color','#cb242b').children('i').removeClass('icon-shangxiajiantou').addClass('icon-shang').parent().siblings('.b').show();
    })
    $('.h_inner').find('.s_down').mouseout(function(){
        $(this).css({background:'#f5f5f5',height:36}).children('a').css('color','#a4a4a4').children('i').removeClass('icon-shang').addClass('icon-shangxiajiantou').parent().siblings('.b').hide();
    })

    //登录显示
    function getCookie(key){
        str = "";
        var tmp = document.cookie.split('; ');
        for(var i=0;i<tmp.length;i++){
            var t = tmp[i].split('=');
            if(t[0]===key){
                str = t[1];
            }
        }
        return str;   
    }
    if(getCookie('username')){
        // falg = true;
        var str = getCookie('username').substr(0,2)+'*****';
        $('.h_inner .r_nav>li').eq(0).html(str+"<i class='iconfont icon-shangxiajiantou'></i><span class='bg'></span>");
        // $('.unlogin').find('.un_top').html('您好！ &nbsp;'+str);
        showPro();
        // if($('.products').length == 0){
        //     $('.products').hide().siblings('.empty').show();
        // }else{
        //     $('.products').show().siblings('.empty').hide();
        //     // getSum();
        //     // console.log(111);
        // }
    }else{
        // show();
        $('.products').hide().siblings('.empty').show();

    }
    function showPro(){
        $.ajax({
            url:'http://39.108.139.186:9999/cart/show',
            type:'get',
            dataType:'json',
            data:{
                username:getCookie('username')
            },
            success:function(res){
                // console.log(res.Data);
                var data = res.Data;
                // console.log(data);
                // console.log(data[0].Count,data[0].Price);
                // console.log(data.Count * data.Price);
                // console.log(data);
                // console.log(data.Picture,data.Title,data.Detail,data.Price.toFixed(2),data.Count,(data.Count * data.Price).toFixed(2));
                $.each(data,function(index,item){
                    // console.log(item.Count,item.Price);
                    var pristr = (item.Count * item.Price).toFixed(2);
                    // console.log((item.Count * item.Price).toFixed(2));
                $('.pro-warp').append(`<div class="pro-list">
                <div class="pro-list-left">
                    <span class="checkThis checked"></span>
                </div>
                <div class="pro-main">
                    <div class="pro-img">
                        <a href="#">
                            <img src=${item.Picture} alt="">
                        </a>
                    </div>
                    <ul class="clearfix">
                        <li style="width: 450px;">
                            <a href="#" class="pro-title">${item.Title}</a>
                            <p class="pro-info">${item.Detail}</p>
                            <div class="p-label">
                                <span>分期免息</span>
                            </div>
                            <p class="pro-id" style="display:none;">${item.Id}</p>
                        </li>
                        <li style="width: 140px;margin-left: 10px;margin-right: -20px;">
                            <div class="pro-price">
                                <span>￥ ${item.Price.toFixed(2)}</span>
                            </div>
                        </li>
                        <li style="width: 100px;margin-left: 30px;">
                            <div class="pro-stock">
                                <input type="number" class="num" value="${item.Count}">
                                <span class="stock-btn">
                                    <a href="javascript:;" class="cut">−</a>
                                    <a href="javascript:;" class="add">+</a>
                                </span>
                            </div>
                        </li>
                        <li class="pro-total" style="margin-left: 30px;width: 100px;">￥ ${pristr}</li>
                            
                        
                        <li style="margin-left: 30px;width: 100px;">
                            <a href="javascript:;" class="pro-del">删除</a>
                        </li>
                    </ul>
                </div>
            </div>`);
           
                })

                if($('.pro-warp .pro-list').length == 0){
                    // console.log(987);
                    $('.products').hide().siblings('.empty').show();
                }else{
                    $('.products').show().siblings('.empty').hide();
                    getSum();
                }
            }
         })
    }
    //购物车商品操作
    //全选模块
    var checked = true;
    // var checkedNum = 999;
    $('.checkAll').click(function(){
        if(checked){//未选中
            checked = false;
            $('.checkAll').removeClass('checked');
            $('.checkThis').removeClass('checked');
            // checkedNum=0;
        }else{//选中
            checked = true;
            $('.checkAll').addClass('checked');
            $('.checkThis').addClass('checked');
            checkedNum =$('.checkThis').length;
            // checkedNum = 999;
        }
        getSum();
        // console.log(222);
    })
    $('.pro-warp').on('click','.checkThis',function(){
        $(this).toggleClass('checked');
        if($(this).parents('.pro-warp').find('.checked').length == $(this).parents('.pro-warp').find('.checkThis').length){
            $('.checkAll').addClass('checked');
            checked = true;
        }else{
            $('.checkAll').removeClass('checked');
            checked = false;
        }
        getSum();
    })

    



    //数量小计模块
    //1.点击+或-时，显示的数量相应的增加或减少
    //2.点击+或-时，小计里的值相应的改变
    //3.直接输入修改数量时，小计里的值相应的改变
    //4.总件数等于三个数量相加，总价等于三个小计相加
    //加
    $('.pro-warp').on('click','.add',function(){
        var num = parseInt($(this).parent().prev().val());
        // console.log(num)  //val()获取的是字符串
        num++;
        $(this).parent().prev().val(num);
        //获取单价，去掉￥符号
        var p = $(this).parents('li').prev().find('span').html().substring(1);
        // console.log(p)
        //小计 = 单价 * 数量
        var price = (p * num).toFixed(2);
        $(this).parents('li').next().html('￥'+price);
        //调用函数实时修改总量和总价
        //避免选中商品后再变更商品数量时，总价和总量不变的问题
        getSum();
        $.ajax({
            url:'http://39.108.139.186:9999/cart/update',
            type:'post',
            dataType:'json',
            data:{
                username:getCookie('username'),
                id:$(this).parents('.pro-list').find('.pro-id').html(),
                count:$(this).parents('.pro-list').find('.num').val()
            },
            success:function(res){
                console.log(res);
            }
        })
    })
    //减
    $('.pro-warp').on('click','.cut',function(){  
        var num = parseInt($(this).parent().prev().val());
        num--;
        if(num<1){
            num=1;
        }
        $(this).parent().prev().val(num);
        //获取单价，去掉￥符号
        var p = $(this).parents('li').prev().find('span').html().substring(1);
        // console.log(p)
        //小计 = 单价 * 数量
        var price = (p * num).toFixed(2);
        $(this).parents('li').next().html('￥'+price);
        //调用函数实时修改总量和总价
        //避免选中商品后再变更商品数量时，总价和总量不变的问题
        getSum();
        $.ajax({
            url:'http://39.108.139.186:9999/cart/update',
            type:'post',
            dataType:'json',
            data:{
                username:getCookie('username'),
                id:$(this).parents('.pro-list').find('.pro-id').html(),
                count:$(this).parents('.pro-list').find('.num').val()
            },
            success:function(res){
                console.log(res);
            }
        })
    })
      //输入
     //直接输入修改数量时，小计里的值相应的改变
     $('.pro-warp').on('blur','.num',function(){
         if(!$(this).val()){
            $(this).val(1);
         }
         if($(this).val() < 1){
            $(this).val(1);
         }
        var num = parseInt($(this).val());
         //获取单价，去掉￥符号
         var p = $(this).parents('li').prev().find('span').html().substring(1);
         // console.log(p)
         //小计 = 单价 * 数量
         var price = (p * num).toFixed(2);
         $(this).parents('li').next().html('￥'+price);
        //调用函数实时修改总量和总价
        //避免选中商品后再变更商品数量时，总价和总量不变的问题
        getSum();
        $.ajax({
            url:'http://39.108.139.186:9999/cart/update',
            type:'post',
            dataType:'json',
            data:{
                username:getCookie('username'),
                id:$(this).parents('.pro-list').find('.pro-id').html(),
                count:$(this).val()
            },
            success:function(res){
                console.log(res);
            }
        })
    })

    //<--删除模块-->
    //1.点击操作栏下的删除时，当前商品消失
    //2.点击底部删除按钮时，所有商品清空
    $('.pro-warp').on('click','.pro-del',function(){   //点击操作栏下的删除时，当前商品消失
        $(this).parents('.pro-list').remove();
        if($('.pro-warp').find('.checked').length == $('.pro-warp').find('.checkThis').length){
            $('.checkAll').addClass('checked');
            checked = true;
        }else{
            $('.checkAll').removeClass('checked');
            checked = false;
        }
        getSum();  //更新总量和总价
        $.ajax({
            url:'http://39.108.139.186:9999/cart/delete',
            type:'post',
            dataType:'json',
            data:{
                username:getCookie('username'),
                id:$(this).parents('.pro-list').find('.pro-id').html(),
            },
            success:function(res){
                if($('.pro-warp .pro-list').length == 0){
                    // console.log(987);
                    $('.products').hide().siblings('.empty').show();
                }
            }
        })
    })

    //点击清理购物车时，所有商品清空
    $('.del').click(function(){
        $.each($('.pro-warp .pro-id'),function(index,item){
            $.ajax({
                url:'http://39.108.139.186:9999/cart/delete',
                type:'post',
                dataType:'json',
                data:{
                    username:getCookie('username'),
                    id:$(item).html(),
                },
                success:function(res){
                    console.log(res);
                }
            })
        })
        $('.pro-list').remove();
        getSum();//更新总量和总价
        $('.products').hide().siblings('.empty').show();

    })



    //获取总价
    function getSum(){
        // 设置总计
        // console.log(888);
        var numSum = 0;
        // $('.j-checkbox:checked').parents('.cart-item').find('.itxt').each(function(i,ele){
        //     numSum+=parseInt($(ele).val());
        // })
        // $('.amount-sum em').html(numSum)
        $('.pro-warp').find('.checked').parent().next().find('.num').each(function(index,ele){
            numSum+=parseInt($(ele).val());
        })
        $('.number').html(numSum);
        // console.log(777);

        //设置总价
        var priceSum = 0;
        $('.pro-warp').find('.checked').parent().next().find('.pro-total').each(function(index,ele){
        //    console.log($(ele).html());
            priceSum+=parseInt($(ele).html().substring(1));
        })
        $('.total-price').html('￥'+ ' '+ priceSum.toFixed(2));
        // console.log(priceSum);
        // console.log(666);
  }




    $('.f_inner .service .service_r .p4 ul li').eq(0).mouseover(function(){
        $(this).children('.img').show();
    })
    $('.f_inner .service .service_r .p4 ul li').eq(0).mouseout(function(){
        $(this).children('.img').hide();
    })
})