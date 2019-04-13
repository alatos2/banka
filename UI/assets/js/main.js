
    //get modal element
    const modal = document.getElementById("simpleModal");
    //get the open modal btn
    const modalBtn = document.getElementById("modalBtn");
    // get close button
    const closeBtn = document.getElementsByClassName("closeBtn")[0];

    const openModal = () => {
      modal.style.display = "block";
    }

    const closeModal = () => {
      modal.style.display = "none";
    }

    const clickOutside = (e) => {
      if(e.target == modal){
        modal.style.display = "none";
      }
    }
    
    //click event
    modalBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", clickOutside)


    // for user, staff and admin page menus -> responsiveness
    function myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }