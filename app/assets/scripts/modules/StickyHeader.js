import $ from 'jquery';
import waypoints from '../../../../node_modules/Waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';//this package is to achieve the scroll effect when clicking navbar links which links to related section.

class StickyHeader {
  constructor() {
    this.lazyImages = $(".lazyload");
    this.siteHeader = $(".site-header");
    this.headerTriggerElement = $(".self-intro__title");

    this.createHeaderWaypoint();

    this.pageSections = $(".page-section");
    this.headerLinks = $(".navbar a"); //select all header navbar links

    this.createPageSectionWaypoints();
    this.addSmoothScrolling();
    this.refreshWaypoints();
  }

  /*
  ******************Important****************
  When the page first loads, waypoints immediately takes note of the vertical positioning of the element that it is watching.
  The problem is when waypoints makes that measurement, the lazy images haven't loaded in yet, the previous positioning data become outdated,
  as soon as our lazy images gets loaded in, and begin taking up vertical space. Once those images have loaded in, the same section will be bigger pixels from the very top.

  To fix this proble, we need to tell waypoints to refresh or recalculate its measurement every time a new image gets lazy loaded in.
  */
  refreshWaypoints(){
    this.lazyImages.on('load', function(){
      Waypoint.refreshAll();
      //Important!!!! This refresh waypoints that currently exist in the web browser memory,
      //not only limited to in StickyHeader.js file, but all files that using Waypoint class.
    });
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }

  createHeaderWaypoint() {
    var that = this;
    new Waypoint({
      element: that.headerTriggerElement[0], //that.headerTriggerElement is a jquery object, that.headerTriggerElement[0] is the native DOM element
      //when this.headerTriggerElement approaches the top of the browser, the change will happen
      handler: function(direction){
        if(direction == "down"){
          that.siteHeader.addClass("site-header--dark");
        }else {
          that.siteHeader.removeClass("site-header--dark");
        }
      }
    });
  }

  createPageSectionWaypoints() {
    var that = this;
    this.pageSections.each(function(){
      var currentPageSection = this;
      //we add two Waypoint methods to guarantee whichever section takes the majority of the screen, its navbar name will be highlighted
      new Waypoint({
        element: currentPageSection,
        handler: function(direction){
          if(direction == "down"){
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");//this is the class id of "data-matching-link" attribute
            // console.log("matchingHeaderLink:",matchingHeaderLink);
            that.headerLinks.removeClass("is-current-link"); //to make sure nothing in the header is highlighted.
            $(matchingHeaderLink).addClass("is-current-link");//this added class will make the link orange, highlight only current section
          }
      },
        offset: "18%"//default value is 0 -- the top edge of the viewport. When the top of this section is 18% to the top of the viewport, change will occur
      });

      new Waypoint({
        element: currentPageSection,
        handler: function(direction){
          if(direction == "up"){
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");//this is the class id of "data-matching-link" attribute
            that.headerLinks.removeClass("is-current-link"); //to make sure nothing in the header is highlighted.
            $(matchingHeaderLink).addClass("is-current-link");//this added class will make the link orange, highlight only current section
          }
      },
        offset: "-40%"//default value is 0 -- the top edge of the viewport. When the top of this section is -40% to the top of the viewport, change will occur
      });

    });
  }
}

export default StickyHeader;
