import $ from 'jquery';

class MobileMenu {
  constructor() {
    /* Avoid jquery spaghetti
    $(".site-header__menu-icon").click(function(){
      console.log("icon was clicked");
    });*/
    this.siteHeader = $(".site-header");
    this.menuIcon = $(".site-header__menu-icon");
    this.menuContent = $(".site-header__menu-content");

    this.events();
  }

  events() {
    this.menuIcon.click(this.toggleTheMenu.bind(this));
    //important!!!! bind guarantees that the "this" in toggleTheMenu method refers to "MobileMenu"
  }

  toggleTheMenu() {
    this.menuContent.toggleClass("site-header__menu-content--is-visible");
    this.siteHeader.toggleClass("site-header--is-expanded");
    this.menuIcon.toggleClass("site-header__menu-icon--close-x");
  }
}

export default MobileMenu;
