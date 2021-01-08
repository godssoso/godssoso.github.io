$(function () {
    //top处点击切换
    $('.t_inner a').eq(1).click(function () {
        $('.slide_f').slideUp();
        $(this).toggleClass('atoggle').children('i').eq(1).toggleClass('icon-jiantou_down').toggleClass('icon-jiantou-shang')
            .parent().next().removeClass('atoggle').children('i').eq(1).addClass('icon-jiantou_down').removeClass('icon-jiantou-shang');
        $('.slide_s').slideToggle();
    })
    $('.t_inner a').eq(2).click(function () {
        $('.slide_s').slideUp();
        $(this).toggleClass('atoggle').children('i').eq(1).toggleClass('icon-jiantou_down').toggleClass('icon-jiantou-shang')
            .parent().prev().removeClass('atoggle').children('i').eq(1).addClass('icon-jiantou_down').removeClass('icon-jiantou-shang');
        $('.slide_f').slideToggle();
    })
    // 头部导航效果
    $('.nav li').append('<span></span>');
    $('.nav li').mouseover(function () {
        var width = $(this).width();
        $(this).children('span').addClass('underLine').css('width', width);
    })
    $('.nav li').mouseleave(function () {
        $(this).children('span').removeClass('underLine').css('width', 0);
    })



    //购物车
    $('.buycar').mouseover(function () {
        $(this).children().eq(1).show();
        $(this).children().eq(0).children().eq(1).addClass('icon-jiantou-shang');
    })
    $('.buycar').mouseleave(function () {
        $(this).children().eq(1).hide();
        $(this).children().eq(0).children().eq(1).removeClass('icon-jiantou-shang');
    })


    //搜索框
    $('.h_sousuo').click(function () {
        $(this).hide();
        $('.buycar').hide();
        $('.nav').fadeOut();
        $('.h_right .search').fadeIn();
    })
    $('#inp_s').focus(function () {
        $('.tan').show();
    })
    $('#inp_s').blur(function () {
        $('.tan').hide();
    })
    $('.icon-cuo').click(function () {
        $('.h_right .search').hide();
        $('.nav').fadeIn();
        $('.buycar').show();
        $('.h_sousuo').show();
    })


    //轮播图

    var lis = $('.banner').children().eq(0).children();
    var width = $('.banner').width();
    lis.css('left',width).eq(0).css('left',0);
    light(0);
    var index = 0;
    var flag = true;
    $('.banner').mouseover(function(){
        $(this).children('i').show();
        clearInterval(timer);
        timer = null;
    })
    $('.banner').mouseout(function(){
        $(this).children('i').hide();
        timer = setInterval(function(){
            $('.next').trigger('click');
        },2000)
    })

    $('.next').click(function(){
        if(flag){
            flag = false;
            var next = index + 1;
            if(index == lis.length -1){
                next = 0;
            }
            lis.eq(next).css('left',width);
            lis.eq(index).stop().animate({'left':-width},2000).parent().children().eq(next).stop().animate({'left':0},2000,function(){flag = true});
            index = next;
            light(index);
        }  
    })
    $('.prev').click(function(){
        if(flag){
            flag = false;
            var next = index - 1;
            if(index == 0){
                next = lis.length - 1;
            }
            lis.eq(next).css('left',-width);
            lis.eq(index).stop().animate({'left':width},2000).parent().children().eq(next).stop().animate({'left':0},2000,function(){flag = true});
            index = next;
            light(index);
        }
    })

    $('.banner').children('ol').children().click(function(){
        var num = $(this).index();
        if(num > index){
            lis.eq(index).stop().animate({'left':-width}).parent().children().eq(num).stop().animate({'left':0},function(){flag = true});
            index = num;
            light(num);
        }else if(num < index){
            lis.eq(index).stop().animate({'left':width}).parent().children().eq(num).stop().animate({'left':0},function(){flag = true});
            index = num;
            light(num);
        }       
    })
    function light(index){
        $('.banner em').css('width',0).hide().eq(index).show().stop().animate({'width':100},2000);
        // $('.banner').find('em').css('width',0);
        // $('.banner').children('ol').children().eq(index).find('em').stop().animate({'width':100},2000);
        // $('.banner').children('ol').children().eq(index).children().css({'background':'red'}).parent().siblings().children().css({'background':'rgba(230,230,230,0.7)'});
    }
    var timer = setInterval(function(){
        $('.next').trigger('click');
    },2000)


    // function Play(banner) {
    //     this.banner = banner;//总容器
    //     this.ul = this.banner.children().eq(0);
    //     this.lis = this.ul.children();
    //     this.next = this.banner.children('i').eq(0);  //下一张箭头
    //     this.prev = this.banner.children('i').eq(1); //上一张箭头
    //     this.ol = this.banner.children('ol'); // 进度条
    //     this.init();
    // }
    // Play.prototype.init = function () {
    //     this.mouseover();
    //     this.mouseleave();
    // }
    // //鼠标移入事件
    // Play.prototype.mouseover = function () {
    //     var that = this;
    //     this.banner.mouseover(function () {
    //         // console.log(111);
    //         // console.log(that.prev);
    //         // console.log(that.next);
    //         // that.prev[0].style.display = 'block';
    //         // that.next[0].style.display = 'block';
    //         that.next.show();
    //         that.prev.show();
    //         // console.log(that.prev[0]);
    //     })
    // }
    // Play.prototype.mouseleave = function () {
    //     var that = this;
    //     this.banner.mouseleave(function () {
    //         that.prev.hide();
    //         that.next.hide();
    //     })
    // }
    // var play = new Play($('.banner'));


    // //购物车处定位切换
    $('.carbottom').mouseover(function () {
        $(window).scroll(function () {
            if (window.pageYOffset > $('.banner').position().top){
                $('.carbottom').css({
                    position:'fixed',
                    top:0,
                    left:1630
                })
            }else{
                $('.carbottom').css({
                    position:'absolute',
                    top:80,
                    left:-22
                })
            }
        })
    })


    //返回顶部
    $(window).scroll(function () {
        var height = $('#main').position().top;
        // console.log(height);
        if (window.pageYOffset > height) {
            $('.back').show();
        } else {
            $('.back').hide();
        }
    })
    $('.back').click(function () {
        // console.log(1);
        // console.log($(window));
        // $(window).animate({'pageYOffset':0});
        // $('body').animate({scrollTop:0});
        $('body,html').animate({ scrollTop: 0 });
        // return false;
    })
})