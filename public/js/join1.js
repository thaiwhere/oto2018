Tooltip.init([

{
id:"memberid",
tripTemplate:RS_JS_MemberID_Notic,
refPoint:"memberid",
validArray:[
{t:ValidType.Require,e:RS_JS_MemberID_Reuqirment},
{t:ValidType.MinRang,r:6,e:RS_JS_Member_MaxLength},
{t:ValidType.MaxRang,r:20,e:RS_JS_Member_MaxLength},
{t:ValidType.Regex,r:/[\u4e00-\u9fa5]+/,v:false,e:RS_JS_NotChineseCode},
{t:ValidType.Regex,r:/^[a-zA-Z0-9_-]*$/,v:true,e:RS_JS_Normal_Error},
{t:ValidType.Ajax,r:function (Sv,context){
return Boolean.parse(Ajax_Register_Page.Exits("username",$get("memberid").value.trim()).value+"");		
},e:RS_JS_MemberID_Exist}
],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]
},
{
id:"password",
tripTemplate:RS_JS_Password_Notic,
refPoint:"password",
validArray:[
{t:ValidType.Require,e:RS_JS_Password_Reuqirment},
{t:ValidType.MinRang,r:6,e:RS_JS_Password_MinOrMaxLength},
{t:ValidType.MaxRang,r:20,e:RS_JS_Password_MinOrMaxLength},
{t:ValidType.Regex,r:/^[a-zA-Z0-9_-]{6,20}$/,v:true,e:RS_JS_Normal_Error},
{t:ValidType.Customers,r:function (Sv){
var t = document.getElementById("memberid");
if(typeof(t) == "undefined")
    return false;
if(t.value.trim() != Sv) 
    return true;
return false;
},e:RS_JS_Password_DontEqualID}
],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]
},
{
id:"confirm",
tripTemplate:RS_JS_Confirm_Notice,
refPoint:"confirm",
validArray:[
{t:ValidType.Require,e:RS_JS_Confirm_Reuqire},
{t:ValidType.SameForControl,r:function (){
return document.getElementById("password").value;
},e:RS_JS_Confirm_Error}
],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]
},
{
id:"fullname",
tripTemplate:RS_JS_FullName_Notice,
refPoint:"fullname",
validArray:[
{t:ValidType.Require,e:RS_JS_FullName_Reuqirment},
{t:ValidType.MinRang,r:5,e:RS_JS_FullName_MaxLength},
{t:ValidType.MaxRang,r:50,e:RS_JS_FullName_MaxLength},
{t:ValidType.Regex,r:/[\u4e00-\u9fa5]+/,v:false,e:RS_JS_NotChineseCode},
{t:ValidType.Regex,r:/[\u4e00-\u9fa5]+/,v:false,e:RS_JS_NotChineseCode}
],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]

},

{
id:"mail",
tripTemplate:RS_JS_Mail_Notice,
refPoint:"mail",
validArray:[
{t:ValidType.Require,e:RS_JS_Mail_Requirment},
{t:ValidType.Regex,r:/^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/,v:true,e:RS_Js_Mail_Valid},
{t:ValidType.Ajax,r:function (Sv,context){
return Boolean.parse(Ajax_Register_Page.Exits("email",$get("mail").value.trim()).value+"");		
},e:RS_JS_Email_Exist}
],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]
},
{
id:"mobile",
tripTemplate:RS_JS_Mobile_Notice,
refPoint:"mobile",
validArray:[
{t:ValidType.Require,e:RS_JS_Mobile_Reuqirment},
{t:ValidType.MinRang,r:10,e:RS_JS_Mobile_MaxLength},
{t:ValidType.MaxRang,r:12,e:RS_JS_Mobile_MaxLength},
{t:ValidType.Regex,r:/^09\d{8}|01\d{9}/,v:true,e:RS_JS_MOBILE_INVALID},
{t:ValidType.Regex,r:/^\d+$/,v:true,e:RS_JS_NUMBER_ONLY},
{t:ValidType.Ajax,r:function (Sv,context){
return Boolean.parse(Ajax_Register_Page.Exits("mobile",$get("mobile").value.trim()).value+"");			
	
},e:RS_JS_Phone_Exist}
],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]

},
{
id:"otherphone",
tripTemplate:RS_JS_OtherPhone_Notice,
refPoint:"otherphone",
validArray:[
{t:ValidType.Regex,r:/^\d+$/,v:true,e:RS_JS_NUMBER_ONLY},
{t:ValidType.MinRang,r:9,e:RS_JS_OtherPhone_MinMaxLength},
{t:ValidType.MaxRang,r:12,e:RS_JS_OtherPhone_MinMaxLength},
{t:ValidType.Ajax,r:function (Sv,context){
if($get("otherphone").value !='' && $get("otherphone").value<100000) return true;			
	
},e:RS_JS_OtherPhone_Invalid},
{t:ValidType.Ajax,r:function (Sv,context){
return Boolean.parse(Ajax_Register_Page.Exits("mobile",$get("otherphone").value.trim()).value+"");			
	
},e:RS_JS_Phone_Exist}
],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]

},
{
id:"address",
tripTemplate:RS_JS_Address_Notice,
refPoint:"address",
validArray:[
{t:ValidType.MinRang,r:6,e:RS_JS_Adress_MinLength},
{t:ValidType.Require,e:RS_JS_Address_Reuqirment},
{t:ValidType.Regex,r:/[\u4e00-\u9fa5]+/,v:false,e:RS_JS_NotChineseCode}
],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]

},
{
id:"secure_code",
tripTemplate:RS_Js_SECURE_CODE_Notice,
refPoint:"image_code",
validArray:[
{t:ValidType.Require,e:RS_Js_SECURE_CODE_Requirment}

],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]

}

]);
$addHandler($get('memberid'),"keyup",UserToLower);
$addHandler($get('fullname'),"keyup",OneCharToUpper);
$addHandler($get('fullname'),"blur",NameToUpper);
$addHandler($get('address'),"blur",AdressToLower);
$addHandler($get('address'),"keyup",JoinCityName);
function UserToLower()
{
	 this.value= this.value.toLowerCase();
}
function OneCharToUpper()
{
    var One = this.value.trim().charAt(0).toString().toLocaleUpperCase();
    var slice = "";
    if(this.value.trim().length>1)
         slice = this.value.slice(1);
    this.value = One+slice;
}
function NameToUpper()
{
	fname=this.value;
	pos=fname.trim().lastIndexOf(' ');
	if(pos>0)
	{
		fname=fname.substring(0,pos+1)+fname.charAt(pos+1).toString().toLocaleUpperCase()+fname.substring(pos+2);
		this.value=fname;
	}
	fname2=fname.charAt(0).toString();
	if(fname.trim().length>1)
	{
		for(i=1;i<fname.trim().length;i++)
		{
			if(fname.charAt(i-1).toString()!=" ")
			{
				fname2=fname2+fname.charAt(i).toString().toLowerCase();
			}else
			{
				fname2=fname2+fname.charAt(i).toString();
			}
			
		}
		this.value=fname2;
	}
	
	
	
}
function AdressToLower()
{
	fname=this.value;
	
	fname2=fname.charAt(0).toString();
	
	if(fname.trim().length>1)
	{
		for(i=1;i<fname.trim().length;i++)
		{
			if(fname.charAt(i-1).toString()!=" ")
			{
				fname2=fname2+fname.charAt(i).toString().toLowerCase();
			}else
			{
				fname2=fname2+fname.charAt(i).toString();
			}
			
		}
		this.value=fname2;
	}
}
function JoinCityName()
{
	
}
var Ajax_Register_Page = {
Exits:function(type,value,callback,context){
return new ajax_request('check-register/?type='+type+'&'+type+'='+value,'',callback, context);
}
}




