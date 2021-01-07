$(function(){

    //顶部下拉菜单
    $('.h_inner').find('.s_down').mouseover(function(){
        $(this).css('background','#fff').children('a').css('color','#cb242b').children('i').removeClass('icon-shangxiajiantou').addClass('icon-shang').parent().siblings('.b').show();
    })
    $('.h_inner').find('.s_down').mouseout(function(){
        $(this).css({background:'#2e2828',height:36}).children('a').css('color','#afafaf').children('i').removeClass('icon-shang').addClass('icon-shangxiajiantou').parent().siblings('.b').hide();
    })


    //搜索框
    $('.search').find('.txt').focus(function(){
        $('.txtlink').hide();
        $('.search_history').show();
        if($(this).val()){
            $('.search_history').hide();
        }
    })
    $('.search').find('.txt').blur(function(){
        $('.txtlink').show();
        $('.search_history').hide();
        if($(this).val()){
            $('.txtlink').hide();
        }
    })
    $('.search').find('.txt').on('input',function(){
        $('.search_history').hide();
        $('.txtlink').hide();
        if(!$(this).val()){
            $('.search_history').show();
        }
    })
    //图片轮换显示
    var index = 0;
    var next = $('.img_nav').children('.right');
    var prev = $('.img_nav').children('.left');
    next.click(function(){
        index++;
        if(index > 2){
            index = 2;
            return;
        }
        $('.warp>ul').animate({left:-index *($('.warp>ul>li').width() + 10)});
    })
    prev.click(function(){
        index--;
        if(index < 0){
            index = 0;
            return;
        }
        $('.warp>ul').animate({left:-index * ($('.warp>ul>li').width() + 10)});
    })
    var urlArr = ['https://res.vmallres.com/pimages//product/6901443356867/800_800_6FE00BC588F53A91593E4221A2FF7B39BC0D05F41F669566mp.png',
'https://res.vmallres.com/pimages//product/6901443356867/group//800_800_A3D99D5468F5307A3290E1C5C577C02ACF6078564DD3B41F.PNG',
'https://res.vmallres.com/pimages//product/6901443356867/group//800_800_486290038D0110C1BC6D0ABA78144F2358EA41D9D97A252A.png',
'https://res.vmallres.com/pimages//product/6901443356867/group//800_800_14025D5E221A75DFBCD5177714B10121E3990783CD6EE494.png',
'https://res.vmallres.com/pimages//product/6901443356867/group//800_800_2B9D36D50425ED4F09471B92FC07F2DAD098A7A2C0414B38.png',
'https://res.vmallres.com/pimages//product/6901443356867/group//800_800_597F3209269CAFF9840D3F4D457C4224A87F45E18C94954F.png',
'https://res.vmallres.com/pimages//product/6901443356867/group//800_800_FB3F4BBF3958AEED3FCCE9FEEF9B2D8A488C57A63469EEEB.png']
    $('.warp>ul>li').mouseover(function(){
        $(this).addClass('current').siblings().removeClass('current');
        $('.sImg>img').prop('src',urlArr[$(this).index()]);
        $('.sImg>.bigImg>img').prop('src',urlArr[$(this).index()]);
    })

    //放大镜效果
    $('.sImg').mouseover(function(){
        $(this).children('.mask').show().next().show();

    })
    $('.sImg').mouseout(function(){
        $(this).children('.mask').hide().next().hide();
    })
    // 鼠标移动的时候，让黄色的盒子跟着鼠标来走
    $('.sImg').mousemove(function(e) {
        // (1). 先计算出鼠标在盒子内的坐标
        var x = e.pageX - $(this)[0].offsetLeft;
        var y = e.pageY - $(this)[0].offsetTop;
        // console.log(x, y);
        // (2) 减去盒子高度 300的一半 是 150 就是我们mask 的最终 left 和top值了
        // (3) 我们mask 移动的距离
        var maskX = x - $('.mask')[0].offsetWidth / 2;
        var maskY = y - $('.mask')[0].offsetHeight / 2;
        // (4) 如果x 坐标小于了0 就让他停在0 的位置
        // 遮挡层的最大移动距离
        var maskMax = $(this)[0].offsetWidth - $('.mask')[0].offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        $('.mask')[0].style.left = maskX + 'px';
        $('.mask')[0].style.top = maskY + 'px';
        // console.log(maskX,maskY);
        // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        // 大图
        var bigIMg = $('.bigImg>img')[0];
        // 大图片最大移动距离
        var bigMax = $('.bigImg>img').width() - $('.bigImg').width();
        // 大图片的移动距离 X Y
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';
    })

    //开售倒计时
    function timeDown(){
        var nowTime = new Date();
        var year = nowTime.getFullYear();
        // console.log(nowTime.getFullYear());
        var nextMonth = nowTime.getMonth() + 2;
        if(nextMonth > 12){
            nextMonth = '01';
        }else if(nextMonth <10){
            nextMonth = '0' + nextMonth;
        }
        $('.product-time>p>em').html(nextMonth);
        var nextTime = new Date(year+'-'+nextMonth+'-06'+' 10:08');
        // console.log(nextTime);
        // console.log(nowTime);
        var times = (nextTime.getTime() - nowTime.getTime()) / 1000;
        // console.log(times);
        var day = parseInt(times/60/60/24);
        var hour = parseInt((times / 60 / 60) % 24); 
        var minute = parseInt((times / 60) % 60); 
        var second = parseInt(times % 60); 
        day = day < 10 ? '0' + day : day;
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        // console.log(day,hour,minute,second);
        $('.product-time li').eq(0).html(day);
        $('.product-time li').eq(1).html(hour);
        $('.product-time li').eq(2).html(minute);
        $('.product-time li').eq(3).html(second);
    }
    timeDown();
    setInterval(function(){
        timeDown();
    },1000)

    //登录跳转
    var dataStr = $('.product-color li').eq(0).children('span').html() + $('.product-version li').eq(0).children('span').html() + $('.product-package li').eq(0).children('span').html();
    // var price = $('.price i').html() + $('.price b').html();
    var flag = true;
     $('.btn').click(function(){
         if(flag){
            location.href = '../login.html';
         }else{
            $('.model').show()
            $('.bigMask').show();
            $.ajax({
                url:'http://39.108.139.186:9999/cart/add',
                type:'post',
                dataType:'json',
                data:{
                    username:getCookie('username'),
                    id:$('#product-id').html(),
                    picture:$('.img_nav img').eq(0).prop('src'),
                    title:$('.pro-name').html(),
                    detail:dataStr,
                    price:$('.price b').html(),
                    count:$('#num').val()
                },
                success:function(res){
                    console.log(res);
                }
            })
         }
     })
    //  查看商品信息
     /* $.ajax({
        url:'http://39.108.139.186:9999/cart/show',
        type:'get',
        dataType:'json',
        data:{
            username:getCookie('username')
        },
        success:function(res){
            console.log(res);
        }
     }) */
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
    // console.log(getCookie('username'));
    if(getCookie('username')){
        $('.btn').html('加入购物车');
        flag=false;
    }

    if(getCookie('username')){
        // falg = true;
        var str = getCookie('username').substr(0,2)+'*****';
        $('.h_inner .r_nav>li').eq(0).html(str+"<i class='iconfont icon-shangxiajiantou'></i><span class='bg'></span>");
        // $('.unlogin').find('.un_top').html('您好！ &nbsp;'+str);
    }

    //商品数量调整
    $('.add').click(function(){
        // $('#num').val($('#num').val() + 1)  ;
        var num = parseInt($('#num').val()) + 1;
        $('#num').val(num);
    })
    $('.cut').click(function(){
        var num = parseInt($('#num').val()) - 1;
        if(num < 1){
            $('#num').val(1);
        }else{
            $('#num').val(num);
        }
    })

    //弹出框拖动
    $('.m_title>span').click(function(){
        $('.model').hide();
        $('.bigMask').hide();
    })
    $('.look').click(function(){
        $('.model').hide();
        $('.bigMask').hide();
    })
    $('.go').click(function(){
        location.href = './cart.html';
    })
     //.鼠标按住标题栏可以拖动
     $('.m_title')[0].onmousedown = function(e){
        e = e || window.event;
        //按下的瞬间记录当前鼠标在box中的坐标
        var x = e.pageX - $('.model')[0].offsetLeft;
        var y = e.pageY -  $('.model')[0].offsetTop;
        document.onmousemove = move;
        function move (e){
            e = e || window.event;
            //根据鼠标在box中的坐标不变，时刻变化box的left和top值，让它跟着鼠标移动
            $('.model')[0].style.left = e.pageX - x + 'px';
            $('.model')[0].style.top = e.pageY - y + 'px';
        }
        $('.m_title')[0].onmouseup = function(){
            document.onmousemove = null;
        }
    }

    



    $('.f_inner .service .service_r .p4 ul li').eq(0).mouseover(function(){
        $(this).children('.img').show();
    })
    $('.f_inner .service .service_r .p4 ul li').eq(0).mouseout(function(){
        $(this).children('.img').hide();
    })

    $('.product-tab a').hover(function(){
        $(this).addClass('current').siblings().removeClass('current');
    })
})