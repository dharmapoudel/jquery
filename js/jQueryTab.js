// v 1.3
if(Object.create !=='function'){
	Object.create = function(obj){
		function F(){};
		F.prototype = obj;
		return new F();
	}
}
;(function($, window, document, undefined){
var jQueryTab = {
	init:function(opts){
			var self = this;																					// cache this into self 
			self.opts = $.extend ({}, $.jQueryTab.defaults, opts );												// merge two objects into an empty objects, preserving both
			
			self.opts.initialtab -= 1;																			// subtract 1 from initialtab; count starts at 1 not 0
			self.opts.tabclass = '.' + self.opts.tabclass;														// add '.' before tabclass
			self.opts.containerclass = '.' + self.opts.containerclass;											// add '.' before containerclass
			
			self.getactivetab(); 																				// get the tab to open initially
			$(self.opts.tabclass).find("li") .eq(self.currentTab).addClass(self.opts.activeclass);				//activate last active tab or specified tab or default tab
			$(self.opts.containerclass).hide().eq(self.currentTab).fadeIn(self.opts.inanimationtime);			// show corresponding tab content

			$(self.opts.tabclass) .on((self.opts.opentabonhover)?'click.jqeryTab, mouseenter.jqeryTab' :'click.jqeryTab' , "a", function(){										// when tab is clicked
				(typeof self.opts.before === 'function') ? self.opts.before.apply( this, arguments ) : '';		// call fxn before
				self.handleEvent.call(this, self);															// call handleEvent fxn; self.opts - data values
				(typeof self.opts.after === 'function') ? self.opts.after.apply( this, arguments ) : '';		// call fxn after
				return false;																					// prevent default behaviour
			});
			if(self.opts.responsive){																			// if accordion is enabled
				self.addHeader.call(this);																		// call fxn to add accordian headers dynamically
				$('body').on((self.opts.opentabonhover)? 'click.jqeryTab, hover.jqeryTab' :'click.jqeryTab', '.' + self.opts.headerclass, function(){						// when accordain header is clicked
					(typeof self.opts.before === 'function') ? self.opts.before.apply( this, arguments ) : '';	// call fxn before
					self.handleEventResponsive.call(this, self);											// call fxn to handle accordions
					(typeof self.opts.after === 'function') ? self.opts.after.apply( this, arguments ) : '';	// call fxn after
					return false;																				// prevent default behaviour
				});
			}
	},
	getactivetab: function(tab){
			var self = this;																					// cache this into self
			if(typeof tab ==='number'){  self.currentTab = tab-1;  return; }									// if tab specified set it to currentTab
			self.currentTab =(self.opts.usecookie)																// if remember last active tab is set to true
				? (self.getCookie(self.opts.cookie.name)															// 		if $.cookie plugin is present & cookie is set
						? self.getCookie(self.opts.cookie.name)														// 			set to  the value from cookie
						: self.opts.initialtab)																// 		else set to specified tab or default open tab
				: self.opts.initialtab;																			// else set to initial tab
	},
	handleEvent: function(opts){
			var self = opts;
			if($(this).parent().hasClass(self.opts.activeclass)) return;												// do nothing when active tab is clicked
			var $index = $(this).parent().index();																	// get the index of current tab
			$(self.opts.tabclass).find("li").removeClass(self.opts.activeclass)											// remove active class from all tabs
									.eq($index).addClass(self.opts.activeclass);										// add active class to this tab
			(self.opts.responsive)																					// if accordion is enabled on smaller screens
				? $('.'+self.opts.headerclass).removeClass(self.opts.activeclass)											// remove class from all accordain headers
					.eq($index).addClass(self.opts.activeclass) : '';												// add class to corresponding accordian header
			(self.opts.animation.tab.transition ==='fade')															// if transition is fade
				? $(self.opts.containerclass).fadeOut(self.opts.animation.tab.outtime)									// 		fade out the visible content in specified time
					.eq($index).fadeIn(self.opts.animation.tab.intime)												//		fade in the corresponding tab content 
				: $(self.opts.containerclass).hide(self.opts.animation.tab.outtime)										// else hide the visible content in specified time
									.eq($index).show(self.opts.animation.tab.intime);								// 		show the corresponding tab content
			(self.opts.usecookie) ? self.setCookie.call(self, $index) : '';										//if usecookie is true save the current tab index to cookie
	},
	handleEventResponsive: function(opts){
			var self = opts;
			$index = parseInt(($(this).next().index())/2 - 1, 10);												// get the index of current accordion
			if(($(this).hasClass(self.opts.activeclass)) && !self.opts.collapsible) return;								// if active and not collapsible - do nothing
			else if(($(this).hasClass(self.opts.activeclass)) && self.opts.collapsible){									// if active and collapsible
				$('.'+self.opts.headerclass).removeClass(self.opts.activeclass);											// 		remove active class from all accordian headers
				$(self.opts.tabclass).find("li").removeClass(self.opts.activeclass);										// 		remove active class from all tabs
				(self.opts.animation.accordion.transition ==='slide')												// if animation is slide
					? $(self.opts.containerclass +':visible').slideUp(self.opts.animation.accordion.outtime)				// 		slide up the visible content in specified time
					: $(self.opts.containerclass +':visible').hide(self.opts.animation.accordion.outtime);				// else hide the visible content in specified time 
				(self.opts.usecookie) ? self.setCookie.call(self, null) : '';										// 		delete the cookie
			}else{
				$('.'+self.opts.headerclass) .addClass(self.opts.activeclass)												// add active class to all accordian headers
								.not($(this)).removeClass(self.opts.activeclass);									// remove active class from all headers except this
				$(self.opts.tabclass).find("li").removeClass(self.opts.activeclass)										// remove active class from other tabs
										.eq($index).addClass(self.opts.activeclass);									// add active class to the corresponding tab
				(self.opts.animation.accordion.transition ==='slide')												// if the transition is slide
					? $(self.opts.containerclass).slideUp(self.opts.animation.accordion.outtime)							// 		slide up the visible content
											.eq($index).slideDown(self.opts.animation.accordion.intime)				// 		slide down corresponding tab content
					: $(self.opts.containerclass).hide(self.opts.animation.accordion.outtime)								// else hide the visible content in specified time
											.eq($index).show(self.opts.animation.accordion.intime);					// 		show the corresponding tab content
				(self.opts.usecookie) ? self.setCookie.call(self, $index) : '';										// if usecookie is true	save the current tab index to cookie	
			}								
	},
	addHeader: function(){
			var self = this;																					// cache current object into self
			$('.'+self.opts.headerclass).remove();																// remove all existing headers
			$(self.opts.tabclass).find("a").each(function(){													// iterate for each  tabs
				var $tab_content = $(self.opts.containerclass).eq($(this).parent().index());					// get corresponding tab content
				$('<a />').attr({																				// create a element with jquery
								'class': ($(this).parent().hasClass('active'))									// if this tab is active
											? self.opts.headerclass + ' active'									// add active class along with headerclass 
												: self.opts.headerclass,										// else add only headerclass
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
			else if(typeof self.opts.cookie.expires == 'number'){
				date = new Date();
				date.setTime(date.getTime() + (self.opts.cookie.expires*24*60*60*1000));
			} else if( self.opts.cookie.expires.toUTCString){
				date = self.opts.cookie.expires;
			}
			expires = '; expires=' + date.toUTCString(); 
			path = self.opts.cookie.path ? '; path=' + (self.opts.cookie.path) : '';
			domain = self.opts.cookie.domain ? '; domain=' + (self.opts.cookie.domain) : '';
			secure = self.opts.cookie.secure ? '; secure' : '';
			document.cookie = ''.concat(self.opts.cookie.name, '=', encodeURIComponent(value), expires, path, domain, secure);
	},
	getCookie: function(name){
		var name = name + "=";
		if (document.cookie && document.cookie != '') {
			var cookieArray = document.cookie.split(";");
			for(var i=0; i < cookieArray.length; i++){
				var cookie = jQuery.trim(cookieArray[i]);
                if(cookie.indexOf(name)==0) return decodeURIComponent(cookie.substring(name.length, cookie.length));
			}
		}
		return null;
	},
	isvisible: function(elem){
			return !elem.is(':hidden');																			// return true if element is visible
	},
	opentab: function(tab){
			var self = this,																					// cache current object into self
				elem = $(self.opts.tabclass).find('a').eq(tab-1),												// get a reference to the tab
				relem = $('.'+self.opts.headerclass).eq(tab-1);													// get a reference to the accordion
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
			var JT = Object.create(jQueryTab);																	// create instance of jQueryTab object
			JT.init(opts);																						// call the init fxn
			$('.'+opts.tabclass).data('jQueryTab', JT);															// Store a reference to the jQueryTab object
		};
$.jQueryTab.defaults = {
			responsive:true,																					// enable accordian on smaller screens
			collapsible:false,																					// allow all tabs to collapse on accordians
			usecookie: true,																					// remember last active tab using cookie
			opentabonhover: true,																				// open tab on hover
			cookie: {																							// cookie
				name: 'active-tab',																				// name of the cookie set to remember last active tab
				expires: 365,																						// when it expires in days or standard UTC time
				path: '',																						// path on which cookie is accessible
				domain:'',																						// domain of the cookie
				secure: false																					// enable secure cookie - requires https connection to transfer
			},
			tabclass:'tabs',																					// class of the tabs
			headerclass:'accordion_tabs',																		// class of the header of accordion on smaller screens
			containerclass:'tab_content',																		// class of container
			activeclass:'active',																				// name of the class used for active tab
			initialtab: 2,																						// tab to open initially; start count at 1 not 0
			animation:	{																						// animation 
				tab:	{																						// animation for tabs
					transition: 'fade',																			// transitions to use - normal or fade
					intime:500,																					// time for animation IN (1000 = 1s)
					outtime:0																					// time for animation OUT (1000 = 1s)
				},
				accordion:	{																					// animation for accordion
					transition: 'slide',																		// transitions to use - normal or slide
					intime:500,																					// time for animation IN (1000 = 1s)
					outtime:400																					// time for animation OUT (1000 = 1s)
				}
			},
			before: function(){},																				// function to call before tab is opened
			after: function(){}																					// function to call after tab is opened
		};
})(jQuery, window, document);