(function(window, undefined) {

  if (window.passid) {
    return
  }

  var passid = window.passid = {
    version: "1.0.4"
  }

  var data = passid.data = {}

  data.salt = "passid.org"
  data.lengths = 16
  data.upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  data.lower = "abcdefghijklmnopqrstuvwxyz"
  data.arabic = "0123456789"
  data.special = "+/=-@#~,.[]()!%^*$&"
  data.statuss = {"200":"200 success", "601":"601 account is empty", "602":"602 password output length is too short", "603":"603 password output type is empty"}

  function response(status, result){
    var temp = {}
    temp["status"] = status
    temp["message"] = data.statuss[status]
    temp["result"] = result
    return temp
  }

  function isType(type) {
    return function(obj) {
      return Object.prototype.toString.call(obj) === "[object " + type + "]"
    }
  }

  var isObject = isType("Object")
  var isArray = Array.isArray || isType("Array")

  passid.password = function (account, app) {
    var len = parseInt(data.lengths)
    if (len < 1) {
      return response("602", "")
    }
    if (account.length < 1) {
      return response("601", "")
    }
    var keystr = data.arabic + data.lower + data.upper + data.special
    if (keystr.length < 1) {
      return response("603", "")
    }
    var pwd = ""
    var lenother = (account + app + data.salt).length
    Base64._keyStr = keystr
    pwd = SHA512(account + app + data.salt)
    pwd = Base64.encode(pwd)
    for (var i = Math.ceil((lenother + len*len) / 170 ) + 1; i > 0; i--) {
      pwd += pwd
    }
    pwd = pwd.substr( lenother + len*len, len)
    return response("200",pwd)
  }

  passid.config = function(configs) {

    for (var key in configs) {
      var curr = configs[key]
      var prev = data[key]

      if (prev && isObject(prev)) {
        for (var k in curr) {
          prev[k] = curr[k]
        }
      }
      else {
        if (isArray(prev)) {
          curr = prev.concat(curr)
        }
        data[key] = curr
      }
    }

    return passid
  }

})(window);
