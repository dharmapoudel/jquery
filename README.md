jQueryTab
=========

Tags: jQuery tabs, responsive tabs, tabbed content, tabbed  
Version: 1.4  
License: GPLv3  
Contributors: dharmapoudel 

Yet another simple, responsive, lightweight jQuery tab plugin.

###Description

jQueryTab is yet another jQuery tabs plugin for creating responsive tabbed panels with unlimited options and transition animations support. 

###Features

Automatically coverts the tabs into accordion interface in smaller devices like iPad, iPhone, etc...
Remembers last active tab using cookie.
* tabs transitions: normal and fade.
* accordion transitions: normal and slide.



How to use it:

1. Include jQuery javascript library in the web page. 
	```html
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```

2. Include jQueryTab's css and js in the page. 
	```html
  <link rel="stylesheet" href="jQueryTab.css" type="text/css" media="screen" />
  <script src="js/jQueryTab.js"></script>
```

3. Follow the html structure below to build your tabbed panels. 
	```html
<section class="jquerytab_wrapper">
		<ul class="tabs">
			<li><a href="#tab1">Tab1</a></li>
			<li><a href="#tab2">Tab2</a></li>
			<li><a href="#tab3">Tab3</a></li>
			<li><a href="#tab4">Tab4</a></li>
		</ul>
		<article class="tab_content" id="tab1">
			<p> Tabbed Content 1</p>
		</article>
		<article class="tab_content" id="tab2">
			<p> Tabbed Content 2</p>
		</article>
		<article class="tab_content" id="tab3">
			<p> Tabbed Content 3</p>
		</article>
		<article class="tab_content" id="tab4">
			<p> Tabbed Content 4</p>
		</article>
</section>
```
	
4. Call the plugin with options.
	```javascript
	jQuery.jQueryTab({
		responsive:true, // enable accordian on smaller screens
		collapsible:true, // allow all accordions to collapse 
		useCookie: true, // remember last active tab using cookie
		openOnhover: false, // open tab on hover
		initialTab: 4, // tab to open initially; start count at 1 not 0
		 
		cookieName: 'active-tab', // name of the cookie set to remember last active tab
		cookieExpires: 4, // when it expires in days or standard UTC time
		cookiePath: '/', // path on which cookie is accessible
		cookieDomain:'', // domain of the cookie
		cookieSecure: false, // enable secure cookie - requires https connection to transfer
		 
		tabClass:'tabs', // class of the tabs
		headerClass:'accordion_tabs', // class of the header of accordion on smaller screens
		contentClass:'tab_content', // class of container
		activeClass:'active', // name of the class used for active tab
		 
		tabTransition: 'fade', // transitions to use - normal or fade
		tabIntime:500, // time for animation IN (1000 = 1s)
		tabOuttime:0, // time for animation OUT (1000 = 1s)
		 
		accordionTransition: 'slide', // transitions to use - normal or slide
		accordionIntime:500, // time for animation IN (1000 = 1s)
		accordionOuttime:400, // time for animation OUT (1000 = 1s)
		 
		before: function(){}, // function to call before tab is opened
		after: function(){}// function to call after tab is opened
	});
```
	

###Changelog###

= 1.4 =
* Several bug fixes and code optimization

= 1.0  =
* Initial Release