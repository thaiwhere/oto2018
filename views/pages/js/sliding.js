
if(typeof GASGOO=="undefined"){var GASGOO={};}
GASGOO.namespace=function(){var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=GASGOO;for(j=(d[0]=="GASGOO")?1:0;j<d.length;j=j+1){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}
return o;};GASGOO.log=function(msg,cat,src){var l=GASGOO.widget.Logger;if(l&&l.log){return l.log(msg,cat,src);}else{return false;}};GASGOO.register=function(name,mainClass,data){var mods=GASGOO.env.modules;if(!mods[name]){mods[name]={versions:[],builds:[]};}
var m=mods[name],v=data.version,b=data.build,ls=GASGOO.env.listeners;m.name=name;m.version=v;m.build=b;m.versions.push(v);m.builds.push(b);m.mainClass=mainClass;for(var i=0;i<ls.length;i=i+1){ls[i](m);}
if(mainClass){mainClass.VERSION=v;mainClass.BUILD=b;}else{GASGOO.log("mainClass is undefined for module "+name,"warn");}};GASGOO.env=GASGOO.env||{modules:[],listeners:[]};GASGOO.env.getVersion=function(name){return GASGOO.env.modules[name]||null;};GASGOO.env.ua=function(){var o={ie:0,opera:0,gecko:0,webkit:0};var ua=navigator.userAgent,m;if((/KHTML/).test(ua)){o.webkit=1;}
m=ua.match(/AppleWebKit\/([^\s]*)/);if(m&&m[1]){o.webkit=parseFloat(m[1]);}
if(!o.webkit){m=ua.match(/Opera[\s\/]([^\s]*)/);if(m&&m[1]){o.opera=parseFloat(m[1]);}else{m=ua.match(/MSIE\s([^;]*)/);if(m&&m[1]){o.ie=parseFloat(m[1]);}else{m=ua.match(/Gecko\/([^\s]*)/);if(m){o.gecko=1;m=ua.match(/rv:([^\s\)]*)/);if(m&&m[1]){o.gecko=parseFloat(m[1]);}}}}}
return o;}();(function(){GASGOO.namespace("util","widget","example");if(typeof GASGOO_config!="undefined"){var l=GASGOO_config.listener,ls=GASGOO.env.listeners,unique=true,i;if(l){for(i=0;i<ls.length;i=i+1){if(ls[i]==l){unique=false;break;}}
if(unique){ls.push(l);}}}})();GASGOO.lang={isArray:function(o){if(o){var l=GASGOO.lang;return l.isNumber(o.length)&&l.isFunction(o.splice)&&!l.hasOwnProperty(o.length);}
return false;},isBoolean:function(o){return typeof o==='boolean';},isFunction:function(o){return typeof o==='function';},isNull:function(o){return o===null;},isNumber:function(o){return typeof o==='number'&&isFinite(o);},isObject:function(o){return(o&&(typeof o==='object'||GASGOO.lang.isFunction(o)))||false;},isString:function(o){return typeof o==='string';},isUndefined:function(o){return typeof o==='undefined';},hasOwnProperty:function(o,prop){if(Object.prototype.hasOwnProperty){return o.hasOwnProperty(prop);}
return!GASGOO.lang.isUndefined(o[prop])&&o.constructor.prototype[prop]!==o[prop];},_IEEnumFix:function(r,s){if(GASGOO.env.ua.ie){var add=["toString","valueOf"];for(i=0;i<add.length;i=i+1){var fname=add[i],f=s[fname];if(GASGOO.lang.isFunction(f)&&f!=Object.prototype[fname]){r[fname]=f;}}}},extend:function(subc,superc,overrides){if(!superc||!subc){throw new Error("GASGOO.lang.extend failed, please check that "+"all dependencies are included.");}
var F=function(){};F.prototype=superc.prototype;subc.prototype=new F();subc.prototype.constructor=subc;subc.superclass=superc.prototype;if(superc.prototype.constructor==Object.prototype.constructor){superc.prototype.constructor=superc;}
if(overrides){for(var i in overrides){subc.prototype[i]=overrides[i];}
GASGOO.lang._IEEnumFix(subc.prototype,overrides);}},augmentObject:function(r,s){if(!s||!r){throw new Error("Absorb failed, verify dependencies.");}
var a=arguments,i,p,override=a[2];if(override&&override!==true){for(i=2;i<a.length;i=i+1){r[a[i]]=s[a[i]];}}else{for(p in s){if(override||!r[p]){r[p]=s[p];}}
GASGOO.lang._IEEnumFix(r,s);}},augmentProto:function(r,s){if(!s||!r){throw new Error("Augment failed, verify dependencies.");}
var a=[r.prototype,s.prototype];for(var i=2;i<arguments.length;i=i+1){a.push(arguments[i]);}
GASGOO.lang.augmentObject.apply(this,a);},dump:function(o,d){var l=GASGOO.lang,i,len,s=[],OBJ="{...}",FUN="f(){...}",COMMA=', ',ARROW=' => ';if(!l.isObject(o)||o instanceof Date||("nodeType"in o&&"tagName"in o)){return o;}else if(l.isFunction(o)){return FUN;}
d=(l.isNumber(d))?d:3;if(l.isArray(o)){s.push("[");for(i=0,len=o.length;i<len;i=i+1){if(l.isObject(o[i])){s.push((d>0)?l.dump(o[i],d-1):OBJ);}else{s.push(o[i]);}
s.push(COMMA);}
if(s.length>1){s.pop();}
s.push("]");}else{s.push("{");for(i in o){if(l.hasOwnProperty(o,i)){s.push(i+ARROW);if(l.isObject(o[i])){s.push((d>0)?l.dump(o[i],d-1):OBJ);}else{s.push(o[i]);}
s.push(COMMA);}}
if(s.length>1){s.pop();}
s.push("}");}
return s.join("");},substitute:function(s,o,f){var i,j,k,key,v,meta,l=GASGOO.lang,saved=[],token,DUMP='dump',SPACE=' ',LBRACE='{',RBRACE='}';for(;;){i=s.lastIndexOf(LBRACE);if(i<0){break;}
j=s.indexOf(RBRACE,i);if(i+1>=j){break;}
token=s.substring(i+1,j);key=token;meta=null;k=key.indexOf(SPACE);if(k>-1){meta=key.substring(k+1);key=key.substring(0,k);}
v=o[key];if(f){v=f(key,v,meta);}
if(l.isObject(v)){if(l.isArray(v)){v=l.dump(v,parseInt(meta,10));}else{meta=meta||"";var dump=meta.indexOf(DUMP);if(dump>-1){meta=meta.substring(4);}
if(v.toString===Object.prototype.toString||dump>-1){v=l.dump(v,parseInt(meta,10));}else{v=v.toString();}}}else if(!l.isString(v)&&!l.isNumber(v)){v="~-"+saved.length+"-~";saved[saved.length]=token;}
s=s.substring(0,i)+v+s.substring(j+1);}
for(i=saved.length-1;i>=0;i=i-1){s=s.replace(new RegExp("~-"+i+"-~"),"{"+saved[i]+"}","g");}
return s;},trim:function(s){try{return s.replace(/^\s+|\s+$/g,"");}catch(e){return s;}},merge:function(){var o={},a=arguments,i;for(i=0;i<a.length;i=i+1){GASGOO.lang.augmentObject(o,a[i],true);}
return o;},isValue:function(o){var l=GASGOO.lang;return(l.isObject(o)||l.isString(o)||l.isNumber(o)||l.isBoolean(o));}};GASGOO.util.Lang=GASGOO.lang;GASGOO.lang.augment=GASGOO.lang.augmentProto;GASGOO.augment=GASGOO.lang.augmentProto;GASGOO.extend=GASGOO.lang.extend;GASGOO.register("GASGOO",GASGOO,{version:"2.3.0",build:"442"});GASGOO.util.CustomEvent=function(type,oScope,silent,signature){this.type=type;this.scope=oScope||window;this.silent=silent;this.signature=signature||GASGOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}
var onsubscribeType="_YUICEOnSubscribe";if(type!==onsubscribeType){this.subscribeEvent=new GASGOO.util.CustomEvent(onsubscribeType,this,true);}};GASGOO.util.CustomEvent.LIST=0;GASGOO.util.CustomEvent.FLAT=1;GASGOO.util.CustomEvent.prototype={subscribe:function(fn,obj,override){if(!fn){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}
if(this.subscribeEvent){this.subscribeEvent.fire(fn,obj,override);}
this.subscribers.push(new GASGOO.util.Subscriber(fn,obj,override));},unsubscribe:function(fn,obj){if(!fn){return this.unsubscribeAll();}
var found=false;for(var i=0,len=this.subscribers.length;i<len;++i){var s=this.subscribers[i];if(s&&s.contains(fn,obj)){this._delete(i);found=true;}}
return found;},fire:function(){var len=this.subscribers.length;if(!len&&this.silent){return true;}
var args=[],ret=true,i,rebuild=false;for(i=0;i<arguments.length;++i){args.push(arguments[i]);}
var argslength=args.length;if(!this.silent){}
for(i=0;i<len;++i){var s=this.subscribers[i];if(!s){rebuild=true;}else{if(!this.silent){}
var scope=s.getScope(this.scope);if(this.signature==GASGOO.util.CustomEvent.FLAT){var param=null;if(args.length>0){param=args[0];}
ret=s.fn.call(scope,param,s.obj);}else{ret=s.fn.call(scope,this.type,args,s.obj);}
if(false===ret){if(!this.silent){}
return false;}}}
if(rebuild){var newlist=[],subs=this.subscribers;for(i=0,len=subs.length;i<len;++i){s=subs[i];newlist.push(subs[i]);}
this.subscribers=newlist;}
return true;},unsubscribeAll:function(){for(var i=0,len=this.subscribers.length;i<len;++i){this._delete(len-1-i);}
this.subscribers=[];return i;},_delete:function(index){var s=this.subscribers[index];if(s){delete s.fn;delete s.obj;}
this.subscribers[index]=null;},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};GASGOO.util.Subscriber=function(fn,obj,override){this.fn=fn;this.obj=GASGOO.lang.isUndefined(obj)?null:obj;this.override=override;};GASGOO.util.Subscriber.prototype.getScope=function(defaultScope){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}
return defaultScope;};GASGOO.util.Subscriber.prototype.contains=function(fn,obj){if(obj){return(this.fn==fn&&this.obj==obj);}else{return(this.fn==fn);}};GASGOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!GASGOO.util.Event){GASGOO.util.Event=function(){var loadComplete=false;var DOMReady=false;var listeners=[];var unloadListeners=[];var legacyEvents=[];var legacyHandlers=[];var retryCount=0;var onAvailStack=[];var legacyMap=[];var counter=0;var webkitKeymap={63232:38,63233:40,63234:37,63235:39};return{POLL_RETRYS:4000,POLL_INTERVAL:10,EL:0,TYPE:1,FN:2,WFN:3,OBJ:3,ADJ_SCOPE:4,lastError:null,isSafari:GASGOO.env.ua.webkit,webkit:GASGOO.env.ua.webkit,isIE:GASGOO.env.ua.ie,_interval:null,startInterval:function(){if(!this._interval){var self=this;var callback=function(){self._tryPreloadAttach();};this._interval=setInterval(callback,this.POLL_INTERVAL);}},onAvailable:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:false});retryCount=this.POLL_RETRYS;this.startInterval();},onDOMReady:function(p_fn,p_obj,p_override){if(DOMReady){setTimeout(function(){var s=window;if(p_override){if(p_override===true){s=p_obj;}else{s=p_override;}}
p_fn.call(s,"DOMReady",[],p_obj);},0);}else{this.DOMReadyEvent.subscribe(p_fn,p_obj,p_override);}},onContentReady:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:true});retryCount=this.POLL_RETRYS;this.startInterval();},addListener:function(el,sType,fn,obj,override){if(!fn||!fn.call){return false;}
if(this._isValidCollection(el)){var ok=true;for(var i=0,len=el.length;i<len;++i){ok=this.on(el[i],sType,fn,obj,override)&&ok;}
return ok;}else if(GASGOO.lang.isString(el)){var oEl=this.getEl(el);if(oEl){el=oEl;}else{this.onAvailable(el,function(){GASGOO.util.Event.on(el,sType,fn,obj,override);});return true;}}
if(!el){return false;}
if("unload"==sType&&obj!==this){unloadListeners[unloadListeners.length]=[el,sType,fn,obj,override];return true;}
var scope=el;if(override){if(override===true){scope=obj;}else{scope=override;}}
var wrappedFn=function(e){return fn.call(scope,GASGOO.util.Event.getEvent(e),obj);};var li=[el,sType,fn,wrappedFn,scope];var index=listeners.length;listeners[index]=li;if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);if(legacyIndex==-1||el!=legacyEvents[legacyIndex][0]){legacyIndex=legacyEvents.length;legacyMap[el.id+sType]=legacyIndex;legacyEvents[legacyIndex]=[el,sType,el["on"+sType]];legacyHandlers[legacyIndex]=[];el["on"+sType]=function(e){GASGOO.util.Event.fireLegacyEvent(GASGOO.util.Event.getEvent(e),legacyIndex);};}
legacyHandlers[legacyIndex].push(li);}else{try{this._simpleAdd(el,sType,wrappedFn,false);}catch(ex){this.lastError=ex;this.removeListener(el,sType,fn);return false;}}
return true;},fireLegacyEvent:function(e,legacyIndex){var ok=true,le,lh,li,scope,ret;lh=legacyHandlers[legacyIndex];for(var i=0,len=lh.length;i<len;++i){li=lh[i];if(li&&li[this.WFN]){scope=li[this.ADJ_SCOPE];ret=li[this.WFN].call(scope,e);ok=(ok&&ret);}}
le=legacyEvents[legacyIndex];if(le&&le[2]){le[2](e);}
return ok;},getLegacyIndex:function(el,sType){var key=this.generateId(el)+sType;if(typeof legacyMap[key]=="undefined"){return-1;}else{return legacyMap[key];}},useLegacyEvent:function(el,sType){if(this.webkit&&("click"==sType||"dblclick"==sType)){var v=parseInt(this.webkit,10);if(!isNaN(v)&&v<418){return true;}}
return false;},removeListener:function(el,sType,fn){var i,len;if(typeof el=="string"){el=this.getEl(el);}else if(this._isValidCollection(el)){var ok=true;for(i=0,len=el.length;i<len;++i){ok=(this.removeListener(el[i],sType,fn)&&ok);}
return ok;}
if(!fn||!fn.call){return this.purgeElement(el,false,sType);}
if("unload"==sType){for(i=0,len=unloadListeners.length;i<len;i++){var li=unloadListeners[i];if(li&&li[0]==el&&li[1]==sType&&li[2]==fn){unloadListeners[i]=null;return true;}}
return false;}
var cacheItem=null;var index=arguments[3];if("undefined"==typeof index){index=this._getCacheIndex(el,sType,fn);}
if(index>=0){cacheItem=listeners[index];}
if(!el||!cacheItem){return false;}
if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);var llist=legacyHandlers[legacyIndex];if(llist){for(i=0,len=llist.length;i<len;++i){li=llist[i];if(li&&li[this.EL]==el&&li[this.TYPE]==sType&&li[this.FN]==fn){llist[i]=null;break;}}}}else{try{this._simpleRemove(el,sType,cacheItem[this.WFN],false);}catch(ex){this.lastError=ex;return false;}}
delete listeners[index][this.WFN];delete listeners[index][this.FN];listeners[index]=null;return true;},getTarget:function(ev,resolveTextNode){var t=ev.target||ev.srcElement;return this.resolveTextNode(t);},resolveTextNode:function(node){if(node&&3==node.nodeType){return node.parentNode;}else{return node;}},getPageX:function(ev){var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(this.isIE){x+=this._getScrollLeft();}}
return x;},getPageY:function(ev){var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(this.isIE){y+=this._getScrollTop();}}
return y;},getXY:function(ev){return[this.getPageX(ev),this.getPageY(ev)];},getRelatedTarget:function(ev){var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else if(ev.type=="mouseover"){t=ev.fromElement;}}
return this.resolveTextNode(t);},getTime:function(ev){if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(ex){this.lastError=ex;return t;}}
return ev.time;},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}
c=c.caller;}}
return ev;},getCharCode:function(ev){var code=ev.keyCode||ev.charCode||0;if(GASGOO.env.ua.webkit&&(code in webkitKeymap)){code=webkitKeymap[code];}
return code;},_getCacheIndex:function(el,sType,fn){for(var i=0,len=listeners.length;i<len;++i){var li=listeners[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==sType){return i;}}
return-1;},generateId:function(el){var id=el.id;if(!id){id="yuievtautoid-"+counter;++counter;el.id=id;}
return id;},_isValidCollection:function(o){try{return(o&&o.length&&typeof o!="string"&&!o.tagName&&!o.alert&&typeof o[0]!="undefined");}catch(e){return false;}},elCache:{},getEl:function(id){return document.getElementById(id);},clearCache:function(){},DOMReadyEvent:new GASGOO.util.CustomEvent("DOMReady",this),_load:function(e){if(!loadComplete){loadComplete=true;var EU=GASGOO.util.Event;EU._ready();EU._tryPreloadAttach();}},_ready:function(e){if(!DOMReady){DOMReady=true;var EU=GASGOO.util.Event;EU.DOMReadyEvent.fire();EU._simpleRemove(document,"DOMContentLoaded",EU._ready);}},_tryPreloadAttach:function(){if(this.locked){return false;}
if(this.isIE){if(!DOMReady){this.startInterval();return false;}}
this.locked=true;var tryAgain=!loadComplete;if(!tryAgain){tryAgain=(retryCount>0);}
var notAvail=[];var executeItem=function(el,item){var scope=el;if(item.override){if(item.override===true){scope=item.obj;}else{scope=item.override;}}
item.fn.call(scope,item.obj);};var i,len,item,el;for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&!item.checkReady){el=this.getEl(item.id);if(el){executeItem(el,item);onAvailStack[i]=null;}else{notAvail.push(item);}}}
for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&item.checkReady){el=this.getEl(item.id);if(el){if(loadComplete||el.nextSibling){executeItem(el,item);onAvailStack[i]=null;}}else{notAvail.push(item);}}}
retryCount=(notAvail.length===0)?0:retryCount-1;if(tryAgain){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}
this.locked=false;return true;},purgeElement:function(el,recurse,sType){var elListeners=this.getListeners(el,sType);if(elListeners){for(var i=0,len=elListeners.length;i<len;++i){var l=elListeners[i];this.removeListener(el,l.type,l.fn,l.index);}}
if(recurse&&el&&el.childNodes){for(i=0,len=el.childNodes.length;i<len;++i){this.purgeElement(el.childNodes[i],recurse,sType);}}},getListeners:function(el,sType){var results=[],searchLists;if(!sType){searchLists=[listeners,unloadListeners];}else if(sType=="unload"){searchLists=[unloadListeners];}else{searchLists=[listeners];}
for(var j=0;j<searchLists.length;++j){var searchList=searchLists[j];if(searchList&&searchList.length>0){for(var i=0,len=searchList.length;i<len;++i){var l=searchList[i];if(l&&l[this.EL]===el&&(!sType||sType===l[this.TYPE])){results.push({type:l[this.TYPE],fn:l[this.FN],obj:l[this.OBJ],adjust:l[this.ADJ_SCOPE],index:i});}}}}
return(results.length)?results:null;},_unload:function(e){var EU=GASGOO.util.Event,i,j,l,len,index;for(i=0,len=unloadListeners.length;i<len;++i){l=unloadListeners[i];if(l){var scope=window;if(l[EU.ADJ_SCOPE]){if(l[EU.ADJ_SCOPE]===true){scope=l[EU.OBJ];}else{scope=l[EU.ADJ_SCOPE];}}
l[EU.FN].call(scope,EU.getEvent(e),l[EU.OBJ]);unloadListeners[i]=null;l=null;scope=null;}}
unloadListeners=null;if(listeners&&listeners.length>0){j=listeners.length;while(j){index=j-1;l=listeners[index];if(l){EU.removeListener(l[EU.EL],l[EU.TYPE],l[EU.FN],index);}
j=j-1;}
l=null;EU.clearCache();}
for(i=0,len=legacyEvents.length;i<len;++i){legacyEvents[i][0]=null;legacyEvents[i]=null;}
legacyEvents=null;EU._simpleRemove(window,"unload",EU._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var dd=document.documentElement,db=document.body;if(dd&&(dd.scrollTop||dd.scrollLeft)){return[dd.scrollTop,dd.scrollLeft];}else if(db){return[db.scrollTop,db.scrollLeft];}else{return[0,0];}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(el,sType,fn,capture){el.addEventListener(sType,fn,(capture));};}else if(window.attachEvent){return function(el,sType,fn,capture){el.attachEvent("on"+sType,fn);};}else{return function(){};}}(),_simpleRemove:function(){if(window.removeEventListener){return function(el,sType,fn,capture){el.removeEventListener(sType,fn,(capture));};}else if(window.detachEvent){return function(el,sType,fn){el.detachEvent("on"+sType,fn);};}else{return function(){};}}()};}();(function(){var EU=GASGOO.util.Event;EU.on=EU.addListener;if(EU.isIE){GASGOO.util.Event.onDOMReady(GASGOO.util.Event._tryPreloadAttach,GASGOO.util.Event,true);var el,d=document,b=d.body;if(("undefined"!==typeof GASGOO_config)&&GASGOO_config.injecting){el=document.createElement("script");var p=d.getElementsByTagName("head")[0]||b;p.insertBefore(el,p.firstChild);}else{d.write('<scr'+'ipt id="_yui_eu_dr" defer="true"><'+'/script>');el=document.getElementById("_yui_eu_dr");}
if(el){el.onreadystatechange=function(){if("complete"===this.readyState){this.parentNode.removeChild(this);GASGOO.util.Event._ready();}};}else{}
el=null;}else if(EU.webkit){EU._drwatch=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._drwatch);EU._drwatch=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}
EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}
GASGOO.util.EventProvider=function(){};GASGOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(p_type,p_fn,p_obj,p_override){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(ce){ce.subscribe(p_fn,p_obj,p_override);}else{this.__yui_subscribers=this.__yui_subscribers||{};var subs=this.__yui_subscribers;if(!subs[p_type]){subs[p_type]=[];}
subs[p_type].push({fn:p_fn,obj:p_obj,override:p_override});}},unsubscribe:function(p_type,p_fn,p_obj){this.__yui_events=this.__yui_events||{};var evts=this.__yui_events;if(p_type){var ce=evts[p_type];if(ce){return ce.unsubscribe(p_fn,p_obj);}}else{for(var i in evts){var ret=true;if(GASGOO.lang.hasOwnProperty(evts,i)){ret=ret&&evts[i].unsubscribe(p_fn,p_obj);}}
return ret;}
return false;},unsubscribeAll:function(p_type){return this.unsubscribe(p_type);},createEvent:function(p_type,p_config){this.__yui_events=this.__yui_events||{};var opts=p_config||{};var events=this.__yui_events;if(events[p_type]){}else{var scope=opts.scope||this;var silent=(opts.silent);var ce=new GASGOO.util.CustomEvent(p_type,scope,silent,GASGOO.util.CustomEvent.FLAT);events[p_type]=ce;if(opts.onSubscribeCallback){ce.subscribeEvent.subscribe(opts.onSubscribeCallback);}
this.__yui_subscribers=this.__yui_subscribers||{};var qs=this.__yui_subscribers[p_type];if(qs){for(var i=0;i<qs.length;++i){ce.subscribe(qs[i].fn,qs[i].obj,qs[i].override);}}}
return events[p_type];},fireEvent:function(p_type,arg1,arg2,etc){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(!ce){return null;}
var args=[];for(var i=1;i<arguments.length;++i){args.push(arguments[i]);}
return ce.fire.apply(ce,args);},hasEvent:function(type){if(this.__yui_events){if(this.__yui_events[type]){return true;}}
return false;}};GASGOO.util.KeyListener=function(attachTo,keyData,handler,event){if(!attachTo){}else if(!keyData){}else if(!handler){}
if(!event){event=GASGOO.util.KeyListener.KEYDOWN;}
var keyEvent=new GASGOO.util.CustomEvent("keyPressed");this.enabledEvent=new GASGOO.util.CustomEvent("enabled");this.disabledEvent=new GASGOO.util.CustomEvent("disabled");if(typeof attachTo=='string'){attachTo=document.getElementById(attachTo);}
if(typeof handler=='function'){keyEvent.subscribe(handler);}else{keyEvent.subscribe(handler.fn,handler.scope,handler.correctScope);}
function handleKeyPress(e,obj){if(!keyData.shift){keyData.shift=false;}
if(!keyData.alt){keyData.alt=false;}
if(!keyData.ctrl){keyData.ctrl=false;}
if(e.shiftKey==keyData.shift&&e.altKey==keyData.alt&&e.ctrlKey==keyData.ctrl){var dataItem;var keyPressed;if(keyData.keys instanceof Array){for(var i=0;i<keyData.keys.length;i++){dataItem=keyData.keys[i];if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);break;}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);break;}}}else{dataItem=keyData.keys;if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);}}}}
this.enable=function(){if(!this.enabled){GASGOO.util.Event.addListener(attachTo,event,handleKeyPress);this.enabledEvent.fire(keyData);}
this.enabled=true;};this.disable=function(){if(this.enabled){GASGOO.util.Event.removeListener(attachTo,event,handleKeyPress);this.disabledEvent.fire(keyData);}
this.enabled=false;};this.toString=function(){return"KeyListener ["+keyData.keys+"] "+attachTo.tagName+
(attachTo.id?"["+attachTo.id+"]":"");};};GASGOO.util.KeyListener.KEYDOWN="keydown";GASGOO.util.KeyListener.KEYUP="keyup";GASGOO.register("event",GASGOO.util.Event,{version:"2.3.0",build:"442"});(function(){var Y=GASGOO.util,getStyle,setStyle,id_counter=0,propertyCache={},reClassNameCache={};var isOpera=GASGOO.env.ua.opera,isSafari=GASGOO.env.ua.webkit,isGecko=GASGOO.env.ua.gecko,isIE=GASGOO.env.ua.ie;var patterns={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i};var toCamel=function(property){if(!patterns.HYPHEN.test(property)){return property;}
if(propertyCache[property]){return propertyCache[property];}
var converted=property;while(patterns.HYPHEN.exec(converted)){converted=converted.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}
propertyCache[property]=converted;return converted;};var getClassRegEx=function(className){var re=reClassNameCache[className];if(!re){re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)');reClassNameCache[className]=re;}
return re;};if(document.defaultView&&document.defaultView.getComputedStyle){getStyle=function(el,property){var value=null;if(property=='float'){property='cssFloat';}
var computed=document.defaultView.getComputedStyle(el,'');if(computed){value=computed[toCamel(property)];}
return el.style[property]||value;};}else if(document.documentElement.currentStyle&&isIE){getStyle=function(el,property){switch(toCamel(property)){case'opacity':var val=100;try{val=el.filters['DXImageTransform.Microsoft.Alpha'].opacity;}catch(e){try{val=el.filters('alpha').opacity;}catch(e){}}
return val/100;case'float':property='styleFloat';default:var value=el.currentStyle?el.currentStyle[property]:null;return(el.style[property]||value);}};}else{getStyle=function(el,property){return el.style[property];};}
if(isIE){setStyle=function(el,property,val){switch(property){case'opacity':if(GASGOO.lang.isString(el.style.filter)){el.style.filter='alpha(opacity='+val*100+')';if(!el.currentStyle||!el.currentStyle.hasLayout){el.style.zoom=1;}}
break;case'float':property='styleFloat';default:el.style[property]=val;}};}else{setStyle=function(el,property,val){if(property=='float'){property='cssFloat';}
el.style[property]=val;};}
var testElement=function(node,method){return node&&node.nodeType==1&&(!method||method(node));};GASGOO.util.Dom={get:function(el){if(!el||el.tagName||el.item){return el;}
if(GASGOO.lang.isString(el)){return document.getElementById(el);}
if(el.splice){var c=[];for(var i=0,len=el.length;i<len;++i){c[c.length]=Y.Dom.get(el[i]);}
return c;}
return el;},getStyle:function(el,property){property=toCamel(property);var f=function(element){return getStyle(element,property);};return Y.Dom.batch(el,f,Y.Dom,true);},setStyle:function(el,property,val){property=toCamel(property);var f=function(element){setStyle(element,property,val);};Y.Dom.batch(el,f,Y.Dom,true);},getXY:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false;}
var parentNode=null;var pos=[];var box;var doc=el.ownerDocument;if(el.getBoundingClientRect){box=el.getBoundingClientRect();return[box.left+Y.Dom.getDocumentScrollLeft(el.ownerDocument),box.top+Y.Dom.getDocumentScrollTop(el.ownerDocument)];}
else{pos=[el.offsetLeft,el.offsetTop];parentNode=el.offsetParent;var hasAbs=this.getStyle(el,'position')=='absolute';if(parentNode!=el){while(parentNode){pos[0]+=parentNode.offsetLeft;pos[1]+=parentNode.offsetTop;if(isSafari&&!hasAbs&&this.getStyle(parentNode,'position')=='absolute'){hasAbs=true;}
parentNode=parentNode.offsetParent;}}
if(isSafari&&hasAbs){pos[0]-=el.ownerDocument.body.offsetLeft;pos[1]-=el.ownerDocument.body.offsetTop;}}
parentNode=el.parentNode;while(parentNode.tagName&&!patterns.ROOT_TAG.test(parentNode.tagName))
{if(Y.Dom.getStyle(parentNode,'display').search(/^inline|table-row.*$/i)){pos[0]-=parentNode.scrollLeft;pos[1]-=parentNode.scrollTop;}
parentNode=parentNode.parentNode;}
return pos;};return Y.Dom.batch(el,f,Y.Dom,true);},getX:function(el){var f=function(el){return Y.Dom.getXY(el)[0];};return Y.Dom.batch(el,f,Y.Dom,true);},getY:function(el){var f=function(el){return Y.Dom.getXY(el)[1];};return Y.Dom.batch(el,f,Y.Dom,true);},setXY:function(el,pos,noRetry){var f=function(el){var style_pos=this.getStyle(el,'position');if(style_pos=='static'){this.setStyle(el,'position','relative');style_pos='relative';}
var pageXY=this.getXY(el);if(pageXY===false){return false;}
var delta=[parseInt(this.getStyle(el,'left'),10),parseInt(this.getStyle(el,'top'),10)];if(isNaN(delta[0])){delta[0]=(style_pos=='relative')?0:el.offsetLeft;}
if(isNaN(delta[1])){delta[1]=(style_pos=='relative')?0:el.offsetTop;}
if(pos[0]!==null){el.style.left=pos[0]-pageXY[0]+delta[0]+'px';}
if(pos[1]!==null){el.style.top=pos[1]-pageXY[1]+delta[1]+'px';}
if(!noRetry){var newXY=this.getXY(el);if((pos[0]!==null&&newXY[0]!=pos[0])||(pos[1]!==null&&newXY[1]!=pos[1])){this.setXY(el,pos,true);}}};Y.Dom.batch(el,f,Y.Dom,true);},setX:function(el,x){Y.Dom.setXY(el,[x,null]);},setY:function(el,y){Y.Dom.setXY(el,[null,y]);},getRegion:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false;}
var region=Y.Region.getRegion(el);return region;};return Y.Dom.batch(el,f,Y.Dom,true);},getClientWidth:function(){return Y.Dom.getViewportWidth();},getClientHeight:function(){return Y.Dom.getViewportHeight();},getElementsByClassName:function(className,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[];}
var nodes=[],elements=root.getElementsByTagName(tag),re=getClassRegEx(className);for(var i=0,len=elements.length;i<len;++i){if(re.test(elements[i].className)){nodes[nodes.length]=elements[i];if(apply){apply.call(elements[i],elements[i]);}}}
return nodes;},hasClass:function(el,className){var re=getClassRegEx(className);var f=function(el){return re.test(el.className);};return Y.Dom.batch(el,f,Y.Dom,true);},addClass:function(el,className){var f=function(el){if(this.hasClass(el,className)){return false;}
el.className=GASGOO.lang.trim([el.className,className].join(' '));return true;};return Y.Dom.batch(el,f,Y.Dom,true);},removeClass:function(el,className){var re=getClassRegEx(className);var f=function(el){if(!this.hasClass(el,className)){return false;}
var c=el.className;el.className=c.replace(re,' ');if(this.hasClass(el,className)){this.removeClass(el,className);}
el.className=GASGOO.lang.trim(el.className);return true;};return Y.Dom.batch(el,f,Y.Dom,true);},replaceClass:function(el,oldClassName,newClassName){if(!newClassName||oldClassName===newClassName){return false;}
var re=getClassRegEx(oldClassName);var f=function(el){if(!this.hasClass(el,oldClassName)){this.addClass(el,newClassName);return true;}
el.className=el.className.replace(re,' '+newClassName+' ');if(this.hasClass(el,oldClassName)){this.replaceClass(el,oldClassName,newClassName);}
el.className=GASGOO.lang.trim(el.className);return true;};return Y.Dom.batch(el,f,Y.Dom,true);},generateId:function(el,prefix){prefix=prefix||'yui-gen';var f=function(el){if(el&&el.id){return el.id;}
var id=prefix+id_counter++;if(el){el.id=id;}
return id;};return Y.Dom.batch(el,f,Y.Dom,true)||f.apply(Y.Dom,arguments);},isAncestor:function(haystack,needle){haystack=Y.Dom.get(haystack);if(!haystack||!needle){return false;}
var f=function(node){if(haystack.contains&&node.nodeType&&!isSafari){return haystack.contains(node);}
else if(haystack.compareDocumentPosition&&node.nodeType){return!!(haystack.compareDocumentPosition(node)&16);}else if(node.nodeType){return!!this.getAncestorBy(node,function(el){return el==haystack;});}
return false;};return Y.Dom.batch(needle,f,Y.Dom,true);},inDocument:function(el){var f=function(el){if(isSafari){while(el=el.parentNode){if(el==document.documentElement){return true;}}
return false;}
return this.isAncestor(document.documentElement,el);};return Y.Dom.batch(el,f,Y.Dom,true);},getElementsBy:function(method,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[];}
var nodes=[],elements=root.getElementsByTagName(tag);for(var i=0,len=elements.length;i<len;++i){if(method(elements[i])){nodes[nodes.length]=elements[i];if(apply){apply(elements[i]);}}}
return nodes;},batch:function(el,method,o,override){el=(el&&el.tagName)?el:Y.Dom.get(el);if(!el||!method){return false;}
var scope=(override)?o:window;if(el.tagName||(!el.item&&!el.slice)){return method.call(scope,el,o);}
var collection=[];for(var i=0,len=el.length;i<len;++i){collection[collection.length]=method.call(scope,el[i],o);}
return collection;},getDocumentHeight:function(){var scrollHeight=(document.compatMode!='CSS1Compat')?document.body.scrollHeight:document.documentElement.scrollHeight;var h=Math.max(scrollHeight,Y.Dom.getViewportHeight());return h;},getDocumentWidth:function(){var scrollWidth=(document.compatMode!='CSS1Compat')?document.body.scrollWidth:document.documentElement.scrollWidth;var w=Math.max(scrollWidth,Y.Dom.getViewportWidth());return w;},getViewportHeight:function(){var height=self.innerHeight;var mode=document.compatMode;if((mode||isIE)&&!isOpera){height=(mode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight;}
return height;},getViewportWidth:function(){var width=self.innerWidth;var mode=document.compatMode;if(mode||isIE){width=(mode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth;}
return width;},getAncestorBy:function(node,method){while(node=node.parentNode){if(testElement(node,method)){return node;}}
return null;},getAncestorByClassName:function(node,className){node=Y.Dom.get(node);if(!node){return null;}
var method=function(el){return Y.Dom.hasClass(el,className);};return Y.Dom.getAncestorBy(node,method);},getAncestorByTagName:function(node,tagName){node=Y.Dom.get(node);if(!node){return null;}
var method=function(el){return el.tagName&&el.tagName.toUpperCase()==tagName.toUpperCase();};return Y.Dom.getAncestorBy(node,method);},getPreviousSiblingBy:function(node,method){while(node){node=node.previousSibling;if(testElement(node,method)){return node;}}
return null;},getPreviousSibling:function(node){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getPreviousSiblingBy(node);},getNextSiblingBy:function(node,method){while(node){node=node.nextSibling;if(testElement(node,method)){return node;}}
return null;},getNextSibling:function(node){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getNextSiblingBy(node);},getFirstChildBy:function(node,method){var child=(testElement(node.firstChild,method))?node.firstChild:null;return child||Y.Dom.getNextSiblingBy(node.firstChild,method);},getFirstChild:function(node,method){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getFirstChildBy(node);},getLastChildBy:function(node,method){if(!node){return null;}
var child=(testElement(node.lastChild,method))?node.lastChild:null;return child||Y.Dom.getPreviousSiblingBy(node.lastChild,method);},getLastChild:function(node){node=Y.Dom.get(node);return Y.Dom.getLastChildBy(node);},getChildrenBy:function(node,method){var child=Y.Dom.getFirstChildBy(node,method);var children=child?[child]:[];Y.Dom.getNextSiblingBy(child,function(node){if(!method||method(node)){children[children.length]=node;}
return false;});return children;},getChildren:function(node){node=Y.Dom.get(node);if(!node){}
return Y.Dom.getChildrenBy(node);},getDocumentScrollLeft:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);},getDocumentScrollTop:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);},insertBefore:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null;}
return referenceNode.parentNode.insertBefore(newNode,referenceNode);},insertAfter:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null;}
if(referenceNode.nextSibling){return referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);}else{return referenceNode.parentNode.appendChild(newNode);}}};})();GASGOO.util.Region=function(t,r,b,l){this.top=t;this[1]=t;this.right=r;this.bottom=b;this.left=l;this[0]=l;};GASGOO.util.Region.prototype.contains=function(region){return(region.left>=this.left&&region.right<=this.right&&region.top>=this.top&&region.bottom<=this.bottom);};GASGOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};GASGOO.util.Region.prototype.intersect=function(region){var t=Math.max(this.top,region.top);var r=Math.min(this.right,region.right);var b=Math.min(this.bottom,region.bottom);var l=Math.max(this.left,region.left);if(b>=t&&r>=l){return new GASGOO.util.Region(t,r,b,l);}else{return null;}};GASGOO.util.Region.prototype.union=function(region){var t=Math.min(this.top,region.top);var r=Math.max(this.right,region.right);var b=Math.max(this.bottom,region.bottom);var l=Math.min(this.left,region.left);return new GASGOO.util.Region(t,r,b,l);};GASGOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};GASGOO.util.Region.getRegion=function(el){var p=GASGOO.util.Dom.getXY(el);var t=p[1];var r=p[0]+el.offsetWidth;var b=p[1]+el.offsetHeight;var l=p[0];return new GASGOO.util.Region(t,r,b,l);};GASGOO.util.Point=function(x,y){if(GASGOO.lang.isArray(x)){y=x[1];x=x[0];}
this.x=this.right=this.left=this[0]=x;this.y=this.top=this.bottom=this[1]=y;};GASGOO.util.Point.prototype=new GASGOO.util.Region();GASGOO.register("dom",GASGOO.util.Dom,{version:"2.3.0",build:"442"});if(!Array.prototype.indexOf){Array.prototype.indexOf=function(obj,fromIndex){if(fromIndex==null){fromIndex=0;}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);}
for(var i=fromIndex;i<this.length;i++){if(this[i]===obj)
return i;}
return-1;};}
if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function(obj,fromIndex){if(fromIndex==null){fromIndex=this.length-1;}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);}
for(var i=fromIndex;i>=0;i--){if(this[i]===obj)
return i;}
return-1;};}
if(!Array.prototype.forEach){Array.prototype.forEach=function(f,obj){var l=this.length;for(var i=0;i<l;i++){f.call(obj,this[i],i,this);}};}
if(!Array.prototype.filter){Array.prototype.filter=function(f,obj){var l=this.length;var res=[];for(var i=0;i<l;i++){if(f.call(obj,this[i],i,this)){res.push(this[i]);}}
return res;};}
if(!Array.prototype.map){Array.prototype.map=function(f,obj){var l=this.length;var res=[];for(var i=0;i<l;i++){res.push(f.call(obj,this[i],i,this));}
return res;};}
if(!Array.prototype.some){Array.prototype.some=function(f,obj){var l=this.length;for(var i=0;i<l;i++){if(f.call(obj,this[i],i,this)){return true;}}
return false;};}
if(!Array.prototype.every){Array.prototype.every=function(f,obj){var l=this.length;for(var i=0;i<l;i++){if(!f.call(obj,this[i],i,this)){return false;}}
return true;};}
Array.prototype.contains=function(obj){return this.indexOf(obj)!=-1;};Array.prototype.copy=function(obj){return this.concat();};Array.prototype.insertAt=function(obj,i){this.splice(i,0,obj);};Array.prototype.insertBefore=function(obj,obj2){var i=this.indexOf(obj2);if(i==-1)
this.push(obj);else
this.splice(i,0,obj);};Array.prototype.removeAt=function(i){this.splice(i,1);};Array.prototype.remove=function(obj){var i=this.indexOf(obj);if(i!=-1)
this.splice(i,1);};if(!String.prototype.toQueryParams){String.prototype.toQueryParams=function(){var hash={};var params=this.trim().split('&');for(var j=0;j<params.length;j++){var pair=params[j].split('=');var name=decodeURIComponent(pair[0]);var value=pair[1]?decodeURIComponent(pair[1]):undefined;if(hash[name]!==undefined){if(hash[name].constructor!=Array)
hash[name]=[hash[name]];if(value)
hash[name].push(value);}else{hash[name]=value;}}
return hash;}}
if(!String.prototype.trim){String.prototype.trim=function(){var re=/^\s+|\s+$/g;return function(){return this.replace(re,"");};}();}
if(!String.prototype.replaceAll){String.prototype.replaceAll=function(from,to){var re=eval("/"+from+"/g");return(this.replace(re,to));};}
$D=GASGOO.util.Dom;$E=GASGOO.util.Event;$=$D.get;TB={};TB.namespace=function(){var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=TB;for(j=(d[0]=="TB")?1:0;j<d.length;j=j+1){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}
return o;};TB.namespace('env');TB.env={hostname:'Gasgoo.com',scriptName:'base.js',debug:false,lang:(navigator.userLanguage?navigator.userLanguage.toLowerCase():navigator.language.toLowerCase())};TB.namespace('locale');TB.locale={Messages:{},getMessage:function(key){return TB.locale.Messages[key]||key;},setMessage:function(key,value){TB.locale.Messages[key]=value;}}
$M=TB.locale.getMessage;TB.trace=function(msg){if(!TB.env.debug)return;if(window.console){window.console.debug(msg);}else{alert(msg);}}
TB.init=function(){this.namespace('widget','dom','bom','util','form','anim');var scripts=document.getElementsByTagName("script");var idx,urlPrefix;for(var i=0;i<scripts.length;i++){if((idx=scripts[i].src.indexOf(TB.env.scriptName))>0){urlPrefix=scripts[i].src.substring(0,idx);var matchs=scripts[i].src.match(/\?(.*)$/);if(matchs){var params=matchs[1].toQueryParams();for(n in params){if(n=='t')n='timestamp';TB.env[n]=params[n];}}}}}
TB.locale.Messages={loading:'Loading...',pleaseWait:'Please waiting...',ajaxError:'System Error',prevPageText:'Next Page',nextPageText:'Previous Page',year:'year',month:'month',day:'day',hour:'hour',minute:'minute',second:'second',timeoutText:'Timeout'}
TB.init();TB.common={trim:function(str){return str.replace(/(^\s*)|(\s*$)/g,'');},escapeHTML:function(str){var div=document.createElement('div');var text=document.createTextNode(str);div.appendChild(text);return div.innerHTML;},unescapeHTML:function(str){var div=document.createElement('div');div.innerHTML=str.replace(/<\/?[^>]+>/gi,'');return div.childNodes[0]?div.childNodes[0].nodeValue:'';},stripTags:function(str){return str.replace(/<\/?[^>]+>/gi,'');},toArray:function(list,start){var array=[];for(var i=start||0;i<list.length;i++){array[array.length]=list[i];}
return array;},applyIf:function(obj,config){if(obj&&config&&typeof config=='object'){for(var p in config){if(!GASGOO.lang.hasOwnProperty(obj,p))
obj[p]=config[p];}}
return obj;},apply:function(obj,config){if(obj&&config&&typeof config=='object'){for(var p in config)
obj[p]=config[p];}
return obj;},_messagePattern:/\{([\w-]+)?\}/g,formatMessage:function(msg,values,filter){return msg.replace(this._messagePattern,function(match,key){return filter?filter(values[key],key):values[key];});}};TB.applyIf=TB.common.applyIf;TB.apply=TB.common.apply;(function(){var ua=navigator.userAgent.toLowerCase();var _isOpera=ua.indexOf('opera')!=-1,_isSafari=ua.indexOf('safari')!=-1,_isGecko=!_isOpera&&!_isSafari&&ua.indexOf('gecko')>-1,_isIE=!_isOpera&&ua.indexOf('msie')!=-1,_isIE6=!_isOpera&&ua.indexOf('msie 6')!=-1,_isIE7=!_isOpera&&ua.indexOf('msie 7')!=-1;TB.bom={isOpera:_isOpera,isSafari:_isSafari,isGecko:_isGecko,isIE:_isIE,isIE6:_isIE6,isIE7:_isIE7,getCookie:function(name){var value=document.cookie.match('(?:^|;)\\s*'+name+'=([^;]*)');return value?unescape(value[1]):'';},setCookie:function(name,value,expire,domain,path){value=escape(value);value+=(domain)?'; domain='+domain:'';value+=(path)?"; path="+path:'';if(expire){var date=new Date();date.setTime(date.getTime()+(expire*86400000));value+="; expires="+date.toGMTString();}
document.cookie=name+"="+value;},removeCookie:function(name){setCookie(name,'',-1);},pickDocumentDomain:function(){var da=location.hostname.split('.'),len=da.length;var deep=arguments[0]||(len<3?0:1);if(deep>=len||len-deep<2)
deep=len-2;return da.slice(deep).join('.');}}})();TB.dom={insertAfter:function(node,refNode){var node=$(node),refNode=$(refNode);if(refNode.nextSibling){return refNode.parentNode.insertBefore(node,refNode.nextSibling);}else{return refNode.parentNode.appendChild(node);}},getAncestorByTagName:function(el,tag){el=$(el);tag=tag.toUpperCase();while(el.parentNode){if(el.tagName.toUpperCase()==tag)return el;if(el.tagName.toUpperCase()=="BODY")return null;el=el.parentNode;}
return null;},getAncestorByClassName:function(el,cls){el=$(el);while(el.parentNode){if($D.hasClass(el,cls))return el;if(el.tagName.toUpperCase=="BODY")return null;el=el.parentNode;}
return null;},getNextSibling:function(el){var sibling=$(el).nextSibling;while(sibling.nodeType!=1){sibling=sibling.nextSibling;}
return sibling;},getPreviousSibling:function(el){var sibling=$(el).previousSibling;while(sibling.nodeType!=1){sibling=sibling.previousSibling;}
return sibling;},getFieldLabelHtml:function(el,parent){var labels=(parent||el.parentNode).getElementsByTagName('label');for(var i=0;i<labels.length;i++){var forAttr=labels[i].htmlFor||labels[i].getAttribute('for')
if(forAttr==input.id)
return labels[i].innerHTML;}},getIframeDocument:function(el){var iframe=$(el);return iframe.contentWindow?iframe.contentWindow.document:iframe.contentDocument;},setFormAction:function(form,url){form=$('form');var actionInput=form.elements['action'];var postSet;if(actionInput){var ai=form.removeChild(actionInput);postSet=function(){form.appendChild(ai);}}
form.action=url;if(postSet)
postSet();return true;}}
var AE={};AE.widget=TB.widget;AE.browse=TB.bom;AE.bom=TB.bom;AE.common=TB.common;AE.dom=TB.dom;AE.namespace=function(){var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=AE;for(j=(d[0]=="AE")?1:0;j<d.length;j=j+1){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}
return o;};AE.cpAttribute=function(obj,config){if(obj&&config&&typeof config=='object'){for(var p in config){if(!GASGOO.lang.hasOwnProperty(obj,p))
obj[p]=config[p];}}
return obj;}
if(!IL){var IL={ok:"Ok",cancel:"Cancel"};}
var YL=GASGOO.lang;var YUD=GASGOO.util.Dom;var YUE=GASGOO.util.Event;YUD.setCookie=TB.bom.setCookie;YUD.getCookie=TB.bom.getCookie;YUD.deleteCookie=TB.bom.removeCookie;function vd(p){}
String.prototype.ltrim=function(){return this.replace(/(^\s*)/g,"");}
String.prototype.rtrim=function(){return this.replace(/(\s*$)/g,"");}
String.prototype.isEmpty=function(){if(this==""||this==''){return true;}else{return false;}}
YL.isEnglish=function(sValue){var myReg=/[^\x00-\x80]/g;if(myReg.test(sValue)){return false;}else{return true;}}
YL.isAscii=function(sValue){var myReg=/[^\x00-\xFF]/g;if(myReg.test(sValue)){return false}else{return true;}}
var get=YUD.get;function controlListShow(e,sClassName,sTagName,sParentNodeId,sVisible){var items=YUD.getElementsByClassName(sClassName,sTagName,get(sParentNodeId));if(sVisible||sVisible==''||sVisible==""){YUD.setStyle(items,"display",sVisible);}else{if(items[0].style.display=="none"){YUD.setStyle(items,"display","");}else{YUD.setStyle(items,"display","none");}}}
function addMoreAttributeContent(sContent,sButtonId,sContainerTagName){var oActionButton=get(sButtonId);var span=document.createElement(sContainerTagName);var separator=document.createElement('div');separator.style.Clear="both";span.innerHTML=sContent;oActionButton.parentNode.insertBefore(separator,oActionButton);oActionButton.parentNode.insertBefore(span,oActionButton);}

