$(function(){
    //顶部广告栏
    $('.top_banner span').click(function(){
        $('.top_banner').hide();
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
})

