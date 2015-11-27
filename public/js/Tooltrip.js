var ua = navigator.userAgent.toLowerCase(); 

var left_offset=0;
if ( ua.indexOf( "opera" ) != -1 ) {
browserName = "opera";
} else if ( ua.indexOf( "msie" ) != -1 ) {
browserName = "msie";
} else if ( ua.indexOf( "safari" ) != -1 ) {
browserName = "safari";
} else if ( ua.indexOf( "mozilla" ) != -1 ) {
if ( ua.indexOf( "firefox" ) != -1 ) {
browserName = "firefox";
}else {
browserName = "mozilla";
} 
}

if(browserName=='msie')
{
	left_offset=18;
}else
{
	left_offset=10;
}
 var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  //window.alert( 'Width = ' + myWidth );
 // window.alert( 'Height = ' + myHeight );
 if(myWidth<1004) myWidth=1004;
left_offset=left_offset-(myWidth-1004)/2

var Bonbanh = {
  isGecko:false,
 
	Util : {
		GetXY : function (G)
		{
			var F,K,M,N,J=(document.body||document.documentElement);
			if(G==J)
			{
				return [0,0];
			}
			if(G.getBoundingClientRect)
			{
				M=G.getBoundingClientRect();
				N=getScroll(document);
				return[M.left+N.left,M.top+N.top];
			}
			var O=0,L=0;
			F=G;
			var E=G.getAttribute("position")=="absolute";
			while(F)
			{
				O+=F.offsetLeft;
				L+=F.offsetTop;
				if(!E&&F.getAttribute("position")=="absolute")
				{
					E=true
				}
				if(Bonbanh.isGecko)
				{
					K=F;
					var H=parseInt(K.style.borderLeftWidth,10)||0;
					var P=parseInt(K.style.borderTopWidth,10)||0;
					O+=H;
					L+=P;
					if(F!=G&&K.style.overflow!="visible")
					{
						O+=H;
						L+=P
					}
				}
				F=F.offsetParent
			}
			
			if(Bonbanh.isGecko&&!E)
			{
				var I=J;
				O+=parseInt(I.style.borderLeftWidth,10)||0;
				L+=parseInt(I.style.borderTopWidth,10)||0;
			}
			F=G.parentNode;
			while(F&&F!=J)
			{
				if((F.tagName!="TR"&&F.style.display!="inline"))
				{
					O-=F.scrollLeft;
					L-=F.scrollTop
				}
				F=F.parentNode
			}
			return[O,L];
		}
	},
	Element : {
		get:function (name)
		{
			var object = document.getElementById(name);
			if(typeof(object) == "undefined")
				return null;
			object.getRight = function (){
				return Bonbanh.Util.GetXY(this)[0]+this.clientWidth;
			};
			object.getTop = function (){
				
				return Bonbanh.Util.GetXY(this)[1];
			};
			return document.getElementById(name);
		}
	}
}
var trip = document.getElementById("linlin");
var Tooltip = {
	ToolList :{},
	init : function (cF)
	{
	    var isCN = false;
	
		if(typeof(cF) == "undefined")
			return null;

		for(var i=0;i<cF.length;i++)
		{   
		    if(typeof(cF[i].id)=="undefined"||$get(cF[i].id)==null)
		        continue;
			if(this.ToolList[cF[i].id] == null&&$get($get(cF[i].id).name+"_parent").style.display!="none")
				this.ToolList[cF[i].id] = new TooltipItem(cF[i]);
		}
		
		for(var i in this.ToolList)
		{
			if(this.ToolList[i] != null)
				this.ToolList[i].GetSbiling();
		}
		
	},
	Refresh : function()
	{
		for(var o in Tooltip.ToolList)
		{
			Tooltip.ToolList[o].Refesh();
		}
	},
	TrggerError : function (list) //list -> Type object {i:memberid,e:'please enter your memberid'}
	{
	  
	    for(var i  in list)
	    {
	        if(this.ToolList[list[i].i]!=null)
	        {
	            this.ToolList[list[i].i].ToError(list[i].e);
	        }
	    }
	}
	
};

function TooltipItem(id)
{
   
	if(typeof(id) == "undefined")
		return;
	this.EL = Bonbanh.Element.get(id.id);
	if(this.EL == null)
		return ;
	
	this.ErrorElement= document.getElementById(this.EL.name+"_error");
	this.TripTemplate = id.tripTemplate;
	this.State = ErrorState.Normal;
	this.ValidArray = id.validArray;
	this.GetValue = id.getValue;
	this.RefPoint = Bonbanh.Element.get(id.refPoint);
	this.IsTrip = id.isTrip==null?true:false;
	this.offsetTop = (id.ost||0);
	this.offsetLeft = (id.let||0);
	this.HasSbiling = false;
	this.SbilingList = [];
	this.ParentElement = document.getElementById(this.EL.name+"_parent");
	for(var i=0;i<id.tripEvent.length;i++)
		this.EL[id.tripEvent[i]] = function (){Tooltip.ToolList[this.id].ToTrip()};
	for(var i=0;i<id.validEvent.length;i++)
		this.EL[id.validEvent[i]] = function (){Tooltip.ToolList[this.id].Valid()};
	
}
TooltipItem.prototype.GetSbiling = function ()
{
    var list = document.getElementsByName(this.EL.name);
    var T;
	for(var i=0;i<list.length;i++)
	{
		if((T=Tooltip.ToolList[list[i].id]) && list[i].id!=this.EL.id)
			this.SbilingList.push(T);
		if(!this.HasSbiling)
		    this.HasSbiling=true;
	}
}


