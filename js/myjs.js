$("#openLoginButton").click(function () {
    $("#loginModal").modal({backdrop: "static"});
  })

  $("#loginButton").click(function () {
    $("#loginModal").modal("hide");
  })