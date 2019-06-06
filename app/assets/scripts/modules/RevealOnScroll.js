import $ from 'jquery';
import waypoints from '../../../../node_modules/Waypoints/lib/noframework.waypoints';
//waypoint package does not have a main file. So we can't just type in the name of the npm package like 'waypoint',
//Instead, we need to manually point towards the node modules folder and specify the exact file we want.
class RevealOnScroll {
  constructor(els, offset) {
    this.itemsToReveal = els;
    this.offsetPercentage = offset;
    this.hideInitially();
    this.createWaypoints();
  }

  hideInitially() {
    this.itemsToReveal.addClass("reveal-item");
  }

  createWaypoints() {
    var that = this;
    this.itemsToReveal.each(function(){
      var currentItem = this;
      new Waypoint({
        element: currentItem, //current DOM element
        handler: function(){
          $(currentItem).addClass("reveal-item--is-visible");
        },
        offset: that.offsetPercentage//customize waypoint to trigger waypoint a bit earlier, default offset is 0 (top edge of the viewport);
      });
    });
  }
}

export default RevealOnScroll;
