// JavaScript Document

$(function(){
	//-----答题
	$('.answer .swiper-slide .L a').on('click',function(e){
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	$('.answer .swiper-slide .R a').on('click',function(e){
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	$('.selIcon a').on('click',function(e){
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	$('.dyznAnswer a,.subjectSlm a').on('click',function(e){
		$(this).addClass('active').siblings().removeClass('active');
	});
})

enjoyM3gCtrl();	

//-------保存并退出
function exit(){

	var dhtml = '<div class="mask"></div>';
		dhtml+= '<div class="exit">';
		dhtml+= '	<strong>温馨提示</strong>';
		dhtml+= '	<p>我们建议您在当前状态下，尽可能完成测试!</p>';
		dhtml+= '	<p>由于其他原因，您必须要退出的话，下次可以在【我的测评】——【未完成的测评】中继续完成该测试</p>';
		dhtml+= '	<a href="javascript:;" class="a">明白了，退出</a>';
		dhtml+= '	<a href="javascript:;" class="b">继续测试</a>';
		dhtml+= '</div>';
		
	$('body').append(dhtml);
	
	$('.exit a.b').on('click',function(){
		$('.mask,.exit').remove();	
	})
	
}


//------navMenu 切换
function tab(){
	$('.four a,.two a,.three a,.five a').on('click',function(){
		var self = $(this);
		var index = self.index();
		self.addClass('active').siblings().removeClass('active');
		$('.full .cont,.dyznFull .cont').eq(index).show().siblings().hide();
	});
}



//---微信二次分享
function enjoyM3gCtrl(){
    $.ajax({
        type: 'get',
        url: '/wechat/getJsSign',
        dataType: 'json',
        data: {url: window.location.href},
        success:function (data) {
            var $data = data.data.result
            wx.config({
                debug: false,
                appId: $data.appId,
                nonceStr: $data.nonceStr,
                timestamp: $data.timestamp,
                signature: $data.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
            })
        }
    })
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: '测测吧',
            link: 'http://192.168.4.207:8080/ccb/index.html',
            imgUrl: 'http://images6.hunli.baihe.com/topic/m/bjhyzncx/share300.jpg'
        });
        wx.onMenuShareAppMessage({
            title: '测测吧',
            desc: '分享导语',
            link: 'http://192.168.4.207:8080/ccb/index.html',
            imgUrl: 'http://images6.hunli.baihe.com/topic/m/bjhyzncx/share.jpg'
        })
    });
}