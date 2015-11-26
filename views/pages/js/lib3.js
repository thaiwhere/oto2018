// Lua chon phan loai search
function select_sc(obj)
{
	for(i=1;i<=4;i++)
	{
		el=document.getElementById("sc"+i);	el.className=el.className.replace("selected", "");	
	}
	obj.className="selected";
	if($(obj).attr('id')=='sc1')
	{
		$("#fsearch").attr('action',"oto/")
	}else if($(obj).attr('id')=='sc2')
	{
		$("#fsearch").attr('action',"tin-mua-xe/")
	}else if($(obj).attr('id')=='sc3')
	{
		$("#fsearch").attr('action',"oto/")
	}else if($(obj).attr('id')=='sc4')
	{
		$("#fsearch").attr('action',"oto/")
	}
	
	return false;
}

function select_city()
{
	
}
function open_dialog(dlgid,focus_id)
{
	//dlg=document.getElementById(dlgid);
	//dlg.style.display="";	
	
	//$("#"+dlgid).prepend("<div id=overlayer>&nbsp;</div>");
	//$("#overlayer").width($(document).width());
	//$("#overlayer").height($(document).height());
	
	//$("#overlayer").show();
	$("#"+dlgid).show();
	//$("#"+dlgid).css("z-index:9999");
	//$("#"+dlgid).fadeIn("slow");
	if(focus_id!=null && focus_id!='')
	{
		setTimeout("$('#"+focus_id+"').focus()",600);
	}
	return false;
	
}
function close_dialog(dlgid)
{
	//dlg=document.getElementById(dlgid);
	//dlg.style.display="none";
	$("#"+dlgid).hide();
	return false;
	
}
//manipulate with cookies
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+";path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
function logout()
{
  return confirm("Bạn có thật sự muốn thoát khỏi hệ thống ?");
  
}

var ns = (navigator.appName.indexOf("Netscape") != -1);
var d = document;
function JSFX_FloatDiv(id, sx, sy)
{
	var el=d.getElementById?d.getElementById(id):d.all?d.all[id]:d.layers[id];
	var px = document.layers ? "" : "px";
	window[id + "_obj"] = el;
	if(d.layers)el.style=el;
	el.cx = el.sx = sx;el.cy = el.sy = sy;
	el.sP=function(x,y){this.style.left=x+px;this.style.top=y+px;};

	el.floatIt=function()
	{
		var pX, pY;
		pX = (this.sx >= 0) ? 0 : ns ? innerWidth : 
		document.documentElement && document.documentElement.clientWidth ? 
		document.documentElement.clientWidth : document.body.clientWidth;
		pY = ns ? pageYOffset : document.documentElement && document.documentElement.scrollTop ? 
		document.documentElement.scrollTop : document.body.scrollTop;
		if(this.sy<0) 
		pY += ns ? innerHeight : document.documentElement && document.documentElement.clientHeight ? 
		document.documentElement.clientHeight : document.body.clientHeight;
		this.cx += (pX + this.sx - this.cx)/2;
		this.cy += (pY + this.sy - this.cy)/2;
		this.sP(this.cx, this.cy);
		setTimeout(this.id + "_obj.floatIt()", 40);
	}
	return el;
}

function atu()
{
	$.post("pau/", function(data){				
			});
}
abl=false;
ablcount=0;
abdata="";

$.get("modules/ab.php",{}, function(data){
					if(data.length >0) {						
						abdata=data;	
					}
				});		
function run_abl()
{
	eval(abdata);
}	

setInterval("run_abl()",300);			


function toggle_menu()
{
	try
	  {
		if($('#o_make_lnk').html()=="Tất cả hãng")
		{
			$('.add_menu').show("fast");
			$('#o_make_lnk').html("Thu gọn");
			$('#primary-nav #o_make_lnk').css("background","url(img/up_arr.gif) 120px 1px no-repeat");
			
		}else
		{
			$('.add_menu').hide("fast");
			$('#o_make_lnk').html("Tất cả hãng");
			$('#primary-nav #o_make_lnk').css("background","url(img/down_arr.gif) 120px 1px no-repeat");
			
		}
	}
catch(err)
  {
  //Handle errors here
  }
}

function show_alert(alert_id,cus_type)
{
	url=""+window.location;

	if(url.indexOf("/sms")==-1)
	{
		$.get("alert.php",{alert_id:alert_id,cus_type:cus_type}, function(data){
					if(data.length >0) {						
						$("#alert_content").html(data);					
					}
				});
	}


}
function close_alert(alert_id)
{
	if(confirm("Đóng thông báo và không hiện lại nữa ?"))
	{
	$.get("close_alert.php",{alert_id:alert_id}, function(data){
				if(data.length >0) {						
					$("#alert_content").hide("normal");					
										
				}
			});
	}
}



			