TooltipItem.prototype.ValidTooltrip = function (r,e,a)
{
    if(r==0)
	{   
		this.ToError(e);
		return;
	}
	else if(r==1)
	{
	    this.ToNormal();
		if(e=="OnSub")
		    return;
		if(this.GetValue().trim().length==0)
			this.ToTrip("0");
		else
			this.ToTrip("1");
	}
	else
	{
	    this.ToNormal();
	    this.State = ErrorState.Success;
	}
}


TooltipItem.prototype.ToValid = function (IsSub)
{
    var temp = this.ValidArray;
	var errorString = "";
	var isError = false;
	var sub = IsSub;
	for(var i=0;i<temp.length;i++)
	{
		switch(temp[i].t)
		{
			case ValidType.Require:
				var tempCode;
				if(typeof(tempCode=this.GetValue())=="string"&&tempCode.trim().length==0)
					isError = true;
				break;
			case ValidType.Regex:
				if(this.GetValue().trim() !='' && eval(temp[i].r).test(this.GetValue().trim()) != new Boolean(eval(temp[i].v)))
					isError = true;
				break;
			case ValidType.MaxRang:
			if(typeof(tempCode=this.GetValue())=="string"&&tempCode.trim().length>parseInt(temp[i].r))
					isError = true;
				break;
			case ValidType.MinRang:
			if(typeof(tempCode=this.GetValue())=="string"&&tempCode.trim().length!=0&&tempCode.trim().length<parseInt(temp[i].r))
				isError = true;
				break;
			case ValidType.SameForControl:
			if(typeof(tempCode=this.GetValue())=="string"&&tempCode.trim()!=temp[i].r().trim())
				isError = true;
				break;
			case ValidType.Customers:
			if((tempCode=this.GetValue())&&!temp[i].r(tempCode,this))
				isError = true;
				break;
		    case ValidType.Ajax:
			if(typeof(tempCode=this.GetValue())=="string"&&temp[i].r(tempCode.trim(),this))
				isError = true;
				break;
		  }
		  if(isError)
		    return {isError:true,Error:temp[i].e};
	}
	return {isError:false,Error:""};
		
	
}

TooltipItem.prototype.Valid = function ()
{

    if(typeof(arguments[0])=="undefined"&&this.GetValue().trim().length==0)
    {
          if(this.State!=(ErrorState.Error))
            this.ToNormal();
          trip.style.display = "none";
          return;
    }
    var ErrorObj = this.ToValid();
	if(ErrorObj.isError == true)
	{   
	    this.ValidTooltrip(0,ErrorObj.Error);
	    return;
	}
	
	if(typeof(arguments[0])!="undefined")
	    this.ValidTooltrip(1,arguments[0]);
	 else if(this.ValidSiblig())
	    this.ValidTooltrip(2);
     else
        this.ValidTooltrip(1,"");
       
}


TooltipItem.prototype.SbilingContainsState = function (state)
{
	var list = this.SbilingList;
	for(var i=0;i<list.length;i++)
	{
		if(list[i].State == state)
			return true;
	}
	return false;
}

TooltipItem.prototype.ValidSiblig = function (state)
{
    var list = this.SbilingList;
	for(var i=0;i<list.length;i++)
	{
		if(list[i].ToValid().isError==true)
			return true;
	}
	return false;
}

TooltipItem.prototype.ToError = function (information)
{

	if(this.State == ErrorState.Tool ||  this.State==ErrorState.Success)
	{
		trip.style.display = "none";
	}
	this.ErrorElement.style.left = (this.RefPoint.getRight(false)+this.offsetLeft+left_offset)+"px";
	if(browserName=="safari")
	{		
		this.ErrorElement.style.top = (this.RefPoint.getTop(false)+this.offsetTop+window.pageYOffset)+"px";
	}else
	{
		this.ErrorElement.style.top = (this.RefPoint.getTop(false)+this.offsetTop)+"px";
	}
	
	
	this.ErrorElement.style.display = "block";
	this.ErrorElement.innerHTML = information;
	this.ParentElement.className = "bbfldErr";
	if(this.State!= ErrorState.Error)
	{
		this.State = ErrorState.Error;
		Tooltip.Refresh();
	}
}
TooltipItem.prototype.Refesh = function ()
{
	this.ErrorElement.style.left = (this.RefPoint.getRight(false)+this.offsetLeft+left_offset)+"px";
	if(browserName=="safari")
	{	
		
		this.ErrorElement.style.top = (this.RefPoint.getTop(false)+this.offsetTop-3+window.pageYOffset)+"px";
	}else
	{
		this.ErrorElement.style.top = (this.RefPoint.getTop(false)+this.offsetTop-3)+"px";
	}
}

