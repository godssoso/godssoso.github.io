$(function(){
    //顶部广告栏
    $('.top_banner span').click(function(){
        $('.top_banner').hide();
    })

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
    // function setCookie(key,value,expires){
    //     if(expires){
    //         var time = new Date();
    //         time.setTime(time.getTime()-8*60*60*1000 + 1000*expires);
    //         document.cookie = key+"="+value+";expires="+time;
    //     }else{
    //         document.cookie = key+"="+value;
    //     }
    
    // }
    // var falg = false;
    if(getCookie('username')){
        // falg = true;
        var str = getCookie('username').substr(0,2)+'*****';
        $('.h_inner .r_nav>li').eq(0).html(str+"<i class='iconfont icon-shangxiajiantou'></i><span class='bg'></span>");
        $('.unlogin').find('.un_top').html('您好！ &nbsp;'+str);
    }
    // else{
    //     falg = false;
    // }
    // $('.h_inner .r_nav>li').eq(0).mouseover(function(){
    //     if(falg){
    //         $(this).css({background:'#fff',color:'#ca141d'}).children('i').removeClass('icon-shangxiajiantou').addClass('icon-shang').siblings('div').show();
    //     }
    // })
    // $('.h_inner .r_nav>li').eq(0).mouseout(function(){
    //     if(falg){
    //         $(this).css({background:'#2e2828',color:'#afafaf'}).children('i').removeClass('icon-shang').addClass('icon-shangxiajiantou').siblings('div').hide();
    //     }
    // })
    // $('.sliderDown').click(function(){
    //     falg=false;
    //     setCookie('username',getCookie('username'),-1);
    //     var str2 = "<a href='../login.html'>请登录</a> &nbsp;<a href='../register.html'>注册</a><span class='bg'></span><div class='sliderDown'>退出登录</div>";    
    //     $('.h_inner .r_nav>li').eq(0).html(str2);
    //     // $(this).parent().css({background:'#2e2828',color:'#afafaf'});
    // })


    //侧边栏列表渲染
    // var arr = [0,1,2,3,4,5,6,7,8,9]
    $.ajax({
        url:'../json/list.json',
        dataType:'json',
        success:function (res) {
            // console.log(res[$(that).index()]);
           for(var i = 0;i<10;i++){
            $.each(res[i][0],function (index,item) {
                $('.left_list>ul>li').eq(i).find('ul').eq(0).append(`<li class="subcate-item">
                <a href="#">
                    <img src=${item.src} alt="">
                    <p><span>${item.dec}</span></p>
                </a>
            </li>`)
            })
            $.each(res[i][1],function (index,item) {
                $('.left_list>ul>li').eq(i).find('ul').eq(1).children('.subcate-btn').before(`<li class="subcate-item">
                <a href="#">
                    <img src=${item.src} alt="">
                    <p><span>${item.dec}</span></p>
                </a>
            </li>`)
            })
           }
            // $(that).children('.pros').show().parent().siblings().children('.pros').hide();
        }
    })


    $('.left_list>ul>li').mouseover(function(){
        $(this).children('.pros').show().parent().siblings().children('.pros').hide();

        // console.log(111);
        // $(this).css('background','rgba(255,255,255,1)')
        // $.ajax({
        //     url:'./list.json',
        //     dataType:'json',
        //     success:function (res) {
        //         // console.log(res[$(that).index()]);
        //         $.each(res[$(that).index()][0],function (index,item) {
        //             $(that).find('ul').eq(0).append(`<li class="subcate-item">
        //             <a href="#">
        //                 <img src=${item.src} alt="">
        //                 <p><span>${item.dec}</span></p>
        //             </a>
        //         </li>`)
        //         })
        //         $.each(res[$(that).index()][1],function (index,item) {
        //             $(that).find('ul').eq(1).children('.subcate-btn').before(`<li class="subcate-item">
        //             <a href="#">
        //                 <img src=${item.src} alt="">
        //                 <p><span>${item.dec}</span></p>
        //             </a>
        //         </li>`)
        //         })
        //         $(that).children('.pros').show().parent().siblings().children('.pros').hide();
        //     }
        // })
    })
    $('.left_list').mouseout(function(){
        $(this).find('.pros').hide();
    })



    //banner轮播图
    function Play(banner,ul){
        this.banner = $(banner);//总轮播图容器
        this.ul = $(ul);//图片容器
        this.img = this.ul.children();//图片li
        this.prev = this.banner.children('.prev');//上一张
        this.next = this.banner.children('.next');//下一张
        this.navlis = this.banner.children('.slider_nav').children();//小圆圈
        this.index = 0;//初始索引
        this.init();
    }
    Play.prototype.init = function(){
        this.mouseOver();
        this.mouseOut();
        this.nextImg();
        this.prevImg();
        this.navlisOver();
        this.outPlay();
    }
    //鼠标滑入事件
    Play.prototype.mouseOver = function(){
        var that = this;
        this.banner.mouseover(function(){
            clearInterval(that.timer);
            that.timer = null;
        })
    }
    //鼠标离开事件
    Play.prototype.mouseOut = function(){
        var that = this;
        this.banner.mouseout(function(){
            // console.log(111);
            that.timer = setInterval(function(){
                that.next.trigger('click');
            },4000)
        })
    }
    //下一张
    Play.prototype.nextImg = function(){
        var that = this;
        this.next.click(function(){
            that.index++;
            if(that.index > that.img.length - 1){
                that.index = 0;
            }
            that.img.eq(that.index).stop().fadeIn().siblings().stop().hide();
            that.light(that.index);
        })
    }
    //上一张
    Play.prototype.prevImg = function(){
        var that = this;
        this.prev.click(function(){
            that.index--;
            if(that.index < 0){
                that.index = that.img.length - 1;
            }
            that.img.eq(that.index).stop().fadeIn().siblings().stop().hide();
            that.light(that.index);
        })
    }
    //小圆圈鼠标滑过事件
    Play.prototype.navlisOver = function(){
        var that = this;
        this.navlis.mouseover(function(){
            // console.log(111);
            that.index = $(this).index();
            that.img.eq(that.index).stop().fadeIn().siblings().stop().hide();
            that.light(that.index);
        })
    }
    //自动播放
    Play.prototype.outPlay = function(){
        var that = this;
        this.timer = setInterval(function(){
            that.next.trigger('click');
        },4000)
    }
    //点亮小圆圈
    Play.prototype.light = function(num){
        this.navlis.eq(num).addClass('current').siblings().removeClass('current');
    }
    var p1 = new Play('#banner','.imgbox'); //轮播图#banner

    var p2 = new Play('.warp','.libox')//轮播图 .banner_slider


    //公告轮播
    var ann_ul = $('.announcement').find('ul');
    // console.log(ann_ul);
    ann_ul.index = 0;
    ann_ul[0].timer = setInterval(function(){
        ann_ul.index++;
        if(ann_ul.index == ann_ul.children().length){
            ann_ul.index = 1;
            ann_ul.css('marginTop',0);
        }
        ann_ul.animate({
            marginTop:-43 * ann_ul.index
        })   
    },2000)
    ann_ul.mouseover(function(){
        clearInterval(ann_ul[0].timer);
        ann_ul[0].timer = null;
    })
    ann_ul.mouseout(function(){
        ann_ul[0].timer = setInterval(function(){
            ann_ul.index++;
            if(ann_ul.index == ann_ul.children().length){
                ann_ul.index = 1;
                ann_ul.css('marginTop',0);
            }
            ann_ul.animate({
                marginTop:-43 * ann_ul.index
            })   
        },2000)
    })

    // 底部微信二维码显示隐藏
    $('.service_r').find('.img').parent().mouseover(function(){
        $(this).children('.img').show();
    })
    $('.service_r').find('.img').parent().mouseout(function(){
        $(this).children('.img').hide();
    })

    //点击触发的滑条
    function Slider(box,callback){
        this.box = $(box);//总容器
        this.ul = this.box.children('ul');
        this.lis = this.ul.children('li');
        this.back = this.box.children('.back');
        this.forword = this.box.children('.forword');
        this.index = 0;
        this.init();
    }
    Slider.prototype.init = function(){
        this.next();
        this.prev();
    }
    Slider.prototype.next = function(){
        var that = this;
        this.forword.click(function(){
            that.index++;
            that.ul.animate({
                left:-that.index * 1210
            })
            that.light(that.index);
        })
    }
    Slider.prototype.prev = function(){
        var that = this;
        this.back.click(function(){
            that.index--;
            that.ul.animate({
                left:-that.index * that.box.width()
            })
            that.light(that.index);
        })
    }
    Slider.prototype.light = function(num){
        if(num == 0){
            this.back.hide();
            this.forword.show();
        }
        if(num == 1){
            this.back.show();
            this.forword.show();
        }
        if(num == 2){
            this.back.show();
            this.forword.hide();
        }
    }
    var s1 = new Slider('.recommend');  //精品推荐滑条
    var s2 = new Slider('.watch_banner');//智能穿戴滑条
    var s3 = new Slider('.household_banner');//智能家居滑条
    var s4 = new Slider('.accessories_banner');//热销配件滑条
})

