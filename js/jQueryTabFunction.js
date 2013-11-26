//tabs with jquery cookie
if( $.cookie("active-tab")!=null){	
	var lastActiveTab = $.cookie("active-tab"); 			//retrieve cookie value
	$(".tabs li").eq(lastActiveTab).addClass("active");		//activate last active tab
	$(".tab_content").hide().eq(lastActiveTab).fadeIn();	//show last active tab content
	
}else {		
	$(".tabs li:first").addClass("active").fadeIn();	//Activate first tab
	$(".tab_content").show().not(':first').hide();				//Hide all content
}

//On Click Event
$(".tabs li a").click(function() {
	$index = $(this).parent().index();									//get the index of current tab
	$(".tabs li").removeClass("active").eq($index).addClass("active");	//remove active class from other tabs
	$(".tab_content").hide().eq($index).fadeIn();						//show the corresponding tab content
	$.cookie("active-tab", $index, { expires: 1 });						//save the current tab index to cookie
	return false;
}); 