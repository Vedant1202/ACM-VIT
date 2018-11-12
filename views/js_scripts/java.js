$("#modal-register-java").click(function() {
 // $(".mc_embed_signup").show(); // Hide the initial form
 //  // $(this).find("input.required").val() = "";
 //  $(".success-message").hide(); // Show the checkmark
 //  $("svg").removeClass("active"); // Start animation of checkmark

  $(".mc_embed_signup > form").submit(function(e) {
    e.preventDefault(); // Prevent a new window from opening upon clicking 'Subscribe now' button

    var c = 0;
    var validForm = true; // Set initial state of valid form to true
    var inputArray = $(this).find("input.required"); // Find all required inputs and store them in array

    // Simple check for all inputs to make sure the value is not empty
    inputArray.each(function(item) {
      if ($(this).val() == "") {
        validForm = false;
        $(".mc_embed_signup .error-message").show(); // if empty, show error message
        $('.mc_embed_signup input.required').addClass('error'); // and highlight empty inputs
      }
      else {
        validForm = true;
        $(".mc_embed_signup .error-message").hide(); // if empty, show error message
        $('.mc_embed_signup input.required').removeClass('error'); // and highlight empty inputs
      }
    });

    function validateEmail() {
      emailid = $('#mce-EMAIL').val();
    	atpos = emailid.indexOf('@');
      dotpos = emailid.lastIndexOf('.');
      // if (validForm == false) {
      //   $(".mc_embed_signup .error-message-phone").show(); // if empty, show error message
      //   $('.mc_embed_signup input#phone-no').addClass('error'); // and highlight empty inputs
      // }
      if(atpos < 1 || dotpos < 2)
      {
        validForm = false;
        $(".mc_embed_signup .error-message-email").show(); // if empty, show error message
        $('.mc_embed_signup input#mce-EMAIL').addClass('error'); // and highlight empty inputs
      }
      else {
        validForm = true;
        c++;
        $(".mc_embed_signup .error-message-email").hide(); // if empty, show error message
        $('.mc_embed_signup input#mce-EMAIL').removeClass('error'); // and highlight empty inputs
      }
    }

    function validatePhone() {
      phone = $("#phone-no").val();
      // console.log(phone.length);
      // if(validForm == false){
      //   $(".mc_embed_signup .error-message-email").show(); // if empty, show error message
      //   $('.mc_embed_signup input#mce-EMAIL').addClass('error'); // and highlight empty inputs
      // }
      if(phone.length < 10 || phone.length > 10){
        validForm = false;
        $(".mc_embed_signup .error-message-phone").show(); // if empty, show error message
        $('.mc_embed_signup input#phone-no').addClass('error'); // and highlight empty inputs
      }
      else {
        validForm = true;
        c++;
        $(".mc_embed_signup .error-message-phone").hide(); // if empty, show error message
        $('.mc_embed_signup input#phone-no').removeClass('error'); // and highlight empty input
      }
    }
    function validateRollno() {
      roll = $("#roll-no").val();
      // console.log(phone.length);
      // if(validForm == false){
      //   $(".mc_embed_signup .error-message-email").show(); // if empty, show error message
      //   $('.mc_embed_signup input#mce-EMAIL').addClass('error'); // and highlight empty inputs
      // }
      if(roll.length < 10 || roll.length > 10){
        validForm = false;
        $(".mc_embed_signup .error-message-rollno").show(); // if empty, show error message
        $('.mc_embed_signup input#roll-no').addClass('error'); // and highlight empty inputs
      }
      else {
        validForm = true;
        c++;
        $(".mc_embed_signup .error-message-rollno").hide(); // if empty, show error message
        $('.mc_embed_signup input#roll-no').removeClass('error'); // and highlight empty input
      }
    }


    validateEmail();
    validatePhone();
    validateRollno();


    // Everything checks out! Continue...
    if (validForm == true && c==3) {
      var formContainer = $(".mc_embed_signup");
      // var formData = $(this).serialize(); // Format all info and get it ready for sendoff
      // console.log(JSON.stringify(formData));
      // console.log(document.getElementsByName("year")[0].value);

/////////////////////////////////////////////////////////////////////////
      if (document.getElementById('y1').checked) {
        regyear = document.getElementById('y1').value;
      }
      else if (document.getElementById('y2').checked) {
        regyear = document.getElementById('y2').value;
      }
      else if (document.getElementById('y3').checked) {
        regyear = document.getElementById('y3').value;
      }
      else if (document.getElementById('y4').checked) {
        regyear = document.getElementById('y4').value;
      }
/////////////////////////////////////////////////////////////////////////////

      if (document.getElementById('b1').checked) {
        regbranch = document.getElementById('b1').value;
      }
      else if (document.getElementById('b2').checked) {
        regbranch = document.getElementById('b2').value;
      }
      else if (document.getElementById('b3').checked) {
        regbranch = document.getElementById('b3').value;
      }
      else if (document.getElementById('b4').checked) {
        regbranch = document.getElementById('b4').value;
      }
      else if (document.getElementById('b5').checked) {
        regbranch = document.getElementById('b5').value;
      }
/////////////////////////////////////////////////////////////////////////////

      if (document.getElementById('d1').checked) {
        regdivision = document.getElementById('d1').value;
      }
      else if (document.getElementById('d2').checked) {
        regdivision = document.getElementById('d2').value;
      }
      else if (document.getElementById('d3').checked) {
        regdivision = document.getElementById('d3').value;
      }

////////////////////////////////////////////////////////////////////////////

      // AJAX magic coming up...
      $.ajax({
        type: 'POST',
        url: '/events',
        data: JSON.stringify({
                                name: document.getElementsByName("name")[0].value,
                                email:  document.getElementsByName("email")[0].value,
                                phoneno:  document.getElementsByName("phoneno")[0].value,
                                rollno:  document.getElementsByName("rollno")[0].value,
                                year: regyear,
                                branch: regbranch,
                                division: regdivision
                              }),
        cache: false,
        dataType: "json",
        contentType: "application/json",
        encode: true,
        error: function(err) {
          // console.log("Uh, oh. There was an error:", err); // You broke something...
        },
        success: function(data) {
          // console.log("Success! Here is the data:", data); // Yay!
        }
      }); // All done! Let's show the user a success message:
      show_tick();
    }

    function show_tick() {
      // $("#mce-EMAIL").val() = "";
      // $("#mce-FNAME").val() = "";
      $(formContainer).hide(); // Hide the initial form
      // $(this).find("input.required").val() = "";
      $(".success-message").show(); // Show the checkmark
      $("svg").addClass("active"); // Start animation of checkmark
      setTimeout(function() {
        $("svg > .checkmark-circle").hide();
      }, 5000);
    };

    return; // No go on form...
  }); // end of submit function
});

$(".mobile-close").click(function () {
  $("svg").hide();
});



var globalModal = $('.global-modal');
    $( ".btn-green-flat-trigger" ).on( "click", function(e) {
      e.preventDefault();
      $( globalModal ).toggleClass('global-modal-show');
    });
    $( ".overlay" ).on( "click", function() {
      $( globalModal ).toggleClass('global-modal-show');
    });
    $( ".global-modal_close" ).on( "click", function() {
      $( globalModal ).toggleClass('global-modal-show');
    });
    $(".mobile-close").on("click", function(){
      $( globalModal ).toggleClass('global-modal-show');
    });
