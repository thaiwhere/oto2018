$(document).ready(function(){
	
    $("#slider").slider(
	{ 
		max: 16,
		range: 'min',
		animate: true,
		values: [lowprice,highprice],
		slide: function(event, ui) 
		{ 
			
			do_filter_price();
			$("#val1").html($("#slider").slider( 'values' , 0 )+"-"+$("#slider").slider( 'values' , 1 ));
		}

	});
	
	$("#slider").slider('disable');
	document.getElementById("price_check").checked=0;
	
		$('input:checkbox:not([safari])').checkbox();
				$('input[safari]:checkbox').checkbox({cls:'jquery-safari-checkbox'});
				$('input:radio').checkbox();
				$('a.code').each(function() {
					$(this).click(function(){
						eval($(this).text());
						return false;
					})
				});	
	
	active_filter_link('carstatus',carstatus);
	active_filter_link('carimage',carimage);
	active_filter_link('fueltype',fueltype);
	active_filter_link('transmission',transmission);
	active_filter_link('fromtype',fromtype);
	active_filter_link('exteriorcolor',exteriorcolor);
	active_filter_link('bodystyle',bodystyle);
	active_filter_link('numseats',numseats);
	active_filter_link('drivetrain',drivetrain);
	active_filter_link('caryear',caryear);
	
	$("#exteriorcolor_group .sub-nav a").each(function() 
	{ 
		
		if($(this).hasClass("active"))
		{
			$("#exteriorcolor_other").html($(this).html());
			$("#exteriorcolor_other").addClass("active");
		}
		
	});
	$("#bodystyle_group .sub-nav a").each(function() 
	{ 		
		if($(this).hasClass("active"))
		{
			$("#bodystyle_other").html($(this).html());
			$("#bodystyle_other").addClass("active");
		}
		
	});
	
	if(pricefilter==1)
	{
		document.getElementById("price_check").checked=1;	
		check_price();
	}
	if(readCookie("show_ext_flag")=='true')
	{
		show_ext(false);
		show_ext_flag=true;
	}
	
  });
  function check_price()
  {
	
	chk=document.getElementById("price_check");
	
	   if (chk.checked == 1)
	   {
			$("#div_price_check").attr("title","");
			$("#price_slider").attr("title","Tìm kiếm xe theo giá. Thực hiện bằng cách kéo di các mốc giá (thấp nhất và cao nhất) theo lựa chọn của bạn.");
			
			pricefilter=1;
			$("#slider").slider('enable');
			$("#slider_val_bg").removeClass("ui-state-disabled");
			if(lowprice==0 && highprice==16) return;
			if(flag_load==true)
			{
				do_filter_price();
			}
			flag_load=true;
			
			
	   }else
	   {
			$("#div_price_check").attr("title","Click vào đây để thực hiện tìm xe theo giá");
			$("#price_slider").attr("title","Tìm kiếm xe theo giá. Thực hiện bằng cách click vào dấu check bên trái và kéo di các mốc giá (thấp nhất và cao nhất) theo lựa chọn của bạn.");
			pricefilter=0;
			$("#slider").slider('disable');
			$("#slider_val_bg").addClass("ui-state-disabled");
			if(flag_load==true)
			{
				do_filter_price();
			}
			flag_load=true;
	   }

  }
  function test()
  {
	$("#slider").slider('disable');
  }
var show_ext_flag=false;

function show_ext(animation)
{
	if(show_ext_flag)
	{
		if(animation)
		{
			$("#ext-filter").slideUp("normal");
			setTimeout ( '$("#expand_text").html("Mở rộng điều kiện tìm kiếm [ <b>+</b> ]")', 500 );
		}else
		{
			$("#ext-filter").hide();
			$("#expand_text").html("Mở rộng điều kiện tìm kiếm [ <b>+</b> ]");
		}
				
		show_ext_flag=false;
	}else
	{
		if(animation)
		{
			$("#ext-filter").slideDown("normal");
			setTimeout ( '$("#expand_text").html("Thu nhỏ điều kiện tìm kiếm [ <b>-</b> ]")', 500 );	
		}else
		{
			$("#ext-filter").show();
			$("#expand_text").html("Thu nhỏ điều kiện tìm kiếm [ <b>-</b> ]");
		}
		
				
		show_ext_flag=true;
	}
	createCookie("show_ext_flag",show_ext_flag,1);	
	return false;
}
function active_filter_link(name,val)
{
	
	$("#"+name+"_group a").each(function() 
	{ 
		$(this).removeClass("active");
		id=$(this).attr('id');
		$arr=id.split('_');
		if($arr[1]==val)
		{
			$(this).addClass("active");
		}
	});
	
}
var pending_post=null;
function do_filter_price()
{
	if(pending_post!=null) clearTimeout(pending_post);
	chk_price=document.getElementById("price_check");	   
	lowprice=$("#slider").slider( 'values' , 0 );
	highprice=$("#slider").slider( 'values' , 1 )
	if((lowprice==0 && highprice==16 && !chk_price.checked))
	{
		var ct = new Date();
		strURL=cur_url.replace('oto','search-ajax')+'?t='+ct.getTime();	
		$.post(strURL,{bbsajaxurl:cur_url,ajax:1,savestatus:1,carstatus:carstatus,carimage:carimage,fueltype:fueltype,transmission:transmission,fromtype:fromtype,exteriorcolor:exteriorcolor,bodystyle:bodystyle,numseats:numseats,drivetrain:drivetrain,caryear:caryear,lowprice:lowprice,highprice:highprice,pricefilter:pricefilter,showgrid:showgrid,orderby:orderby}, function(data){});
	}else
	{
		pending_post=setTimeout("do_post_ajax()",1000);
	}
}

