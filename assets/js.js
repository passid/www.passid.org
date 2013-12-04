function val (elements) {
  var s = "";
  var element = $("input[name='"+elements+"']")
  if (element.is("[type='checkbox']")) {
    return element.is(":checked") ?  element.val() : s
  }
  return !!element.val() ? element.val() : s
}
function password () {
  var config = {}
  var item = ["salt","lengths","arabic","lower","upper","special"]
  for (var i = item.length - 1; i >= 0; i--) {
    config[item[i]] = val((item[i]))
  };
  passid.config(config)
  var pwd = $("#J_password").attr("title")
  var account = val("account")
  var app = val("app")
  if ( account.length < 1) {
    $("#J_password").html(pwd)
    return
  }
  pwd = passid.password(account , app)
  $("#J_password").html(pwd)
  if( typeof (timer) == "number"){clearTimeout(timer)}
  timer = setTimeout(countdown,600000);
}
var timer;
function countdown(){
  $("form")[0].reset();
}

$("input[type='text'], input[type='number']").on("keyup",function () {
  password()
})
$("input[type='number']").on("change",function () {
  password()
})
$("input[type='checkbox']").on("click",function () {
  password()
})

