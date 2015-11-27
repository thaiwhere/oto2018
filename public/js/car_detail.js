hs.graphicsDir = 'img/graphics/';
hs.align = 'center';
hs.transitions = ['expand', 'crossfade'];
hs.outlineType = 'rounded-white';
hs.fadeInOut = true;
//hs.dimmingOpacity = 0.75;

// Add the controlbar
hs.addSlideshow({
	//slideshowGroup: 'group1',
	interval: 5000,
	repeat: false,
	useControls: true,
	fixedControls: 'fit',
	overlayOptions: {
		opacity: .75,
		position: 'bottom center',
		hideOnMouseOut: true
	}
});

start_tab_index=1;
var load_tab=new Array();
load_tab[0]=false;
load_tab[1]=false;
load_tab[2]=false;

var tabberOptions = {


  'manualStartup':true,

  /* Optional: code to run after each tabber object has initialized */

  'onLoad': function(argsObj) {
   
	
  },



  'onClick': function(argsObj) {

    var t = argsObj.tabber; /* Tabber object */
    var id = t.id; /* ID of the main tabber DIV */
    var i = argsObj.index; /* Which tab was clicked (0 is the first tab) */
	if(id="listcars_tab")
	{
		get_other_cars(start_tab_index+i);
	}
    
	
  },

  /* Optional: set an ID for each tab navigation link */
  'addLinkId': true

};


$(document).ready(function(){
$('input:checkbox:not([safari])').checkbox();
				$('input[safari]:checkbox').checkbox({cls:'jquery-safari-checkbox'});
				$('input:radio').checkbox();
				$('a.code').each(function() {
					$(this).click(function(){
						eval($(this).text());
						return false;
					})
				});	
  });
function check_in_array(arr,val)
{
	for ( var i=0, len=arr.length; i<len; ++i )
	{
		if(arr[i]==val) return true;
    }
	return false;
}
function send_msg_submit()
{
	title=$("#title_msg").val();
	if(title=='' || title.length<10 || length>100)
	{
		alert("Phải nhập tiêu đề trong khoảng 10-100 ký tự");
		$("#title_msg").focus();
		return false;
	}
	content=$("#content_msg").val();
	if(content=='' || content.length<20 || content>200)
	{
		alert("Phải nhập nội dung trong khoảng 20-200 ký tự");
		$("#content_msg").focus();
		return false;
	}
	$("#send_processing").show();	
	title_msg=$("#title_msg").val();
	content_msg=$("#content_msg").val();
	owner_id=$("#owner_id").val();
	car_id=$("#car_id").val();
	var ct = new Date();
	$.post("gui-tin-nhan/"+'?t='+ct.getTime(),{title_msg:title_msg,content_msg:content_msg,owner_id:owner_id,car_id:car_id}, function(data){
				if(data.length >0) {
					
					$("#send_processing").hide();	
					$("#title_msg").val("");
					$("#content_msg").val("");
					close_dialog('send-msg-dlg');					
					alert("Tin nhắn gửi thành công!");			
			
					
				}else
				{
					$("#send_processing").hide();
					alert("Có lỗi xảy ra khi kết nối máy chủ. Hãy thử lại");
				}
			});
	return false;
}
function show_send_msg_dlg()
{
	
	if($("#owner_id").val()==login_id)
	{
		alert("Bạn không thể gửi tin nhắn đến chính mình được !");
		return false;
	}
	open_dialog('send-msg-dlg','title_msg');
	return false;
}
function save_car()
{
	open_dialog('saved-msg-dlg');
	car_id=$("#car_id").val();
	var ct = new Date();
	$.post("luu-tin-ban-xe/"+'?t='+ct.getTime(),{car_id:car_id}, function(data){
				
				if(data.length >0) {					
					
					if(data=="OK")
					{	
						close_dialog('saved-msg-dlg');
						alert("Tin bán xe đã được lưu vào mybonbanh");
					}else if(data=="NotLogin")
					{
						close_dialog('saved-msg-dlg');
						alert("Bạn chưa đăng nhập.\n Hãy đăng nhập để thực hiện chức năng này !");
						close_dialog('saved-msg-dlg');
					
					}else if(data=="Exist")
					{
						
						alert("Tin bán xe đã được lưu từ trước");
						close_dialog('saved-msg-dlg');
					
					}else
					{
						close_dialog('saved-msg-dlg');
						alert("Có lỗi xảy ra"+data);
					}
					
				}else
				{					
					alert("Có lỗi xảy ra khi kết nối máy chủ. Hãy thử lại");
				}
			});
	return false;
	
}
function show_report_dlg()
{
	car_id=$("#car_id").val();
	if(readCookie("car_report"+car_id)=='1')
	{
		alert("Bạn đã gửi báo tin đăng sai với tin bán này rồi !")
		return;
	}
	$("#report_msg").val("Nội dung đăng sai...");
	$("#sec_code").val("");
	window.setTimeout('refresh_img()',1)
	open_dialog('report-msg-dlg');
}
function report_submit()
{
	car_id=$("#car_id").val();	
	report_msg=$("#report_msg").val();
	sec_code=$("#sec_code").val();
	if(report_msg=='' || report_msg=='Nội dung đăng sai...')
	{
		alert("Phải nhập nộ dung thông báo tin đăng sai !");
		$("#report_msg").focus();
		return false;
	}
	if(report_msg.length<5 || report_msg.length>500)
	{
		alert("Nội dung phải từ 5-500 ký tự !");
		$("#report_msg").focus();
		return false;
	}
	var ct = new Date();
	$.post("luu-report/"+'?t='+ct.getTime(),{car_id:car_id,report_msg:report_msg,sec_code:sec_code}, function(data){
				
				if(data.length >0) {					
					
					if(data=="OK")
					{		
						close_dialog('report-msg-dlg');
						createCookie("car_report"+car_id,1,10);	
						alert("Thông tin của bạn đã được gửi.\n Cảm ơn bạn đã báo tin cho chúng tôi!");
					}else if(data=="InvalidContent")
					{						
						alert("Nội dung phải từ 5-500 ký tự !");	
						$("#report_msg").focus();						
					
					}else if(data=="InvalidCode")
					{						
						alert("Mã bảo vệ không đúng !");
						$("#sec_code").focus();
					
					}else if(data=="SendAlready")
					{		
						close_dialog('report-msg-dlg');
						alert("Bạn đã gửi báo tin đăng sai với tin bán này rồi !");
						
					
					}
					else
					{
						close_dialog('saved-msg-dlg');
						alert("Có lỗi xảy ra"+data);
					}
					
				}else
				{					
					alert("Có lỗi xảy ra khi kết nối máy chủ. Hãy thử lại");
				}
			});
}
function refresh_img()
{
	var ct = new Date();
	$('#image_code').attr('src','image.php?type=report_car&t='+ct.getTime());
	return false;
}
function get_other_cars(list_type)
{
	if(load_tab[list_type-1]==false)
	{
		var ct = new Date();
		$.post("xe-khac/"+'?t='+ct.getTime(),{car_id:this_car_id,list_type:list_type}, function(data){
			if(data.length >0) {
				
					if(list_type==1)
					{
						$("#list_ocars").html(data);
						
					}else if(list_type==2)
					{
						$("#list_modelcars").html(data);
						
					}else if(list_type==3)
					{
						$("#list_pricecars").html(data);
						
					}
				}
				load_tab[list_type-1]=true;
			
		});
	}
	//alert("get data");
}


