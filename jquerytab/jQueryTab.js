/*
Author: Dharma Poudel (@rogercomred)
Description: A jquery tab plugin.
Version: 2.0
License:  GPLv3 ( http://www.gnu.org/licenses/gpl-3.0.html )
*/

;(function($, window, document, undefined){
var jQueryTab = {
	init:function(opts){
		var self = this;							// cache this into self
		self.opts = opts;
		self.opts.initialTab -= 1;																	// subtract 1 from initialTab; count starts at 1 not 0
		self.opts.tabClass = '.' + self.opts.tabClass;							// add '.' before tabClass
		self.opts.contentClass = '.' + self.opts.contentClass;	// add '.' before contentClass
		
		self.getactivetab();    		// get the tab to open initially
        self.reorder($(self.opts.contentClass), $(self.opts.contentClass).eq(self.currentTab));
		$(self.opts.tabClass).find("li") .eq(self.currentTab).addClass(self.opts.activeClass);				//activate last active tab or specified tab or default tab
        (self.opts.useCookie) ? self.setCookie.call(self, self.currentTab) : '';	
        
        if (self.opts.responsiveBelow < $(window).width()) {
            $('.tab_content_wrap').height($(self.opts.contentClass).eq(self.currentTab).height());
            $(self.opts.contentClass).not($(self.opts.contentClass).eq(self.currentTab)).addClass(self.opts.tabOutTransition);
            $(self.opts.contentClass).eq(self.currentTab).addClass(self.opts.tabInTransition);
        }else{
            $(self.opts.contentClass).hide().eq(self.currentTab).fadeIn(self.opts.inanimationtime);			// show corresponding tab content
        }
         //.eq(self.currentTab).fadeIn(self.opts.inanimationtime);			// show corresponding tab content
		$(self.opts.tabClass) .on((self.opts.openOnhover)?'click.jqeryTab, mouseenter.jqeryTab' :'click.jqeryTab' , "a", function(){										// when tab is clicked
			(typeof self.opts.before === 'function') ? self.opts.before.apply( this, arguments ) : '';		// call fxn before
			self.handleEvent.call(this, self);															// call handleEvent fxn; self.opts - data values
			(typeof self.opts.after === 'function') ? self.opts.after.apply( this, arguments ) : '';		// call fxn after
			return false;																					// prevent default behaviour
		});
		if(self.opts.responsive){																			// if accordion is enabled
			self.addHeader.call(this);																		// call fxn to add accordian headers dynamically
			$('body').on((self.opts.openOnhover)? 'click.jqeryTab, hover.jqeryTab' :'click.jqeryTab', '.' + self.opts.headerClass, function(){						// when accordain header is clicked
				(typeof self.opts.before === 'function') ? self.opts.before.apply( this, arguments ) : '';	// call fxn before
				self.handleEventResponsive.call(this, self);											// call fxn to handle accordions
				(typeof self.opts.after === 'function') ? self.opts.after.apply( this, arguments ) : '';	// call fxn after
				return false;																				// prevent default behaviour
			});
		}
	},
    reorder: function($all, $ontop){
        $ontop.css('zIndex', $all.length+1);
        $all.not($ontop).each(function(i){
            $(this).css('zIndex', $all.length-i);
        });
    },
	getactivetab: function(tab){
		var self = this;																					// cache this into self
		if(typeof tab ==='number'){  self.currentTab = tab-1;  return; }			// if tab specified set it to currentTab
		
        self.currentTab =(self.opts.useCookie)																// if remember last active tab is set to true
			? (self.getCookie(self.opts.cookieName)															// if $.cookie plugin is present & cookie is set
					? self.getCookie(self.opts.cookieName)													// 	set to  the value from cookie
					: self.opts.initialTab)																// 		else set to specified tab or default open tab
			: self.opts.initialTab;	
        
        if(window.location.hash) {
           var indexOfHash = $(self.opts.tabClass + ' a').index($('[href='+window.location.hash+']'));
           if(indexOfHash !== -1){
                self.currentTab = indexOfHash;
           }
           //window.location.hash ='';
        }
    },
	handleEvent: function(obj){
		var self = obj;
		if($(this).parent().hasClass(self.opts.activeClass)) return;												// do nothing when active tab is clicked
		var $index = $(this).parent().index();																	// get the index of current tab
		$(self.opts.tabClass).find("li").removeClass(self.opts.activeClass)											// remove active class from all tabs
								.eq($index).addClass(self.opts.activeClass);										// add active class to this tab
		$('.tab_content_wrap').height($(self.opts.contentClass).eq($index).height());
        self.reorder($(self.opts.contentClass),$(self.opts.contentClass).eq($index));
        (self.opts.responsive)																					// if accordion is enabled on smaller screens
			? $('.'+self.opts.headerClass).removeClass(self.opts.activeClass)											// remove class from all accordain headers
				.eq($index).addClass(self.opts.activeClass) : '';												// add class to corresponding accordian header
		
        $(self.opts.contentClass).removeClass(self.opts.tabInTransition).not($(self.opts.contentClass).eq($index)).addClass(self.opts.tabOutTransition);  
        $(self.opts.contentClass).eq($index).removeClass(self.opts.tabOutTransition).addClass(self.opts.tabInTransition);
        
        (self.opts.useCookie) ? self.setCookie.call(self, $index) : '';										//if useCookie is true save the current tab index to cookie
	},
	handleEventResponsive: function(obj){
		var self = obj;
		$index = Math.floor(($(this).next().index() -1)/2 );											// get the index of current accordion
		if(($(this).hasClass(self.opts.activeClass)) && !self.opts.collapsible) return;								// if active and not collapsible - do nothing
		else if(($(this).hasClass(self.opts.activeClass)) && self.opts.collapsible){									// if active and collapsible
			$('.'+self.opts.headerClass).removeClass(self.opts.activeClass);											// 		remove active class from all accordian headers
			$(self.opts.tabClass).find("li").removeClass(self.opts.activeClass);										// 		remove active class from all tabs
			(self.opts.accordionTransition ==='slide')												// if animation is slide
				? $(self.opts.contentClass +':visible').slideUp(self.opts.accordionOuttime)				// 		slide up the visible content in specified time
				: $(self.opts.contentClass +':visible').hide(self.opts.accordionOuttime);				// else hide the visible content in specified time 
			(self.opts.useCookie) ? self.setCookie.call(self, null) : '';										// 		delete the cookie
		}else{
			$('.'+self.opts.headerClass) .addClass(self.opts.activeClass)												// add active class to all accordian headers
							.not($(this)).removeClass(self.opts.activeClass);									// remove active class from all headers except this
			$(self.opts.tabClass).find("li").removeClass(self.opts.activeClass)										// remove active class from other tabs
									.eq($index).addClass(self.opts.activeClass);									// add active class to the corresponding tab
			(self.opts.accordionTransition ==='slide')												// if the transition is slide
				? $(self.opts.contentClass).slideUp(self.opts.accordionOuttime)							// 		slide up the visible content
										.eq($index).slideDown(self.opts.accordionIntime)				// 		slide down corresponding tab content
				: $(self.opts.contentClass).hide(self.opts.accordionOuttime)								// else hide the visible content in specified time
										.eq($index).show(self.opts.accordionIntime);					// 		show the corresponding tab content
			(self.opts.useCookie) ? self.setCookie.call(self, $index) : '';										// if useCookie is true	save the current tab index to cookie	
		}								
	},
	addHeader: function(){
		var self = this;																					// cache current object into self
		$('.'+self.opts.headerClass).remove();																// remove all existing headers
		$(self.opts.tabClass).find("a").each(function(){													// iterate for each  tabs
			var $tab_content = $(self.opts.contentClass).eq($(this).parent().index());						// get corresponding tab content
			$('<a />').attr({																				// create a element with jquery
							'class': ($(this).parent().hasClass('active'))									// if this tab is active
										? self.opts.headerClass + ' active'									// add active class along with headerClass 
											: self.opts.headerClass,										// else add only headerClass
							'href' : '#'+$tab_content.attr('id')											// set href attribute of header - works as named anchor
							})
					.text($(this).text())																	// add text to the accordian header
					.insertBefore($tab_content);															// insert just before tab content
		});
	},
	setCookie: function(value){
		var self = this, expires, date, path, domain, secure;
		if (value === null) {
			value = '';
			date = new Date();
			date.setTime(date.getTime() + ((-1)*24*60*60*1000));
		}
		else if(typeof self.opts.cookieExpires == 'number'){
			date = new Date();
			date.setTime(date.getTime() + (self.opts.cookieExpires*24*60*60*1000));
		} else if( self.opts.cookieExpires.toUTCString){
			date = self.opts.cookieExpires;
		}
		expires = '; expires=' + date.toUTCString(); 
		path = self.opts.cookiePath ? '; path=' + (self.opts.cookiePath) : '';
		domain = self.opts.cookieDomain ? '; domain=' + (self.opts.cookieDomain) : '';
		secure = self.opts.cookieSecure ? '; secure' : '';
		document.cookie = ''.concat(self.opts.cookieName, '=', encodeURIComponent(value), expires, path, domain, secure);
	},
	getCookie: function(name){
		var name = name + "=";
		if (document.cookie && document.cookie != '') {
			var cookieArray = document.cookie.split(";");
			for(var i=0; i < cookieArray.length; i++){
				var cookie = jQuery.trim(cookieArray[i]);
		if(cookie.indexOf(name)==0) 
					return decodeURIComponent(cookie.substring(name.length, cookie.length));
			}
		}
		return null;
	},
	isvisible: function(elem){
		return !elem.is(':hidden');																			// return true if element is visible
	},
	openTab: function(tab){
		var self = this,																					// cache current object into self
				elem = $(self.opts.tabClass).find('a').eq(tab-1),												// get a reference to the tab
				relem = $('.'+self.opts.headerClass).eq(tab-1);													// get a reference to the accordion
		self.getactivetab(tab);																				// get the active tab value
		if(self.isvisible(elem)){																			// if tab is visible
			(typeof self.opts.before === 'function') ? self.opts.before.apply( elem, arguments ) : '';		// call fxn before 
				self.handleEvent.call(elem, self);														// call fxn to handle tabs
			(typeof self.opts.after === 'function') ? self.opts.after.apply( elem, arguments ) : '';		// call fxn before
		}else if(self.isvisible(relem) && self.opts.responsive){																		
			(typeof self.opts.before === 'function') ? self.opts.before.apply( relem, arguments ) : '';		// call fxn before 
				self.handleEventResponsive.call(relem, self);											// else call fxn to handle accordions
			(typeof self.opts.after === 'function') ? self.opts.after.apply( relem, arguments ) : '';
		}
	}
};

$.jQueryTab = 	function(opts){
	var JT = Object.create(jQueryTab);			// create instance of jQueryTab object
	
    var opts = $.extend (true, {}, $.jQueryTab.defaults, opts );	// merge two objects into an empty objects, preserving both
	console.log(JT);
    JT.init(opts);								// call the init fxn
	$(opts.tabClass).data('jQueryTab', JT);	// Store a reference to the jQueryTab object
};

$.jQueryTab.defaults = {
	responsive:true,				// enable accordian on smaller screens
    responsiveBelow:600,
	collapsible:false,				// allow all tabs to collapse on accordians
	useCookie: true,				// remember last active tab using cookie
	openOnhover: false,				// open tab on hover
	initialTab: 1,					// tab to open initially; start count at 1 not 0

	cookieName: 'active-tab',		// name of the cookie set to remember last active tab
	cookieExpires: 365,				// when it expires in days or standard UTC time
	cookiePath: '',					// path on which cookie is accessible
	cookieDomain:'',				// domain of the cookie
	cookieSecure: false,			// enable secure cookie - requires https connection to transfer

	tabClass:'tabs',				// class of the tabs
	headerClass:'accordion_tabs',	// class of the header of accordion on smaller screens
	contentClass:'tab_content',		// class of container
	activeClass:'active',			// name of the class used for active tab

	//tabTransition: 'fade',			// transitions to use - normal or fade
	tabInTransition: 'fadeIn',
	tabOutTransition: 'fadeOut',
    tabIntime:500,					// time for animation IN (1000 = 1s)
	tabOuttime:0,					// time for animation OUT (1000 = 1s)

	accordionTransition: 'slide',	// transitions to use - normal or slide
	accordionIntime:500,			// time for animation IN (1000 = 1s)
	accordionOuttime:400,			// time for animation OUT (1000 = 1s)

	before: function(){},			// function to call before tab is opened
	after: function(){}				// function to call after tab is opened
};
})(jQuery, window, document);