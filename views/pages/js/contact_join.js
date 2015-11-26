Tooltip.init([

{
id:"fullname",
tripTemplate:RS_JS_FullName_Notice,
refPoint:"fullname",
validArray:[
{t:ValidType.Require,e:RS_JS_FullName_Reuqirment},
{t:ValidType.MinRang,r:5,e:RS_JS_FullName_MaxLength},
{t:ValidType.MaxRang,r:50,e:RS_JS_FullName_MaxLength},
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
{t:ValidType.Regex,r:/^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/,v:true,e:RS_Js_Mail_Valid}/*,
{t:ValidType.Ajax,r:function (Sv,context){

return Boolean.parse(Ajax_Register_Page.Exits("EL",$get("mail").value.trim()).value+"");
},e:RS_JS_Email_Exist}*/


],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]
},

{
id:"phone",
tripTemplate:RS_JS_Phone_Notice,
refPoint:"phone",
validArray:[
{t:ValidType.Require,e:RS_JS_Phone_Requirment},
{t:ValidType.Regex,r:/^\d+$/,v:true,e:RS_JS_NUMBER_ONLY},
{t:ValidType.MinRang,r:9,e:RS_JS_Phone_MinMaxLength},
{t:ValidType.MaxRang,r:12,e:RS_JS_Phone_MinMaxLength}

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
{t:ValidType.Require,e:RS_JS_Address_Reuqirment}
,{t:ValidType.Regex,r:/[\u4e00-\u9fa5]+/,v:false,e:RS_JS_NotChineseCode}
],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]

},
{
id:"message",
tripTemplate:RS_JS_Message_Notice,
refPoint:"message",
validArray:[
{t:ValidType.Require,e:RS_JS_Message_Requirment},
{t:ValidType.MinRang,r:30,e:RS_JS_Message_MinMaxLength},
{t:ValidType.MaxRang,r:300,e:RS_JS_Message_MinMaxLength}
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
tripTemplate:RS_JS_SecureCode_Notice,
refPoint:"secure_code_ref",
validArray:[
{t:ValidType.Require,e:RS_JS_SecureCode_Requirment}

],
getValue:function ()
{
	return document.getElementById(this.EL.id).value;
},
tripEvent:["onclick","onfocus"],
validEvent:["onblur"]

}
]);