function change_img(index)	
{	
	
	/*thumb=$(obj).attr("src");	
	
	med=thumb.replace("s_","m_") ;	
	large=thumb.replace("s_","l_") ;	
	$("#medium_img").html("<a href='"+large+"' class='highslide' onclick='return hs.expand(this)'><img onload='hide_loading()' src='"+med+"' id='img1'></a>");*/
	for(i=1;i<=total_img;i++)
	{
		$("#lnk"+i).hide();		
	}
	
	$("#lnk"+index).show();
	image_1 = new Image()
	image_1.src = $("#img"+index).attr("src");
	if (image_1.height>image_1.width)
	{
		$("#img"+index).css("height","250px");
		$("#img"+index).css("width","auto");
	}
	if((image_1.height/image_1.width)>(248/343))
	{
		$("#img"+index).css("height","248px");
	}
	//show_loading();
}
function show_loading()
{
	$("#loading").show();
}
function hide_loading()
{
	$("#loading").hide();	
	adjust_img();
}
function adjust_img()
{
	image_1 = new Image()
	image_1.src = $("#img1").attr("src");
	if (image_1.height>image_1.width)
	{
		$("#img1").css("height","250px");
		$("#img1").css("width","auto");
	}
	if((image_1.height/image_1.width)>(248/343))
	{
		$("#img1").css("height","248px");
	}
}


function show_menu(make_id)
{
	strURL="ajax-menu/";
	
	if(make_id==0)
	{
		$("#ajax_menu1").show();
		if($("#ajax_menu1").html()!="Loading...")
		{			
			return;
		}
		
	}else
	{
		$("#ajax_menu2").show();
		if($("#ajax_menu2").html()!="Loading...")
		{			
			return;
		}
	}
	
	
	$.post(strURL,{make_id:make_id}, function(data){
				if(data.length >0) {	
					if(make_id==0)
					{
						$("#ajax_menu1").html(data);	
						
					}else
					{
						$("#ajax_menu2").html(data);	
					}								
					
				}else
				{
					$("#ajax_menu").hide();
					alert("Có lỗi xảy ra khi kết nối máy chủ. Hãy thử lại");
				}
			});
}
function hide_menu()
{
	$("#ajax_menu1").hide();
	$("#ajax_menu2").hide();
}