TooltipItem.prototype.ToTrip = function (type)
{	
	if(type!="1" && type!="ajax")
	{	
		if((this.State==ErrorState.Normal||this.State==ErrorState.Tool ||this.State==ErrorState.Error))
		{
			Trip(this);
		}
		else if(this.State== ErrorState.Success
		&&!this.SbilingContainsState(ErrorState.Error)
		&&this.GetValue().trim()!=="")
			Success(this);
		else if(this.State== ErrorState.Success
		&&!this.SbilingContainsState(ErrorState.Error)
		&&this.GetValue().trim() =="")
		{
		     this.ToNormal();
		     if(this.IsTrip)
		        Trip(this);
		}
		
	}
	else if(type == "ajax")
	{
	    Success(this,"Ajax");
	}
	else
	{

		if(!this.SbilingContainsState(ErrorState.Error) || this.State== ErrorState.Success)
			Success(this);
	}
    
    function Trip(parent)
	{
		
		if(!parent.SbilingContainsState(ErrorState.Error)&&parent.IsTrip)
		{
			
			trip.className = "bbMsg";
			trip.style.left = (parent.RefPoint.getRight(false)+parent.offsetLeft+left_offset)+"px";
			if(browserName=="safari")
			{
				trip.style.top = (parent.RefPoint.getTop(false)+parent.offsetTop+window.pageYOffset)+"px";
			}else
			{
				trip.style.top = (parent.RefPoint.getTop(false)+parent.offsetTop)+"px";
			}
			
			trip.innerHTML = parent.TripTemplate;
			trip.style.display = "block";
		}
		if(parent.State!= ErrorState.Tool)
		{
			parent.State = ErrorState.Tool;
			Tooltip.Refresh();
		}
	}
	function Success(parent,image)
	{
		this.O = parent;
		trip.style.left = (this.O.RefPoint.getRight(false)+this.O.offsetLeft+left_offset)+"px";
		if(browserName=="safari")
		{				
			trip.style.top = (this.O.RefPoint.getTop(false) + this.O.offsetTop+window.pageYOffset)+"px";
		}else
		{
			trip.style.top = (this.O.RefPoint.getTop(false) + this.O.offsetTop)+"px";
		}
		trip.className = "bbMsg1";
		trip.style.display = "block";
		if(typeof(image)!= "undefined")
		{ 
		    trip.innerHTML = "<img src=\"load.gif\" alt='Load'>";
		}
		else
		   trip.innerHTML = "<img src=\"img/checkbullet.gif\" alt='OK'>";
		
		if(this.O.State!= ErrorState.Success)
		{
			this.O.State = ErrorState.Success;
			Tooltip.Refresh();
		}
	}
	
	if(this.EL.id == "rdYes")
	    SetOETypical();
}

TooltipItem.prototype.ToNormal = function ()
{
	//if(this.State == ErrorState.Error)
	//{	
		if(!this.SbilingContainsState(ErrorState.Error))
		{	
			this.ErrorElement.style.display = "none";
			this.ParentElement.className = "bbforminput";
		}
		if(this.State!= ErrorState.Normal)
		{
			this.State =ErrorState.Normal;
			Tooltip.Refresh();
		}
	//}
}

var ErrorState = {
Normal:0,
Error:1,
Tool:2,
Success:3
};
var ValidType = {
Require:0,
Regex:1,
MaxRang:2,
MinRang:3,
SameForControl:4,
Customers:5,
Ajax:6
};
String.prototype.trim=function()
{var A=/^\s+|\s+$/g;
return function()
{return this.replace(A,"")}}();

var MemberValid = 0;
var EmailValid  = 0;
var time = 0;

function getScroll(G)
{
	if(typeof(G) == "undefined")
	{

		return {left:0,top:0};
	}
	if(G==(document || document.body || document.documentElement))
	{
		return {left:document.documentElement.scrollLeft,top:document.documentElement.scrollTop};
	}
}
function Sub_Submit()
{
    var itemObj = null;
    var isError = true;
    if(Tooltip&&Tooltip.ToolList)
    {
        for(var item in Tooltip.ToolList)
        {
            itemObj = Tooltip.ToolList[item]
            itemObj.Valid("OnSub");
            if(itemObj.State == ErrorState.Error)
            {
                isError = false;
            }
             
        }
    }
    return isError;
}