var requests = new Array();

if(typeof(XMLHttpRequest) == 'undefined')
var XMLHttpRequest = function()
{
	var request = null;
	try
	{
		request = new ActiveXObject('Msxml2.XMLHTTP');
	}
	catch(e)
	{
		try
		{
			request = new ActiveXObject('Microsoft.XMLHTTP');
		}
		catch(ee)
		{}
	}
	return request;
}

function ajax_stop()
{
	for(var i=0; i<requests.length; i++)
	{
		if(requests[i] != null)
			requests[i].abort();
	}
}

function ajax_create_request(context)
{
	for(var i=0; i<requests.length; i++)
	{
		if(requests[i].readyState == 4)
		{
			requests[i].abort();
			requests[i].context = context;
			return requests[i];
		}
	}

	var pos = requests.length;
	
	requests[pos] = Object();
	requests[pos].obj = new XMLHttpRequest();
	requests[pos].context = context;
	
	return requests[pos];
}

function ajax_request(url, data, callback, context)
{
	var request = ajax_create_request(context);
	var async = typeof(callback) == 'function';

	if(async) request.obj.onreadystatechange = function()
	{
		if(request.obj.readyState == 4)
			callback(new ajax_response(request));
	}
	
	request.obj.open('POST', url, async);
	request.obj.send(data);
	
	if(!async)
		return new ajax_response(request);
}

function ajax_response(request)
{
	this.request = request.obj;
	this.error = null;
	this.value = null;
	this.context = request.context;
	
	if(request.obj.status == 200)
	{
		try
		{
			this.value = object_from_json(request);
			
			if(this.value && this.value.error)
			{
				this.error = this.value.error;
				this.value = null;
			}
		}
		catch(e)
		{
			this.error = new ajax_error(e.name, e.description, e.number);
		}
	}
	else
	{
		this.error = new ajax_error('HTTP request failed with status: ' + request.obj.status, request.obj.status);
	}
	
	return this;
}

function enc(s)
{
	return s.toString().replace(/\%/g, "%26").replace(/=/g, "%3D");
}

function object_from_json(request)
{
	if(request.obj.responseXML != null && request.obj.responseXML.xml != null && request.obj.responseXML.xml != '')
		return request.obj.responseXML;
	
	var r = null;	
	eval('r=' + request.obj.responseText + ';');
	return r;
}

function ajax_error(name, description, number)
{
	this.name = name;
	this.description = description;
	this.number = number;

	return this;
}

ajax_error.prototype.toString = function()
{
	return this.name + " " + this.description;
}

function json_from_object(o)
{
	if(o == null)
		return 'null';

	switch(typeof(o))
	{
		case 'object':
			if(o.constructor == Array)		// checks if it is an array [,,,]
			{
				var s = '';
				for(var i=0; i<o.length; ++i)
				{
					s += json_from_object(o[i]);

					if(i < o.length -1)
						s += ',';
				}

				return '[' + s + ']';
			}
			break;
		case 'string':
			return '"' + o.replace(/(["\\])/g, '\\$1') + '"';
		default:
			return String(o);
	}
}var ajaxVersion = '5.7.22.2';