function do_filter(obj)
{
	id=$(obj).attr('id');
	$arr=id.split('_');
	eval($arr[0]+"="+"'"+$arr[1]+"'");		
	active_filter_link($arr[0],$arr[1]);	
	
	do_post_ajax();
	
}
function do_post_ajax()
{

	$("#loading_data").show();
	var ct = new Date();
	strURL=cur_url.replace('oto','search-ajax')+'?t='+ct.getTime();
	
	$.post(strURL,{bbsajaxurl:cur_url,ajax:1,carstatus:carstatus,carimage:carimage,fueltype:fueltype,transmission:transmission,fromtype:fromtype,exteriorcolor:exteriorcolor,bodystyle:bodystyle,numseats:numseats,drivetrain:drivetrain,caryear:caryear,lowprice:lowprice,highprice:highprice,pricefilter:pricefilter,showgrid:showgrid,orderby:orderby,pagesize:pagesize}, function(data){
				if(data.length >0) {
					//alert(data);
					$("#loading_data").hide();					
					$("#search_content").html(data);
					
					
				}else
				{
					$("#loading_data").hide();
					alert("Có lỗi xảy ra khi kết nối máy chủ. Hãy thử lại");
				}
			});
}
function change_view_mode()
{
	if(showgrid==1) 
	{
		showgrid=0;
	}else
	{
		showgrid=1;
	}
	do_post_ajax();
}


function show_orderlist()
{
	
		$("#orderlist").show();
	
}
function hide_orderlist()
{
	
		$("#orderlist").hide();
	
	
}
function show_psizelist()
{
	
		$(".psizelist").css("display","");
	
}
function hide_psizelist()
{
	
		$(".psizelist").css("display","none");
	
	
}
function select_order(obj)
{
	id=$(obj).attr('id');
	$arr=id.split('_');
	eval($arr[0]+"="+$arr[1]);		
	hide_orderlist();
	if($("#selected_order").html()!=$(obj).html())
	{
		$("#selected_order").html($(obj).html());
		do_post_ajax();
	}
	
	
}
function select_psize(obj)
{
	id=$(obj).attr('id');
	$arr=id.split('_');
	eval($arr[0]+"="+$arr[1]);		
	hide_psizelist();
	if($(".selected_pagesize").html()!=$(obj).html())
	{
		$(".selected_pagesize").html($(obj).html());
		do_post_ajax();
	}
	
	
}
function load_viewed_cars()
{
	$.post("get-viewed-cars/", function(data){
				if(data.length >0) {
					$("#viewed_cars").html(data);
					
				}else
				{
					$("#viewed_cars").hide();
					alert("Có lỗi xảy ra khi kết nối máy chủ. Hãy thử lại");
				}
			});
}

function do_filter2(obj)
{
	$("#exteriorcolor_other").html("Màu khác");
	$("#exteriorcolor_other").removeClass("active");
	do_filter(obj);
	if($(obj).hasClass("sub-item"))
	{
		$("#exteriorcolor_other").html($(obj).html());
		$("#exteriorcolor_other").addClass("active");		
	}
	$('.sub-nav li ul').hide();	
	setInterval("$('.sub-nav li ul').show()",500);
}
function do_filter3(obj)
{
	$("#bodystyle_other").html("Kiểu dáng khác");
	$("#bodystyle_other").removeClass("active");
	do_filter(obj);
	if($(obj).hasClass("sub-item"))
	{
		$("#bodystyle_other").html($(obj).html());
		$("#bodystyle_other").addClass("active");
		
	}
	$('.sub-nav li ul').hide();	
	setInterval("$('.sub-nav li ul').show()",500);
}