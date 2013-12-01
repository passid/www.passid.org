(function(global, undefined) {

  if (global.passid) {
    return
  }

  var passid = global.passid = {
    version: "1.0"
  }

  var data = passid.data = {}

  data.salt = "passid.org"
  data.lengths = 8
  data.upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  data.lower = "abcdefghijklmnopqrstuvwxyz"
  data.arabic = "0123456789"
  data.special = "+/=-@#~,.[]()!%^*$&"

  function isType(type) {
    return function(obj) {
      return Object.prototype.toString.call(obj) === "[object " + type + "]"
    }
  }

  var isObject = isType("Object")
  var isString = isType("String")
  var isArray = Array.isArray || isType("Array")
  var isFunction = isType("Function")


  passid.password = function (account, app) {
    var pwd = ""
    Base64._keyStr = data.upper + data.lower + data.arabic + data.special
    pwd = SHA512(account+app+data.salt)
    pwd = Base64.encode(pwd)
    console.log(pwd)
    pwd = pwd.substr(data.salt.length, data.lengths)
    return pwd
  }

  passid.config = function(configData) {

    for (var key in configData) {
      var curr = configData[key]
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

})(this);
