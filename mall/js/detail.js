$(function(){
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
    var urlArr = ['https://res.vmallres.com/pimages//display/10086232069466/800_800_b_web7563196BA57456F841F1EE117166F4545A7592C0574ECEBA.jpg',
'https://res.vmallres.com/pimages//product/6941487210626/800_800_ACE1CD80845649CE0FB2B5131E3110DCB4BC7CDED5B102BDmp.png',
'https://res.vmallres.com/pimages//product/6941487210626/group//800_800_0FFFA494449435E297820BB642A826B57D919073B4E08786.png',
'https://res.vmallres.com/pimages//product/6941487210626/group//800_800_0F33FAF05385753D0AE0C4C507B40E5D18C9539BBC4E9A79.png',
'https://res.vmallres.com/pimages//product/6941487210626/group//800_800_1841832235B3E3568E4C6F9ABFF018C5261DD2BA7229C4A6.png',
'https://res.vmallres.com/pimages//product/6941487210626/group//800_800_3FC8B3A9142523D503E22476AC14C008EC0972905E0D59FF.png',
'https://res.vmallres.com/pimages//product/6941487210626/group//800_800_DAF99DDE3318020FBFB5E8D794F6CDE44503F3C551902225.png']
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

})