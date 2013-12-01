function val (elements) {
  var s = ""
  var element = $("input[name='"+elements+"']");
  if (element.is("[type='checkbox']")) {
    return element.is(":checked") ?  element.val() : s
  };
  return !!element.val() ? element.val() : s
}
function password () {
  passid.config({
    salt : val("salt"),
    lengths : val("lengths"),
    upper : val("upper"),
    lower : val("lower"),
    arabic : val("arabic"),
    special : val("special")
  })
  var pwd = $("#J_password").attr("title")
  var account = val("account")
  var app = val("app")
  if ( account.length < 1) {
    $("#J_password").html(pwd)
    return
  }
  pwd = passid.password(account , app)
  $("#J_password").html(pwd)
}

$("input[type='text'], input[type='number']").on("keyup",function () {
  password()
})
$("input[type='checkbox']").on("click",function () {
  password()
})

