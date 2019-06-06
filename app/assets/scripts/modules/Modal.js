import $ from 'jquery';
class Modal {
  constructor() {
    this.openModalButton = $(".open-modal");
    this.modal = $(".modal");
    this.closeModalButton  = $(".modal__close");
    this.events();
  }

  events(){
      //click the open modal openModalButton
      this.openModalButton.click(this.openModal.bind(this));

      //click the x close modal button
      this.closeModalButton.click(this.closeModal.bind(this));
      //pushes the any key
      $(document).keyup(this.keyPressHandler.bind(this));
  }

  keyPressHandler(e){
    if(e.keyCode == 27){//if the escape key is pressed
      this.closeModal();
    }
  }

  openModal() {
    this.modal.addClass("modal--is-visible");
    return false;//prevent the dafault behaviour (when clicking this link <a> </a> button whose href is "#", the browser automatically scrolls to the top of the page) when clicking this button.
  }

  closeModal() {
    this.modal.removeClass("modal--is-visible");
  }
}

export default Modal;
