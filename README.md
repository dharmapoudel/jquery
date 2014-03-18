jQueryTab
=========
jQueryTab v2 is here with unlimited  css3 transitions. Try out the few transitions already crafted for you. 
Want more? Make your own and go crazy!

Tags: jQuery tabs, responsive tabs, tabbed content, tabbed, CSS3 tabs	
Version: 2.0	
License: GPLv3	
Contributors: dharmapoudel	


###Description

jQueryTab is yet another simple, responsive, lightweight jQuery tabs plugin for creating responsive tabbed panels with unlimited options and transition animations support.

###Features

* Responsive: Automatically coverts the tabs into accordion interface in smaller devices like iPad, iPhone, etc.
* Cookie: Remembers last active tab using cookie.
* Tabs Transitions: fade,  slideUp, slideRight, flip, rotate, swingRight, scaleDown, scaleUp, etc. Create your own, the sky is the limit.
* Accordion Transitions: normal and slide.
* Collapsible: Ability to collapse all accordions on smaller devices.
* Initial Tab : Choose which tab to display initially.
* URL Hash : Open tabs by passing hash on url.
* Callback Functions: Provides two callback functions before and after.
* Events: Switch between hover and click events.
* No Javascript : Javascript disabled? No problem.



###How to use it: 

1. Include jQuery javascript library in the web page. 
	```html
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```

2. Include jQueryTab.css, animation.css and jQueryTab.js in the page.
	```html
    <link rel="stylesheet" href="jQueryTab.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="animation.css" type="text/css" media="screen" />
    <script src="js/jQueryTab.js"></script>
```

3. Follow the html structure below to build your tabbed panels. 
	```html
<div class="tabs-1">
	<ul class="tabs">
		<li><a href="#tab1">General</a></li>
		<li><a href="#tab2">Social Media</a></li>
		<li><a href="#tab-copyright">Copyright</a></li>
		<li><a href="#tab4">Contact</a></li>
	</ul>
	<section class="tab_content_wrapper">
	        <article class="tab_content" id="tab1">
	            <p>General calidis mundum caligine coeperunt. </p>
	        </article>
	        <article class="tab_content" id="tab2">
	            <p>Social Media conversa egens spectent tum sed diremit haec. </p>
	        </article>
	        <article class="tab_content" id="tab-copyright">
	            <p>Copyright eurus supplex undae fulgura congestaque locis.</p>
	        </article>
	        <article class="tab_content" id="tab4">
	            <p>Contact erat pugnabant diffundi pondere temperiemque. </p>
	        </article>
    </section>
</div>
```
	
4. Call the plugin with options.
	```javascript
	$('.tabs-1').jQueryTab({
    
			//classes settings
	        tabClass:'tabs',				// class of the tabs
	        accordionClass:'accordion_tabs',	        // class of the header of accordion on smaller screens
	        contentWrapperClass:'tab_content_wrapper',	// class of content wrapper
	        contentClass:'tab_content',			// class of container
	        activeClass:'active',				// name of the class used for active tab
	
	        //feature settings
	        responsive:true,				// enable accordian on smaller screens
	        responsiveBelow:600				// the breakpoint
	        collapsible:true,				// allow all tabs to collapse on accordians
	        useCookie: true,				// remember last active tab using cookie
	        openOnhover: false,			   	// open tab on hover
	        initialTab: 1,					// tab to open initially; start count at 1 not 0
	        
	        //cookie settings
	        cookieName: 'active-tab',			// name of the cookie set to remember last active tab
	        cookieExpires: 365,				// when it expires in days or standard UTC time
	        cookiePath: '',					// path on which cookie is accessible
	        cookieDomain:'',				// domain of the cookie
	        cookieSecure: false,				// enable secure cookie - requires https connection to transfer
	        
	        //tabs transition settings      fade, flip, scaleUp, slideLeft, etc.
	        tabInTransition: 'fadeIn',      		// classname for showing in the tab content
	        tabOutTransition: 'fadeOut',    		// classname for hiding the tab content
	        
	        //accordion transition settings
	        accordionTransition: 'slide',			// transitions to use - normal or slide
	        accordionIntime:500,				// time for animation IN (1000 = 1s)
	        accordionOutTime:400,				// time for animation OUT (1000 = 1s)
	        
	        //api functions
	        before: function(){},				// function to call before tab is opened
	        after: function(){}				// function to call after tab is opened
    
	});
```

###Creating your own classes

* Create class for tab in transition.
```css
    .swingRightIn {
        -webkit-transform: rotate(0);
        -moz-transform: rotate(0);
        -ms-transform: rotate(0);
        -o-transform: rotate(0);
        transform: rotate(0);
        -webkit-transform-origin: top center;
        -moz-transform-origin: top center;
        -ms-transform-origin: top center;
        transform-origin: top center;
        opacity: 1;
        transition-delay: .3s;
    }
```
	
* Create class for tab out transition.
```css
    .swingRightOut {
        -webkit-transform-origin: top center;
        -moz-transform-origin: top center;
        -ms-transform-origin: top center;
        transform-origin: top center;
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        transform: rotate(-90deg);
        opacity: 0;
    }
```
	
* Initialize the jQueryTab plugin by passing these classes.
```javascript
    $('.tabs-1').jQueryTab({
        tabInTransition: 'swingRightIn',
        tabOutTransition: 'swingRightOut',
        cookieName: 'active-tab-1' 
    });
```

###Changelog###
= 2.0 =
* Added unlimited CSS3 animations and transitions support
* Several bug fixes and code rewrite
* Added ability to open tab based on url hash
* HTML Structure changed
* And many more, I forgot :)

= 1.4 =
* Several bug fixes and code optimization

= 1.0  =
* Initial Release