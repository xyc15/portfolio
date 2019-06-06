import $ from 'jquery';

class ProjectInfo {
  constructor() {
    this.infoOpen = $(".project-item__info-open");
    this.infoClose = $(".project-item__info-close");
    this.projectImage = $(".project-item__image");
    // this.project_intro = $(".project-item__intro");
    // this.project_info = $(".project-item__info");

    this.showInfo();
    this.hideInfo();
  }

  showInfo() {
    this.infoOpen.click(function(){
      $(this).parents(".project-item__intro").addClass("project-item--is-hidden");
      $(this).parents(".project-item").children(".project-item__info").addClass("project-item--is-visible");

    });

    this.projectImage.click(function(){
      $(this).parents(".project-item__intro").addClass("project-item--is-hidden");
      $(this).parents(".project-item").children(".project-item__info").addClass("project-item--is-visible");
  });
}
  hideInfo() {
    this.infoClose.click(function(){
      $(this).parents(".project-item__info").removeClass("project-item--is-visible");
      $(this).parents(".project-item").children(".project-item__intro").removeClass("project-item--is-hidden");

    });
  }
}
export default ProjectInfo;
