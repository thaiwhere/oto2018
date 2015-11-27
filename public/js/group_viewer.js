/**
	require base.js
 */
AE.widget.groupViewer = (function() {
	var YUD = YAHOO.util.Dom, YUE = YAHOO.util.Event ;
	var currentHook, dropTimeId, dropTimeout=300, dropHeight=false;
	var canClose,classAllTimer,config;
	var aItem;
	var oDefConfig={
		dropHeight:false,
		dropTimeout:300,
		panelId:"BraPanel",
		tabClass:"groupViewerTab",
		contentClass:"groupViewerContent",
		plusClass:"groupViewerMouseHover"
		};
	var dropAnim = function(panel) {
		YUD.setStyle(panel, 'height', 0);
		YUD.setStyle(panel, 'display', 'block');
		var content = YUD.getElementsByClassName(config.contentClass,'div',panel)[0];
		var anim = new YAHOO.util.Anim(panel, { height: {from: 0, to: panel.dropHeight} }, 0.3);
		anim.onStart.subscribe(function() {
		YUD.setStyle(content, 'display', 'none');
		})				
		anim.onComplete.subscribe(function() {
		YUD.setStyle(content, 'display', '');
		});
		anim.animate();
	};
	
	var closeAllDelay = function(){
		clearTimeout(classAllTimer);
		classAllTimer = setTimeout(closeAll,200);
		}
var closeAll = function(){
	if(!canClose){return;}
	cancelDrop();
	var bp = YUD.get(config.panelId);
	if(currentHook){
	var cp = currentHook;
	var curRel = YUD.get(currentHook.getAttribute('rel'));
	var drawAnim = new YAHOO.util.Anim(curRel, { height: { to: 0} }, 0.2);
	var content = YUD.getElementsByClassName(config.contentClass,'div',curRel)[0];
	drawAnim.onStart.subscribe(function() {
					YUD.setStyle(content, 'display', 'none');
				});
	
	drawAnim.onComplete.subscribe(function() {
					YUD.removeClass(aItem, config.plusClass);
					YUD.setStyle(curRel, 'display', 'none');
					YUD.setStyle(curRel, 'height', '0px');
					YUD.setStyle(content, 'display', '');
					currentHook =null;
				});
				
	drawAnim.animate();
}
	}
	
	
	var drop = function() {
		var rel = YUD.get(this.getAttribute('rel'));
		YUD.addClass(this,config.plusClass);
		if (currentHook) {
			
			var curRel = YUD.get(currentHook.getAttribute('rel'));
			var cpContent =  YUD.getElementsByClassName(config.contentClass,'div',curRel)[0];
			var rel = YUD.get(this.getAttribute('rel'));
			
			//alert(relContent.offsetHeight);
			if (this.parentNode.parentNode != currentHook.parentNode.parentNode) {
				var hiddenAnim = new YAHOO.util.Anim(curRel, { height: { to: 0} }, 0.15);
				var cp = currentHook;
				
				hiddenAnim.onStart.subscribe(function() {
					YUD.setStyle(cpContent, 'display', 'none');
				});
				hiddenAnim.onComplete.subscribe(function() {
					YUD.setStyle(cpContent, 'display', '');
					YUD.removeClass(cp, config.plusClass);
					YUD.setStyle(curRel, 'display', 'none');
					YUD.setStyle(curRel, 'height', curRel.dropHeight + 'px');
				});
				hiddenAnim.animate();
				YUD.addClass(this, config.plusClass);
				dropAnim(rel);
			} else {
				YUD.removeClass(currentHook, config.plusClass);
				YUD.addClass(this, config.plusClass);
				YUD.setStyle(curRel, 'display', 'none');
				YUD.setStyle(rel, 'display', 'block');
				YUD.setStyle(rel, 'height',rel.dropHeight+'px');
	
			}
		} else {
			YUD.addClass(this, config.plusClass);

			dropAnim(rel);
		}
		currentHook = this;
	}
	var delayDrop = function() {
		cancelDrop();
		var hook = this;
		dropTimeId = setTimeout(function() {
			drop.call(hook);
		}, dropTimeout); 
	}
	var cancelDrop = function() {
	clearTimeout(dropTimeId);	
	}
	return {
		init: function(oConfig) {
			config  = TB.applyIf(oConfig||{}, oDefConfig);
			dropHeight = config.dropHeight;
			var bp = YUD.get(config.panelId);
			try {
				currentHook = YUD.getElementsByClassName(config.plusClass, '*', bp)[0];
				if (currentHook) {
					rel = YUD.get(currentHook.getAttribute('rel'));
					//YUD.setStyle(rel, 'display', 'block');
					
				}						
			} catch (e){}
			aItem = YUD.getElementsByClassName(config.tabClass,'*',bp);
			for (var i = 0; i < aItem.length; i++) {
				var itemContent = YUD.getElementsByClassName(config.contentClass,'div',get(aItem[i].getAttribute('rel')))[0];
				itemContent.parentNode.style.display='';
				get(aItem[i].getAttribute('rel')).dropHeight = (config.dropHeight)?config.dropHeight : itemContent.offsetHeight;
				itemContent.parentNode.style.display='none';
				
				YUE.on(aItem[i], 'mouseover', delayDrop);
				YUE.on(aItem[i], 'mouseout', cancelDrop);
			}
			YUE.on(bp,"mouseout",closeAllDelay);
			YUE.on(bp,"mouseover",function(){canClose = false;});
			YUE.on(bp,"mouseout",function(){canClose = true;});
		}
	};
})();
