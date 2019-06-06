import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import ProjectInfo from './modules/ProjectInfo';
import $ from 'jquery';
import Modal from './modules/Modal';

var mobileMenu = new MobileMenu();
var projectInfo = new ProjectInfo();
// var revealOnScroll = new RevealOnScroll();
new RevealOnScroll($(".project-item"), "85%");//(element, offset)
new RevealOnScroll($(".skill"), "80%");

var stickyHeader = new StickyHeader();
var modal = new Modal();
