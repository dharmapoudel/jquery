/* smooth scrolling */
//HTML:
/* <ul class="top-nav">
<li><a href="#section1"></a></li>
<li><a href="#section2"></a></li>
</ul> */

//jQuery
$('.top-nav li a').on('click', function(){
	$('html, body').animate(
		{ scrollTop: $(this).attr('href').offset().top + "px" },
		{ 	
			duration: 500,
			easing: "swing";
		}
	);
	return false;
});

/* resize images using jquery */
$(window).bind('load', function(){
	$('.product_images img').each(function(){
		var maxWidth = 120,
			maxHeight = 120,
			ratio = 0,
			width = $(this).width(),
			height = $(this).height();
		if(width > maxWidth){
			ratio = maxWidth / width;
			$(this).css({
				'width': maxWidth,
				'height': height * ratio
			});
		}
		if(height > maxHeight){
			ratio = maxHeight / height;
			$(this).css({
				'height': maxHeight,
				'width': width * ratio
			});
		}
	});
});

/* equalize height of elements */
$.fn.equalHeight = function(){
		this.each(function(){
			var maxHeight = 0;
			maxHeight =  Math.max(maxHeight, $(this).height());
		});
		$(this).css('height', maxHeight);
		return this;
}
// call this way
$('.different_height_divs').equalHeight();


/* replace png image with gif */
var imgs = document.getElementsByTagName('img');
for (var i=0; i < imgs.length; i++){
	if(imgs[i].src.match(/.*\.png$/){
		imgs[i].src = imgs[i].src.slice(0, -3) + "gif";
	}
}

/* IE6 png fix */
$('.pngfix').each(function(){
	$(this).attr('writing-mode', 'tb-rl');
	$(this).css('background-image', 'none');
	$(this).css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="path/to/image.png", sizingMethod = "scale")');
});

/* zebra striping with jQuery */
$('div').filter(':odd').addClass('odd').end().filter(':even').addClass('even');

/* make entire div clickable */
 //HTML
/*  <div class='clickable-block'>
	<p>This is just a  dummy text.</p>
	<a href="http://www.google.com" > click here to go to google</a>
 </div> */
 
 //jQuery
 $('.clickable-block').click(function(){
	window.location = $(this).find('a').attr('href');
	return false;
 });
 
 
/* simple tabs */
//HTML
/* 
<ul class="tabs">
	<li><a href="#section1"></a></li>
	<li><a href="#section2"></a></li>
</ul>
<div class="tab_content" id="section1"></div>
<div class="tab_content" id="section2"></div> */

//jQuery

$(".tabs li:first").addClass("active").fadeIn();	//Activate first tab
$(".tab_content").show().not(':first').hide();		//Hide all content

$(".tabs li a").click(function() {
	$index = $(this).parent().index();
	$(".tabs li").removeClass("active").eq($index).addClass("active");
	$(".tab_content").hide().eq($index).fadeIn();
	return false;
}); 

//disable “enter” key in forms
$("#form").keypress(function(e) {
  if (e.which == 13) {
    return false;
  }
});

//enable disable form elements
$("#submit-button").attr("disabled", true);
$("#submit-button").removeAttr("disabled");


//Auto-populating select boxes using Ajax & JSON
$("select#ctlJob").change(function(){
    $.getJSON("/select.php",{id: $(this).val(), ajax: 'true'}, function(j){
      var options = '';
      for (var i = 0; i < j.length; i++) {
        options += '<option value="' + j[i].optionValue + '">' + j[i].optionDisplay + '</option>';
      }
      $("select#ctlPerson").html(options);
    })
  })
  
  /* nepal time */
  // JavaScript Document
var numbered;
function convert(numbered){
   if(numbered < 10){
	  	numbered = '0'+numbered;
   }
	var nepaliNumber = numbered.toString();
	var nepalidate = new Array('&#2406','&#2407','&#2408','&#2409','&#2410','&#2411','&#2412','&#2413','&#2414','&#2415');
	return nepalidate[nepaliNumber.substring(0,1)]+nepalidate[nepaliNumber.substring(1,2)];
}
function getAnalog(hours){
     if (hours >= 12)  {  
		if (hours ==12){ hours = 12;}
		else { hours = hours-12;}  
	 } else if(hours < 12) {  
	 	if (hours ==0){  hours=12; }
	 } 
  return hours; 
}
var currenttime = 'September 11, 2013 12:14:52'; 
var serverdate = new Date(currenttime);
function displaytime(){
	serverdate.setSeconds(serverdate.getSeconds()+1);
	var timestring=convert(getAnalog((serverdate.getHours()>12)?serverdate.getHours()-12:serverdate.getHours()))+" : "+convert(serverdate.getMinutes())+" : "+convert(serverdate.getSeconds());
	
	var times = '&#2350;&#2343;&#2381;&#2351;&#2366;&#2344;&#2381;&#2361;';
	document.getElementById("servertime").innerHTML=timestring +" "+ times;

}
/* function reload(){
 if(serverdate.getHours() == '12' && serverdate.getMinutes() == '00' && serverdate.getSeconds() == '00'){
  return window.location.reload();
 } 
} */
window.onload=function(){ 
  setInterval("displaytime()", 1000); 
  //setInterval("reload()", 1000);
}
  /* select all script */

function SelectAll(textboxID) { 
	var txtbox = document.getElementById(textboxID);
	if(txtbox == null)return;
	if(txtbox.createTextRange){  /*.IE*/
		t = txtbox.createTextRange();
		if(t.select)
			t.select();
		/*
		if(t.execCommand)
			t.execCommand('copy');
		*/    
	}
	if(txtbox.setSelectionRange){ /*.Mozilla*/
		txtbox.setSelectionRange(0,txtbox.value.length);
	}
	else if(txtbox.createTextRange){ /*.Opera 8*/
		var r = txtbox.createTextRange();
		r.select();
	}
	if(txtbox.focus)
		txtbox.focus();			
	return false;		
}     
 