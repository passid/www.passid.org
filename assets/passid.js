(function(global, undefined) {

  if (global.passid) {
    return
  }

  var passid = global.passid = {
    version: "1.0.2"
  }

  var data = passid.data = {}

  data.salt = "passid.org"
  data.lengths = 16
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
  var isArray = Array.isArray || isType("Array")

  passid.password = function (account, app) {
    var pwd = ""
    var len = parseInt(data.lengths)
    var lenother = (account+app+data.salt).length
    Base64._keyStr = data.arabic + data.lower + data.upper + data.special
    pwd = SHA512(account+app+data.salt)
    pwd = Base64.encode(pwd)
    for (var i = Math.ceil((lenother + len*len) / 170 )   ; i > 0; i--) {
      pwd += pwd;
    };
    console.log(pwd)
    pwd = pwd.substr( lenother + len*len, len)
    return pwd
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

})(this);
