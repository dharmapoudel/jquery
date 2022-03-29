jQuery(document).ready(function($) {

var slides = $('ul.slideset li');
var switchers = $('ul.switcher li');
var slidesCount = slides.length;

switchers.first().addClass('active');

function slide(target) {
    slides.removeClass('active').eq(target).addClass('active');
    switchers.removeClass('active').eq(target).addClass('active');
}

switchers.on('mouseenter',function() {
    if ( !$(this).hasClass('active') ) {
        slide($(this).index());
        resetTimer();
    }
});

$('.btn-next').click(function() {
    slide(getTarget());
    resetTimer();
});
$('.btn-prev').click(function() {
    slide(getTarget(-1));
    resetTimer();
});

function getTarget(dir){
	var ind = $('ul.switcher li.active').index();
	//console.log(ind +(dir||1));
	return  (ind +(dir||1)) % slidesCount;
}

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function() { slide(getTarget()); },3000);
}

var timer = setInterval(function() { slide(getTarget()); },3000);

});
// end ready function here.

