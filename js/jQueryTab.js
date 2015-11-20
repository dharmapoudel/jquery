/*
Author: Dharma Poudel (@rogercomred)
Description: Yet another jQuery tabs plugin with unlimited animations and transitions.
Version: 2.0
License:  GPLv3 ( http://www.gnu.org/licenses/gpl-3.0.html )
*/

;(function($, window, document, undefined){
'use strict';

  function jQueryTab(wrapper, options) {
    this.options = $.extend (true, {}, $.fn.jQueryTab.defaults, options );
    this._defaults = $.fn.jQueryTab.defaults;
    this.wrapper = wrapper;
    this.$wrapper = $(wrapper);
    this.tabs = this.$wrapper.find('.'+this.options.tabClass).addClass('tabHeader');
    this.tabItems = this.tabs.find('li');
    this.tabLinks = this.tabItems.find("a");
    this.wrap = this.$wrapper.find('.'+this.options.contentWrapperClass);
    this.contents = this.wrap.find('.'+this.options.contentClass);
    this.headerClass = this.options.accordionClass;
    this.activeClass = this.options.activeClass;
    this.init();
  }

  /* jQueryTab object */
  jQueryTab.prototype = {
  
      init:function(){
        var self = this,
            initialTab = self.getActiveTab();   		// get the tab to open initially

        if(self.options.responsive){
          self.addHeader();                 // call fxn to add accordian headers
          self.alinks = self.wrap.find('.'+self.headerClass);
        }
        
        self.resize();
        self.cssSetUp();
        self.handleEvent();
      },
      
      addHeader: function(){
        var self = this;
            
        self.wrap.find('.'+self.headerClass).remove();
        self.tabLinks.each(function(){
          var $tab_content = self.contents.eq($(this).parent().index());
          $('<a />').attr({ 'class': self.headerClass, 'href' : '#'+$tab_content.attr('id') })
                    .text($(this).text())
                    .insertBefore($tab_content);
        });
      },
      
      cssSetUp: function(){
        this.wrap.addClass('toggle_border');
        this.contents.addClass('toggle_position toggle_display');
        if(this.options.responsive) {
          this.tabs.addClass('toggle_display');
          
        }
        if(this.options.tabPosition==='bottom'){
            this.tabs.insertAfter(this.wrap.addClass('invert_border'));
        }
      },
      
      handleClasses: function(activeContent){
        var self = this;
        self.contents.removeClass(self.options.tabInTransition).addClass(self.options.tabOutTransition);  
        activeContent.removeClass(self.options.tabOutTransition).addClass(self.options.tabInTransition);
      },
      
      resize: function(){
        var self = this,
            currentTab    =  self.getActiveTab(),
            activeContent = self.contents.eq(currentTab);
            self.reOrder(activeContent);
            
        self.tabItems.eq(currentTab).addClass(self.activeClass);
        if(self.options.responsive) self.alinks.eq(currentTab).addClass(self.activeClass);

        if (self.options.responsiveBelow < $(window).width()) {
            self.contents.show();
            self.handleClasses(activeContent);
            self.wrap.height(activeContent.outerHeight());
        }else{
          if(self.options.responsive){
              self.contents.hide().removeClass(self.options.tabOutTransition, self.options.tabInTransition);
              activeContent.fadeIn(self.options.accordionIntime);
            }
        }
        
        (self.options.useCookie) ? self.setCookie.call(self, currentTab) : '';
      },
      
      handleEvent: function(){
        var self = this;
        
        // window is resized
        $(window).on('resize', function(){ self.resize(); } );
        
        
        // navigate to the history -- will look into this after opentab function
        /* if(self.options.useHistory){
            window.onpopstate = function(event){
              console.log(self.tabs.find('a[href="'+window.location.hash+'"]'));
              self.tabLinks.add(self.alinks).filter('a[href="'+window.location.hash+'"]').trigger('click');
            }
        } */
        
        // when tab is focused
        /*
        if(self.options.keyboardNavigation){
            self.tabLinks.add(self.alinks).on('focus', function(event) {
                var fxn_to_call = ($(this).hasClass('accordion_tabs'))? 'handleAccordions' : 'handleTabs';
                self.tabber(fxn_to_call, this);
            });
        }
        */
        
        // tab heading is hovered or clicked
        self.tabLinks.add(self.alinks).on((self.options.openOnhover)?'click mouseenter' :'click', function(event){										// when tab is clicked
            event.preventDefault();																			// prevent default behaviour	
            var fxn_to_call = ($(this).hasClass('accordion_tabs'))? 'handleAccordions' : 'handleTabs';
            self.tabber(fxn_to_call, this);
        });
        
      },
      
      tabber: function(fxn_name, elem){
        var self = this;
        (typeof self.options.before === 'function') ? self.options.before.apply( elem, arguments ) : '';		// call fxn before
        if(self.options.useHistory) self.updateBrowserHisotry($(elem).attr('href'));
        self[fxn_name].call(elem, self); 														// call handleEvent fxn; self.options - data values
        (typeof self.options.after === 'function') ? self.options.after.apply( elem, arguments ) : '';		// call fxn after
      
      },
      
      handleTabs: function(self){
        
        if($(this).parent().hasClass(self.activeClass)) return;												// do nothing when active tab is clicked
        
        var index = $(this).parent().index(),
            activeContent  = self.contents.eq(index);
        
        self.tabItems.removeClass(self.activeClass).eq(index).addClass(self.activeClass);										// add active class to this tab
        self.wrap.height(activeContent.outerHeight());
        self.reOrder(activeContent);
        if(self.options.responsive)
          self.alinks.removeClass(self.activeClass).eq(index).addClass(self.activeClass);												// add class to corresponding accordian header
        
        self.handleClasses(activeContent);
            
        (self.options.useCookie) ? self.setCookie.call(self, index) : '';										//if useCookie is true save the current tab index to cookie
      },
      
      handleAccordions: function(self){
        var $this           = $(this),
            index           = Math.floor(($this.next().index() -1)/2 ),
            intime          = self.options.accordionInTime,
            outtime         = self.options.accordionOutTime;
                
        if(($this.hasClass(self.activeClass)) && !self.options.collapsible) return;								// if active and not collapsible - do nothing
        
        else if( $this.hasClass(self.activeClass) && self.options.collapsible ){									// if active and collapsible
          self.alinks.removeClass(self.activeClass);											// 		remove active class from all accordian headers
          self.tabItems.removeClass(self.activeClass);										// 		remove active class from all tabs
          (self.options.accordionTransition ==='slide')	? self.contents.slideUp(outtime) : self.contents.fadeOut(outtime);				// else hide the visible content in specified time 
          
          (self.options.useCookie) ? self.setCookie.call(self, null) : '';										// 		delete the cookie
        }else{
          self.alinks.removeClass(self.activeClass).eq(index).addClass(self.activeClass);
          self.tabItems.removeClass(self.activeClass).eq(index).addClass(self.activeClass);									// add active class to the corresponding tab
          
          (self.options.accordionTransition ==='slide')												// if the transition is slide
            ? self.contents.slideUp(outtime).eq(index).slideDown(intime)				// 		slide down corresponding tab content
            : self.contents.fadeOut(outtime).eq(index).fadeIn(intime);					// 		show the corresponding tab content
          
          (self.options.useCookie) ? self.setCookie.call(self, index) : '';										// if useCookie is true	save the current tab index to cookie	
        }								
      },
      
      reOrder: function($ontop){
        var self = this,
            count = self.contents.length;
        $ontop.css('zIndex', count+1);
        self.contents.not($ontop).each(function(i){
            $(this).css('zIndex', count-i);
        });
      },
      
      getActiveTab: function(tab){
        var self = this, currentTab;
        
        if(typeof tab ==='number'){  return tab-1; }	// if tab specified return it immediately

        if(self.tabs.find('.'+self.activeClass).index() !==-1){
          return self.tabs.find('.'+self.activeClass).index();
        }
        
        currentTab =(self.options.useCookie)										// if remember last active tab is set to true
            ? (self.getCookie(self.options.cookieName)						// if $.cookie plugin is present & cookie is set
                ? self.getCookie(self.options.cookieName)				// 	set to  the value from cookie
                : self.options.initialTab-1                       // else set to specified tab or default open tab
                )																
            : self.options.initialTab-1;	

        if(window.location.hash) {
          var indexOfHash = self.tabLinks.index($('[href='+window.location.hash+']'));
          if(indexOfHash !== -1) currentTab = indexOfHash;
        }
        return currentTab;
      },
      
      setCookie: function(value){
        var self = this, expires, date, path, domain, secure;
        if (value === null) {
          value = '';
          date = new Date();
          date.setTime(date.getTime() + ((-1)*24*60*60*1000));
        }
        else if(typeof self.options.cookieExpires == 'number'){
          date = new Date();
          date.setTime(date.getTime() + (self.options.cookieExpires*24*60*60*1000));
        } else if( self.options.cookieExpires.toUTCString){
          date = self.options.cookieExpires;
        }
        expires = '; expires=' + date.toUTCString(); 
        path = self.options.cookiePath ? '; path=' + (self.options.cookiePath) : '';
        domain = self.options.cookieDomain ? '; domain=' + (self.options.cookieDomain) : '';
        secure = self.options.cookieSecure ? '; secure' : '';
        document.cookie = ''.concat(self.options.cookieName, '=', encodeURIComponent(value), expires, path, domain, secure);
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
      
      //Update Browser History
      updateBrowserHisotry: function(href){
        if(!!(window.history && history.pushState)) {
            if(window.location.hash !== href) history.pushState(null,null,href);
        }
      }
      
  };
  /* initialize the jQueryTab plugin */
  $.fn.jQueryTab = function(options) {
    return this.each(function() {
      var container = $(this);
      if(container.data('jQueryTab')) return;
      var aT = new  jQueryTab(this, options);
      container.data('jQueryTab', aT);
    });
  };

  /* jQueryTab defaults */
  $.fn.jQueryTab.defaults = {
    
    //classes settings
    tabClass:'tabs',				    // class of the tabs
    accordionClass:'accordion_tabs',	// class of the header of accordion on smaller screens
    contentWrapperClass:'tab_content_wrapper',		// class of content wrapper
    contentClass:'tab_content',		// class of container
    activeClass:'active',			// name of the class used for active tab

    //feature settings
    responsive:true,				// enable accordian on smaller screens
    responsiveBelow:600,            // the breakpoint
    collapsible:true,				// allow all tabs to collapse on accordians
    useCookie: true,				// remember last active tab using cookie
    openOnhover: false,			    // open tab on hover
    useHistory: true,               // use the history api
    keyboardNavigation: true,       // use keyboard for navigation
    
    //tabs settings
    tabPosition: 'top',          // position of tab - top|bottom
    initialTab: 1,					// tab to open initially; start count at 1 not 0

    //cookie settings
    cookieName: 'active-tab',		// name of the cookie set to remember last active tab
    cookieExpires: 365,				// when it expires in days or standard UTC time
    cookiePath: '',					// path on which cookie is accessible
    cookieDomain:'',				// domain of the cookie
    cookieSecure: false,			// enable secure cookie - requires https connection to transfer
    
    //tabs transition settings      fade|flip|scaleUp|slideLeft
    tabInTransition: 'fadeIn',      // classname for showing in the tab content
    tabOutTransition: 'fadeOut',    // classname for hiding the tab content
    
    //accordion transition settings
    accordionTransition: 'slide',	// transitions to use - normal or slide
    accordionIntime:500,			// time for animation IN (1000 = 1s)
    accordionOutTime:400,			// time for animation OUT (1000 = 1s)
    
    //api functions
    before: function(){},			// function to call before tab is opened
    after: function(){}				// function to call after tab is opened
  };

})(jQuery, window, document); 


/* to dos */
/* 
1. look into opentab function 
2. look into onpopstate issue
3. work into keyboard navigation
*/