GASGOO.util.Anim=function(el,attributes,duration,method){if(el){this.init(el,attributes,duration,method);}};GASGOO.util.Anim.prototype={toString:function(){var el=this.getEl();var id=el.id||el.tagName;return("Anim "+id);},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(attr,start,end){return this.method(this.currentFrame,start,end-start,this.totalFrames);},setAttribute:function(attr,val,unit){if(this.patterns.noNegatives.test(attr)){val=(val>0)?val:0;}
GASGOO.util.Dom.setStyle(this.getEl(),attr,val+unit);},getAttribute:function(attr){var el=this.getEl();var val=GASGOO.util.Dom.getStyle(el,attr);if(val!=='auto'&&!this.patterns.offsetUnit.test(val)){return parseFloat(val);}
var a=this.patterns.offsetAttribute.exec(attr)||[];var pos=!!(a[3]);var box=!!(a[2]);if(box||(GASGOO.util.Dom.getStyle(el,'position')=='absolute'&&pos)){val=el['offset'+a[0].charAt(0).toUpperCase()+a[0].substr(1)];}else{val=0;}
return val;},getDefaultUnit:function(attr){if(this.patterns.defaultUnit.test(attr)){return'px';}
return'';},setRuntimeAttribute:function(attr){var start;var end;var attributes=this.attributes;this.runtimeAttributes[attr]={};var isset=function(prop){return(typeof prop!=='undefined');};if(!isset(attributes[attr]['to'])&&!isset(attributes[attr]['by'])){return false;}
start=(isset(attributes[attr]['from']))?attributes[attr]['from']:this.getAttribute(attr);if(isset(attributes[attr]['to'])){end=attributes[attr]['to'];}else if(isset(attributes[attr]['by'])){if(start.constructor==Array){end=[];for(var i=0,len=start.length;i<len;++i){end[i]=start[i]+attributes[attr]['by'][i];}}else{end=start+attributes[attr]['by'];}}
this.runtimeAttributes[attr].start=start;this.runtimeAttributes[attr].end=end;this.runtimeAttributes[attr].unit=(isset(attributes[attr].unit))?attributes[attr]['unit']:this.getDefaultUnit(attr);},init:function(el,attributes,duration,method){var isAnimated=false;var startTime=null;var actualFrames=0;el=GASGOO.util.Dom.get(el);this.attributes=attributes||{};this.duration=duration||1;this.method=method||GASGOO.util.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=GASGOO.util.AnimMgr.fps;this.getEl=function(){return el;};this.isAnimated=function(){return isAnimated;};this.getStartTime=function(){return startTime;};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false;}
this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(GASGOO.util.AnimMgr.fps*this.duration):this.duration;GASGOO.util.AnimMgr.registerElement(this);};this.stop=function(finish){if(finish){this.currentFrame=this.totalFrames;this._onTween.fire();}
GASGOO.util.AnimMgr.stop(this);};var onStart=function(){this.onStart.fire();this.runtimeAttributes={};for(var attr in this.attributes){this.setRuntimeAttribute(attr);}
isAnimated=true;actualFrames=0;startTime=new Date();};var onTween=function(){var data={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};data.toString=function(){return('duration: '+data.duration+', currentFrame: '+data.currentFrame);};this.onTween.fire(data);var runtimeAttributes=this.runtimeAttributes;for(var attr in runtimeAttributes){this.setAttribute(attr,this.doMethod(attr,runtimeAttributes[attr].start,runtimeAttributes[attr].end),runtimeAttributes[attr].unit);}
actualFrames+=1;};var onComplete=function(){var actual_duration=(new Date()-startTime)/1000;var data={duration:actual_duration,frames:actualFrames,fps:actualFrames/actual_duration};data.toString=function(){return('duration: '+data.duration+', frames: '+data.frames+', fps: '+data.fps);};isAnimated=false;actualFrames=0;this.onComplete.fire(data);};this._onStart=new GASGOO.util.CustomEvent('_start',this,true);this.onStart=new GASGOO.util.CustomEvent('start',this);this.onTween=new GASGOO.util.CustomEvent('tween',this);this._onTween=new GASGOO.util.CustomEvent('_tween',this,true);this.onComplete=new GASGOO.util.CustomEvent('complete',this);this._onComplete=new GASGOO.util.CustomEvent('_complete',this,true);this._onStart.subscribe(onStart);this._onTween.subscribe(onTween);this._onComplete.subscribe(onComplete);}};GASGOO.util.AnimMgr=new function(){var thread=null;var queue=[];var tweenCount=0;this.fps=1000;this.delay=1;this.registerElement=function(tween){queue[queue.length]=tween;tweenCount+=1;tween._onStart.fire();this.start();};this.unRegister=function(tween,index){tween._onComplete.fire();index=index||getIndex(tween);if(index!=-1){queue.splice(index,1);}
tweenCount-=1;if(tweenCount<=0){this.stop();}};this.start=function(){if(thread===null){thread=setInterval(this.run,this.delay);}};this.stop=function(tween){if(!tween){clearInterval(thread);for(var i=0,len=queue.length;i<len;++i){if(queue[0].isAnimated()){this.unRegister(queue[0],0);}}
queue=[];thread=null;tweenCount=0;}
else{this.unRegister(tween);}};this.run=function(){for(var i=0,len=queue.length;i<len;++i){var tween=queue[i];if(!tween||!tween.isAnimated()){continue;}
if(tween.currentFrame<tween.totalFrames||tween.totalFrames===null)
{tween.currentFrame+=1;if(tween.useSeconds){correctFrame(tween);}
tween._onTween.fire();}
else{GASGOO.util.AnimMgr.stop(tween,i);}}};var getIndex=function(anim){for(var i=0,len=queue.length;i<len;++i){if(queue[i]==anim){return i;}}
return-1;};var correctFrame=function(tween){var frames=tween.totalFrames;var frame=tween.currentFrame;var expected=(tween.currentFrame*tween.duration*1000/tween.totalFrames);var elapsed=(new Date()-tween.getStartTime());var tweak=0;if(elapsed<tween.duration*1000){tweak=Math.round((elapsed/expected-1)*tween.currentFrame);}else{tweak=frames-(frame+1);}
if(tweak>0&&isFinite(tweak)){if(tween.currentFrame+tweak>=frames){tweak=frames-(frame+1);}
tween.currentFrame+=tweak;}};};GASGOO.util.Bezier=new function(){this.getPosition=function(points,t){var n=points.length;var tmp=[];for(var i=0;i<n;++i){tmp[i]=[points[i][0],points[i][1]];}
for(var j=1;j<n;++j){for(i=0;i<n-j;++i){tmp[i][0]=(1-t)*tmp[i][0]+t*tmp[parseInt(i+1,10)][0];tmp[i][1]=(1-t)*tmp[i][1]+t*tmp[parseInt(i+1,10)][1];}}
return[tmp[0][0],tmp[0][1]];};};(function(){GASGOO.util.ColorAnim=function(el,attributes,duration,method){GASGOO.util.ColorAnim.superclass.constructor.call(this,el,attributes,duration,method);};GASGOO.extend(GASGOO.util.ColorAnim,GASGOO.util.Anim);var Y=GASGOO.util;var superclass=Y.ColorAnim.superclass;var proto=Y.ColorAnim.prototype;proto.toString=function(){var el=this.getEl();var id=el.id||el.tagName;return("ColorAnim "+id);};proto.patterns.color=/color$/i;proto.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;proto.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;proto.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;proto.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;proto.parseColor=function(s){if(s.length==3){return s;}
var c=this.patterns.hex.exec(s);if(c&&c.length==4){return[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)];}
c=this.patterns.rgb.exec(s);if(c&&c.length==4){return[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)];}
c=this.patterns.hex3.exec(s);if(c&&c.length==4){return[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)];}
return null;};proto.getAttribute=function(attr){var el=this.getEl();if(this.patterns.color.test(attr)){var val=GASGOO.util.Dom.getStyle(el,attr);if(this.patterns.transparent.test(val)){var parent=el.parentNode;val=Y.Dom.getStyle(parent,attr);while(parent&&this.patterns.transparent.test(val)){parent=parent.parentNode;val=Y.Dom.getStyle(parent,attr);if(parent.tagName.toUpperCase()=='HTML'){val='#fff';}}}}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.doMethod=function(attr,start,end){var val;if(this.patterns.color.test(attr)){val=[];for(var i=0,len=start.length;i<len;++i){val[i]=superclass.doMethod.call(this,attr,start[i],end[i]);}
val='rgb('+Math.floor(val[0])+','+Math.floor(val[1])+','+Math.floor(val[2])+')';}
else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.setRuntimeAttribute=function(attr){superclass.setRuntimeAttribute.call(this,attr);if(this.patterns.color.test(attr)){var attributes=this.attributes;var start=this.parseColor(this.runtimeAttributes[attr].start);var end=this.parseColor(this.runtimeAttributes[attr].end);if(typeof attributes[attr]['to']==='undefined'&&typeof attributes[attr]['by']!=='undefined'){end=this.parseColor(attributes[attr].by);for(var i=0,len=start.length;i<len;++i){end[i]=start[i]+end[i];}}
this.runtimeAttributes[attr].start=start;this.runtimeAttributes[attr].end=end;}};})();GASGOO.util.Easing={easeNone:function(t,b,c,d){return c*t/d+b;},easeIn:function(t,b,c,d){return c*(t/=d)*t+b;},easeOut:function(t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeBoth:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b;}
return-c/2*((--t)*(t-2)-1)+b;},easeInStrong:function(t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutStrong:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeBothStrong:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b;}
return-c/2*((t-=2)*t*t*t-2)+b;},elasticIn:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d)==1){return b+c;}
if(!p){p=d*.3;}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},elasticOut:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d)==1){return b+c;}
if(!p){p=d*.3;}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},elasticBoth:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d/2)==2){return b+c;}
if(!p){p=d*(.3*1.5);}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
if(t<1){return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;}
return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},backIn:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
return c*(t/=d)*t*((s+1)*t-s)+b;},backOut:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},backBoth:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},bounceIn:function(t,b,c,d){return c-GASGOO.util.Easing.bounceOut(d-t,0,c,d)+b;},bounceOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}
return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},bounceBoth:function(t,b,c,d){if(t<d/2){return GASGOO.util.Easing.bounceIn(t*2,0,c,d)*.5+b;}
return GASGOO.util.Easing.bounceOut(t*2-d,0,c,d)*.5+c*.5+b;}};(function(){GASGOO.util.Motion=function(el,attributes,duration,method){if(el){GASGOO.util.Motion.superclass.constructor.call(this,el,attributes,duration,method);}};GASGOO.extend(GASGOO.util.Motion,GASGOO.util.ColorAnim);var Y=GASGOO.util;var superclass=Y.Motion.superclass;var proto=Y.Motion.prototype;proto.toString=function(){var el=this.getEl();var id=el.id||el.tagName;return("Motion "+id);};proto.patterns.points=/^points$/i;proto.setAttribute=function(attr,val,unit){if(this.patterns.points.test(attr)){unit=unit||'px';superclass.setAttribute.call(this,'left',val[0],unit);superclass.setAttribute.call(this,'top',val[1],unit);}else{superclass.setAttribute.call(this,attr,val,unit);}};proto.getAttribute=function(attr){if(this.patterns.points.test(attr)){var val=[superclass.getAttribute.call(this,'left'),superclass.getAttribute.call(this,'top')];}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.doMethod=function(attr,start,end){var val=null;if(this.patterns.points.test(attr)){var t=this.method(this.currentFrame,0,100,this.totalFrames)/100;val=Y.Bezier.getPosition(this.runtimeAttributes[attr],t);}else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.setRuntimeAttribute=function(attr){if(this.patterns.points.test(attr)){var el=this.getEl();var attributes=this.attributes;var start;var control=attributes['points']['control']||[];var end;var i,len;if(control.length>0&&!(control[0]instanceof Array)){control=[control];}else{var tmp=[];for(i=0,len=control.length;i<len;++i){tmp[i]=control[i];}
control=tmp;}
if(Y.Dom.getStyle(el,'position')=='static'){Y.Dom.setStyle(el,'position','relative');}
if(isset(attributes['points']['from'])){Y.Dom.setXY(el,attributes['points']['from']);}
else{Y.Dom.setXY(el,Y.Dom.getXY(el));}
start=this.getAttribute('points');if(isset(attributes['points']['to'])){end=translateValues.call(this,attributes['points']['to'],start);var pageXY=Y.Dom.getXY(this.getEl());for(i=0,len=control.length;i<len;++i){control[i]=translateValues.call(this,control[i],start);}}else if(isset(attributes['points']['by'])){end=[start[0]+attributes['points']['by'][0],start[1]+attributes['points']['by'][1]];for(i=0,len=control.length;i<len;++i){control[i]=[start[0]+control[i][0],start[1]+control[i][1]];}}
this.runtimeAttributes[attr]=[start];if(control.length>0){this.runtimeAttributes[attr]=this.runtimeAttributes[attr].concat(control);}
this.runtimeAttributes[attr][this.runtimeAttributes[attr].length]=end;}
else{superclass.setRuntimeAttribute.call(this,attr);}};var translateValues=function(val,start){var pageXY=Y.Dom.getXY(this.getEl());val=[val[0]-pageXY[0]+start[0],val[1]-pageXY[1]+start[1]];return val;};var isset=function(prop){return(typeof prop!=='undefined');};})();(function(){GASGOO.util.Scroll=function(el,attributes,duration,method){if(el){GASGOO.util.Scroll.superclass.constructor.call(this,el,attributes,duration,method);}};GASGOO.extend(GASGOO.util.Scroll,GASGOO.util.ColorAnim);var Y=GASGOO.util;var superclass=Y.Scroll.superclass;var proto=Y.Scroll.prototype;proto.toString=function(){var el=this.getEl();var id=el.id||el.tagName;return("Scroll "+id);};proto.doMethod=function(attr,start,end){var val=null;if(attr=='scroll'){val=[this.method(this.currentFrame,start[0],end[0]-start[0],this.totalFrames),this.method(this.currentFrame,start[1],end[1]-start[1],this.totalFrames)];}else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.getAttribute=function(attr){var val=null;var el=this.getEl();if(attr=='scroll'){val=[el.scrollLeft,el.scrollTop];}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.setAttribute=function(attr,val,unit){var el=this.getEl();if(attr=='scroll'){el.scrollLeft=val[0];el.scrollTop=val[1];}else{superclass.setAttribute.call(this,attr,val,unit);}};})();GASGOO.register("animation",GASGOO.util.Anim,{version:"2.2.2",build:"204"});

AE.widget.itemViewer=function(){var oComponent=this;var oDefConfig={itemSize:[0,0],itemNum:6,showenItemNum:0,step:3,animTime:1,orientation:"h",toward:-1,fireFunction:GASGOO.util.Easing.easeBothStrong,itemContainerId:"itemViewerContainer",itemClassName:"itemViewerItem",preBtnId:"itemViewerPre",nextBtnId:"itemViewerNext",navContainerId:"itemViewerNav",getDataUrl:false,dataFormId:false,upFront:2,navFireEvent:"click",autoCycleTimes:false,cycleDelay:2000,loadTextLength:50,navCurrentClass:"current"}
var config;var preBtn,nextBtn,navContainer,itemContainer;var anim;var isInited=false;var basePoint=[0,0];var currentIndex=0;var pageNum,loadedItemNum;var loadDataForm,canGetData=true,loadDataLength;var cycleTimer,cycleTimes=0;oComponent.onDisablePre=new GASGOO.util.CustomEvent("disablePre",oComponent);oComponent.onEnablePre=new GASGOO.util.CustomEvent("enablePre",oComponent);oComponent.onDisableNext=new GASGOO.util.CustomEvent("disableNext",oComponent);oComponent.onEnableNext=new GASGOO.util.CustomEvent("enableNext",oComponent);oComponent.init=function(oConfig){if(isInited)return false;config=AE.cpAttribute(oConfig,oDefConfig);if(config.itemNum<0){isInited=true;return false;}
try{preBtn=get(config.preBtnId);nextBtn=get(config.nextBtnId);}catch(E){preBtn=false;nextBtn=false;}
if(config.showenItemNum==0)
config.showenItemNum=config.step;itemContainer=get(config.itemContainerId);if(config.step!=0){pageNum=Math.ceil((config.itemNum-config.showenItemNum)/config.step)+1;}else{pageNum=0;}
creatNav();basePoint=YUD.getXY(itemContainer.parentNode);loadedItemNum=YUD.getElementsByClassName(config.itemClassName,'*',itemContainer).length;loadDataLength=loadedItemNum.toString();fixContainer();anim=new GASGOO.util.Motion(config.itemContainerId,{points:{to:basePoint}},config.animTime,config.fireFunction)
if(config.dataFormId)createForm();if(preBtn){YUE.on(preBtn,'click',oComponent.fPre);YUE.on(nextBtn,'click',oComponent.fNext);}
setPointTo(0);createAutoCycle();isInited=true;return true;};oComponent.fPre=function(e){if(e)YUE.stopEvent(e);if(anim.isAnimated())return false;--currentIndex;if(setPointTo(currentIndex)){setCurrentNavClass(currentIndex);anim.animate();}};oComponent.fNext=function(e){if(e)YUE.stopEvent(e);if(anim.isAnimated())return false;++currentIndex;if(setPointTo(currentIndex)){setCurrentNavClass(currentIndex);anim.animate();}};oComponent.show=function(e,iPageNum){if(e)YUE.stopEvent(e);if(anim.isAnimated())return false;if(!YL.isNumber(iPageNum))return false;var iIndex=iPageNum-1;if(iIndex<0){iIndex=0}
if(iIndex>=pageNum){iIndex=pageNum-1}
currentIndex=iIndex;if(setPointTo(currentIndex)){setCurrentNavClass(currentIndex);anim.animate();}};oComponent.showDirectly=function(e,iPageNum){if(e)YUE.stopEvent(e);if(anim.isAnimated())return false;if(!YL.isNumber(iPageNum))return false;var iIndex=iPageNum-1;if(iIndex<0){iIndex=0}
if(iIndex>=pageNum){iIndex=pageNum-1}
currentIndex=iIndex;if(setPointTo(currentIndex)){setCurrentNavClass(currentIndex);anim.animate();anim.stop(true);}};oComponent.getIndex=function(){return currentIndex;}
var creatNav=function(){try{navContainer=get(config.navContainerId)}catch(E){navContainer=false;return false;}
if(!navContainer)return false;for(var i=1,tmpA={};i<=pageNum;i++){tmpA=document.createElement("span");/*tmpA.href="javascript:void(0)";*/if(i==1){tmpA.className=config.navCurrentClass}
tmpA.innerHTML=i;YUE.on(tmpA,config.navFireEvent,oComponent.show,i);navContainer.appendChild(tmpA);}};var setCurrentNavClass=function(iIndex){if(!navContainer)return false;var items=navContainer.getElementsByTagName("span");YUD.removeClass(items,config.navCurrentClass);YUD.addClass(items[iIndex],config.navCurrentClass);}
var createAutoCycle=function(){if(!config.autoCycleTimes)return false;cycleTimer=setTimeout(doCycle,config.cycleDelay);if(navContainer){YUE.on(navContainer,"mouseover",cycleStop);YUE.on(navContainer,"mouseout",cycleStart);YUE.on(itemContainer,"mouseover",cycleStop);YUE.on(itemContainer,"mouseout",cycleStart);}
if(preBtn){YUE.on(preBtn,"mouseover",cycleStop);YUE.on(preBtn,"mouseout",cycleStart);YUE.on(nextBtn,"mouseover",cycleStop);YUE.on(nextBtn,"mouseout",cycleStart);}}
var cycleStop=function(e){YUE.stopEvent(e);clearTimeout(cycleTimer);}
var cycleStart=function(e){YUE.stopEvent(e);cycleTimer=setTimeout(doCycle,config.cycleDelay);}
var doCycle=function(){clearTimeout(cycleTimer);if(currentIndex>=pageNum-1){currentIndex=-1;cycleTimes++;}
if(cycleTimes>=config.autoCycleTimes){clearTimeout(cycleTimer);if(navContainer){YUE.removeListener(navContainer,"mouseover",cycleStop);YUE.removeListener(navContainer,"mouseout",cycleStart);}
if(preBtn){YUE.removeListener(preBtn,"mouseover",cycleStop);YUE.removeListener(preBtn,"mouseout",cycleStart);YUE.removeListener(nextBtn,"mouseover",cycleStop);YUE.removeListener(nextBtn,"mouseout",cycleStart);}
YUE.removeListener(itemContainer,"mouseover",cycleStop);YUE.removeListener(itemContainer,"mouseout",cycleStart);oComponent.show(null,1);return;}else{cycleTimer=setTimeout(doCycle,config.cycleDelay);}
oComponent.fNext();}
var setPointTo=function(targetIndex){if(targetIndex<=0){disablePre();if(targetIndex<0){currentIndex=0;return false;}}else{enablePre();}
if(targetIndex>=pageNum-1){disableNext();if(targetIndex>=pageNum){currentIndex=pageNum-1;return false;}}else{enableNext();}
if(config.dataFormId)getItems(targetIndex+1);basePoint=YUD.getXY(itemContainer.parentNode);var scrollStep=config.step;var overflow=(config.showenItemNum+targetIndex*config.step)-config.itemNum;if(overflow>0){scrollStep=config.step-overflow;}
var x=targetIndex*scrollStep*config.toward*config.itemSize[0]+basePoint[0];var y=targetIndex*scrollStep*config.toward*config.itemSize[1]+basePoint[1];switch(config.orientation){case"h":{anim.attributes.points.to=[basePoint[0],y];break;}
case"w":{anim.attributes.points.to=[x,basePoint[1]];break;}};return true;}
var disablePre=function(){oComponent.onDisablePre.fire();};var enablePre=function(){oComponent.onEnablePre.fire();};var disableNext=function(){oComponent.onDisableNext.fire();};var enableNext=function(){oComponent.onEnableNext.fire();};var fixContainer=function(){switch(config.orientation){case"h":{var h=config.itemSize[1]*config.itemNum;itemContainer.style.height=h+"px";break;}
case"w":{var w=config.itemSize[0]*config.itemNum;itemContainer.style.width=w+"px";break;}};};var createForm=function(){loadDataForm=get(config.dataFormId);YUD.setStyle(loadDataForm,"display","none");}
var getItems=function(iPageNum){if(!canGetData)return false;var currentRequestLength=iPageNum*config.step;if(currentRequestLength<=loadedItemNum-(config.step*config.upFront)||loadedItemNum>=config.itemNum)return false;var getItemsCallback={success:getItemsSuccess,failure:getItemsFailure,argument:[]};if(!config.getDataUrl)return false;canGetData=false;loadDataForm.startIndex.value=loadedItemNum;GASGOO.util.Connect.setForm(loadDataForm.id);var request=GASGOO.util.Connect.asyncRequest('POST',config.getDataUrl,getItemsCallback);};var getItemsSuccess=function(o){if(o.responseText!==undefined){itemContainer.innerHTML+=o.responseText;loadedItemNum=YUD.getElementsByClassName(config.itemClassName,'*',itemContainer).length;}
canGetData=true;};var getItemsFailure=function(o){if(o.responseText!==undefined){}
canGetData=true;};}


if(!AE.widget.overShow){AE.widget.overShow=function(){var oComponent=this;var oDefConfig={targetId:"overShowTargetId",contentId:"overShowContentId",showDelayTime:200,hiddenDelayTime:200,excursion:[0,0]};var config;var isInited=false;var dTarget,dContent;var delayTimer=false;var canClose=true,contentShowed=false;oComponent.afterShow=new GASGOO.util.CustomEvent("afterShow",oComponent);oComponent.init=function(oConfig){if(isInited)return false;config=AE.cpAttribute(oConfig,oDefConfig);dTarget=get(config.targetId);dContent=get(config.contentId);YUE.on(dTarget,"mouseover",oComponent.showDelay);YUE.on(dContent,"mouseover",oComponent.showDelay);YUE.on(dTarget,"mouseout",oComponent.hiddenDelay);YUE.on(dContent,"mouseout",oComponent.hiddenDelay);YUE.on(dTarget,"mouseover",function(){canClose=false;});YUE.on(dContent,"mouseover",function(){canClose=false;});YUE.on(dTarget,"mouseout",function(){canClose=true;});YUE.on(dContent,"mouseout",function(){canClose=true;});}
oComponent.showDelay=function(e){if(delayTimer){clearTimeout(delayTimer);}
delayTimer=setTimeout(oComponent.showDirectly,config.showDelayTime);}
oComponent.showDirectly=function(){if(contentShowed){return;}
var xy=YUD.getXY(dTarget);xy[0]+=config.excursion[0];xy[1]+=config.excursion[1];dContent.style.display='';YUD.setXY(dContent,xy);YUD.setStyle(dContent,'opacity',1);oComponent.afterShow.fire();contentShowed=true;}
oComponent.hiddenDelay=function(e){YUE.stopEvent(e);if(delayTimer){clearTimeout(delayTimer);}
delayTimer=setTimeout(oComponent.hiddenDirectly,config.hiddenDelayTime);}
oComponent.hiddenDirectly=function(){if(!canClose){return false;}
dContent.style.display="none";contentShowed=false;}}}

if(!AE.widget.clickShow){AE.widget.clickShow=function(){var _self=this;var defConfig={targetId:"clickShowTargetId",switchId:"",contentId:"clickShowContentId",showOrHidden:true,needMask:false,needXY:true,excursion:[0,0],onInit:function(){},unInit:function(){},onShow:function(){},unShow:function(){},onHidden:function(){},unHidden:function(){}};var config;var isInited=false;var dTarget,dContent,dSwitch,iframeMask;var canClose=true;_self.init=function(oConfig){if(isInited)return false;config=TB.applyIf(oConfig||{},defConfig);config.onInit.apply(_self);dTarget=get(config.targetId);dContent=get(config.contentId);dSwitch=(config.switchId==""?dTarget:get(config.switchId));if(!dSwitch)
return;YUE.on(dTarget,"click",_self.showDirectly);YUE.on(document.body,"click",_self.hiddenDirectly);YUE.on(dSwitch,"mouseover",function(){canClose=false;});YUE.on(dContent,"mouseover",function(){canClose=false;});YUE.on(dSwitch,"mouseout",function(){canClose=true;});YUE.on(dContent,"mouseout",function(){canClose=true;});if(config.needMask){iframeMask=document.createElement("iframe");iframeMask.className="maskIframe";iframeMask.style.display="none";iframeMask.style.zIndex=dContent.style.zIndex-1;iframeMask.style.top="0px";iframeMask.style.left="0px";iframeMask.frameBorder=0;dContent.parentNode.appendChild(iframeMask);}
config.unInit.apply(_self);};_self.showDirectly=function(){config.onShow.apply(_self);if(config.showOrHidden&&dContent.style.display!="none"){canClose=false;_self.hiddenDirectly(null,true);return;}
if(config.needXY){var xy=YUD.getXY(dTarget);parsePos(config.excursion);xy[0]+=config.excursion[0];xy[1]+=config.excursion[1];dContent.style.display="";YUD.setXY(dContent,xy);}else{dContent.style.display="";}
YUD.setStyle(dContent,'0pacity',1);if(config.needMask){iframeMask.style.display="";iframeMask.style.width=dContent.offsetWidth+"px";iframeMask.style.height=dContent.offsetHeight+"px";if(config.needXY){YUD.setXY(iframeMask,xy);}
iframeMask.style.visibility="visible";}
config.unShow.apply(_self);};_self.hiddenDirectly=function(ev,force){config.onHidden.apply(_self);if(canClose||force){dContent.style.display="none";if(config.needMask){iframeMask.style.display="none";}
config.unHidden.apply(_self);}};_self.getConfig=function(){return config;};var parsePos=function(aPos){if(typeof(aPos[0])=="string"){switch(aPos[0]){case'center':aPos[0]=paseInt(dTarget.offsetWidth/2);break;case'right':aPos[0]=dSwitch.offsetWidth;break;default:aPos[0]=0;}}
if(typeof(aPos[1])=="string"){switch(aPos[1]){case'center':aPos[1]=paseInt(dTarget.offsetHeight/2);break;case'bottom':aPos[1]=dTarget.offsetHeight;break;default:aPos[1]=0;}}
return aPos;};};}
