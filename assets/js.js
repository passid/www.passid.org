new Vue({
  el:'#template',
  data : {
    account : '',
    app : '',
    password : '',
    salt : 'passid.org',
    lengths : 10,
    lower : true,
    upper : true,
    arabic : true,
    special : true,
    value : {
      upper : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lower : "abcdefghijklmnopqrstuvwxyz",
      arabic : "0123456789",
      special : "+/=-@#~,.[]()!%^*$&"
    },
    message : '',
    timers : []
  },
  methods : {
    render : function () {
      var config = {
        salt : this.salt,
        lengths : this.lengths,
        upper : this.upper ? this.value.upper : '',
        lower : this.lower ? this.value.lower : '',
        arabic : this.arabic ? this.value.arabic : '',
        special : this.special ? this.value.special : ''
      }
      passid.config(config)
      var response = passid.password(this.account , this.app)
      if (response["status"] != "200") {
        this.password = ''
        this.message = response["message"]
        return
      }
      this.password = response["result"]
      this.message = ''
      this.clearCountdown()
      var timer = window.setTimeout(this.clear , 60000)
      this.timers.push(timer)
    },
    copy : function (event) {
      if(!this.password){ return}
      event && event.target.select()
        var copy = false;
       try{
         copy = document.execCommand('Copy')
       }catch(e){}
       this.message = copy ? 'password is copyed' : 'click to copy'
    },
    clear : function () {
        this.account = ''
        this.app = ''
        this.password = ''
        this.salt = 'passid.org'
        this.lengths = 10
        this.lower = true
        this.upper = true
        this.arabic = true
        this.special = true
        this.message = ''
        this.clearCountdown();
    },
    clearCountdown : function () {
      this.timers.forEach(function(timer){      
          window.clearTimeout(timer)
      })
      this.timers = []   
    }
  }
})

