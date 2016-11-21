function subnavScroll(){
            var subnav_top=$('#subnav').offset().top;
            var subnavArr=[];

            for(var i=0;i<$('#subnav a').size();i++){
                  subnavArr[i]=$('#subnav a').eq(i).attr('href');
            };

            $(window).on('scroll',function(){ 
              var scrolltop=$(this).scrollTop();
              for(var j=0;j<subnavArr.length;j++){
                  if($(subnavArr[j]).offset().top<=scrolltop+50){
                      $('#subnav a').removeClass('active');
                      $('#subnav a').eq(j).addClass('active');
                  }
              };
              // console.log(scrolltop);
              if(subnav_top<=scrolltop){
                  
                  $('#subnav').css({
                      'position':'fixed',
                      'top':0,
                      'z-index':9999,
                  });
              }else{
                  $('#subnav').css({
                      'position':'relative',
                      
                  });
              }
              if($('#title1').offset().top==0){
                  $('#subnav a').removeClass('active');
                  $('#subnav a').eq(0).addClass('active');
              }
            })

            $('#subnav a').click(function(){
                  
                  $('#subnav a').removeClass('active');
                  $(this).addClass('active');
                  var titleId=$(this).attr('href');    
                  var titleOffset=$(titleId).offset().top;
                  $("html,body").animate({scrollTop:titleOffset-35},'slow');
                  return false;
            })
        }