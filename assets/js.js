function val (elements) {
  var s = ""
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
  var response = passid.password(account , app)
  if (response["status"] != "200") {
    alert(response["message"])
    return
  }
  pwd = response["result"]
  $("#J_password").html(pwd)
  if( typeof (timer) == "number"){clearTimeout(timer)}
  timer = setTimeout(countdown,60000)
}
var timer;
function countdown(){
  $("input[name='account'], input[name='app']").val("")
  $("#J_password").html($("#J_password").attr("title"))
  $("input[name='salt'], input[name='lengths']").each(function(){
    $(this).val($(this).attr("placeholder"))
  })
  $("input[type='checkbox']").prop("checked",true)
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
