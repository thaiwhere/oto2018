var _ct = new Date();
$.get("ck.php"+'?t='+_ct.getTime(),{}, function(data){
				if(data.length >0) {				
					
					if(jQuery.trim(data)!="_12345")
					{
						$("#cookie_alert").html($("#cookie_content").html());
					}
					
				}
			});
			