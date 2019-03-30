
    document.getElementById("btn-sign-in").onclick = function () {
        location.href = "dashboard.html";
    };

    function myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }

