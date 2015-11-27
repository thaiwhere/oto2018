city_id=0;
salon_type=0;
function city_filter(c_id)
{	 
	for(var i=0; i<hlink_ids.length; i++) {
		$("#c_"+hlink_ids[i]).removeAttr("style");
	}
	$("#c_"+c_id).attr("style","background:#005CC6;color:#FFFFFF;");
	
	
	city_id=c_id;
	salon_filter();
	
}
function type_filter(s_type)
{	 
	$("#salon_0").removeAttr("style");
	$("#salon_10").removeAttr("style");
	$("#salon_11").removeAttr("style");
	$("#salon_12").removeAttr("style");
	$("#salon_20").removeAttr("style");
	if(s_type >0 && s_type <20)
	{
		$("#salon_10").attr("style","background:#005CC6;color:#FFFFFF;");
		
		$("#sub_type").show();
	}else
	{
		$("#sub_type").hide();
	}
	$("#salon_"+s_type).attr("style","background:#005CC6;color:#FFFFFF;");
	
	
	salon_type=s_type;
	
	salon_filter();
	
}

function salon_filter()
{	 
	
	str="";
	index_=0;
	if(city_id>0 || salon_type >0)
	{
		$("#nsl_t").html("");
		for(i=1;i<=num_nsl;i++)
		{
			filterSalon=false;
			str=str+"-"+ $("#nsl_"+i).attr("city");
			
			if(city_id>0)
			{
				if($("#nsl_"+i).attr("city")==city_id )		
				{
					if(salon_type>0)
					{
						
						if(salon_type==10)
						{
							if($("#nsl_"+i).attr("stype")==11 || $("#nsl_"+i).attr("stype")==12 )
							{
								filterSalon=true;
							}
						}else
						{
							if($("#nsl_"+i).attr("stype")==salon_type)
							{
								filterSalon=true;
							}
						}
						
					}else
					{
						filterSalon=true;
					}
				}
				
			}else
			{
				if(salon_type>0)
					{
						if(salon_type==10)
						{
							if($("#nsl_"+i).attr("stype")==11 || $("#nsl_"+i).attr("stype")==12 )
							{
								filterSalon=true;
							}
						}else
						{
							if($("#nsl_"+i).attr("stype")==salon_type)
							{
								filterSalon=true;
							}
						}
					}
			}
			if(filterSalon==true)
			{
				index_++;
				if(index_ % 4 ==0 )
				{
					
					$("#nsl_t").append($("#nsl_"+i).clone().addClass('last_col'));
				}else
				{
					$("#nsl_t").append($("#nsl_"+i).clone().removeClass('last_col'));
				}
				
			}
			
		}
		$("#n_salon").hide();
		$("#nsl_t").show();
	}else
	{
		$("#n_salon").show();
		$("#nsl_t").hide();
	}	
	 
     $("img.lazy").lazyload();


	
}



$('#list_salon_content .salon_item').each(function(index) {  
	try
		  {
		 eval("t_"+$(this).attr("city")+"++;");
		  }
		catch(err)
		  {
		  //Handle errors here
		  }
	
  });
  

t_0=0;
for(var i=1; i<hlink_ids.length; i++) {
		try
		  {
		 eval("t_0=t_0 + t_"+hlink_ids[i]);
		$("#c_"+hlink_ids[i]).append(" ("+eval("t_"+hlink_ids[i])+")");
		  }
		catch(err)
		  {
		  //Handle errors here
		  }
		
	}
	$("#c_0").append(" ("+t_0+")");
	