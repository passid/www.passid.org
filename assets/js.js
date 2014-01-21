(function(window, undefined) {
  function val (element) {
    var s = ""
    var ele = $("input[name='"+element+"']")
    if (ele.is("[type='checkbox']")) {
      return ele.is(":checked") ?  ele.val() : s
    }
    return !!ele.val() ? ele.val() : s
  }
  function password () {
    var config = {}
    var item = ["salt","lengths","arabic","lower","upper","special"]
    for (var i = item.length - 1; i >= 0; i--) {
      config[item[i]] = val((item[i]))
    };
    passid.config(config)
    var pwd = $("input[name='password']")
    var account = val("account")
    var app = val("app")
    if ( account.length < 1) {
      pwd.val("")
      return
    }
    var response = passid.password(account , app)
    if (response["status"] != "200") {
      alert(response["message"])
      return
    }
    pwd.val(response["result"])
    if( typeof (timer) == "number"){clearTimeout(timer)}
    timer = setTimeout(countdown,60000)
  }
  var timer;
  function countdown(){
    $("input[name='account'], input[name='app'], input[name='password']").val("")
    $("input[name='salt'], input[name='lengths']").each(function(){
      $(this).val($(this).attr("placeholder"))
    })
    $("input[type='checkbox']").prop("checked",true)
  }

  $("input[type='text'], input[type='number'], input[type='password']").on("keyup", function(){
    password()
  }).on("mouseover",function(){
    $(this).select()
  })
  $("input[type='number']").on("change",function(){
    password()
  })
  $("input[type='checkbox']").on("click",function(){
    password()
  })
})(window);