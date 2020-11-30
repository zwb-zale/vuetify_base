var loging_url = (function() {
  //var js=document.scripts[document.scripts.length - 1];

  var src = document.currentScript.src;
  src = src.substr(0, src.lastIndexOf("/") + 1);
  //src= src+'jwt_login.html?to='+location.href.replace(/#/g,'%23');
  return src;
})();

function getCookie(name, defaultValue) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return defaultValue;
}
function storageGet(key) {
  return window.localStorage.getItem(key);
  //return window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
}
function storageRemove(key) {
  window.localStorage.removeItem(key);
  window.sessionStorage.removeItem(key);
}
Auth = {
  //loging_page:loging_url,
  username: function() {
    var username = storageGet("jwt.username");
    if (username) return username;
    else return false;
  },
  islogin: function() {
    if (storageGet("jwt.token")) return true;
    else return false;
  },
  clear: function() {
    storageRemove("jwt.token");
  },
  logout: function(to) {
    Auth.clear();
    //location=to;
  },
  login: function(to) {
    let locale = getCookie("locale");
    if (locale == "zh-CN") {
      locale = "/cn";
    } else if (locale == "zh-TW") {
      locale = "/static";
    } else if (locale == "en") {
      locale = "/en";
    } else if (locale == "vi-VN") {
      locale = "/vn";
    } else {
      locale = "/static";
    }
    let loging_url = "kong/auth" + locale;
    if (arguments.length == 1 && to != "") {
      location = loging_url + "/jwt_login.html?to=" + to;
    } else {
      location =
        loging_url + "/jwt_login.html?to=" + location.href.replace(/#/g, "%23");
    }
  },
  token: function() {
    return storageGet("jwt.token");
  },
  header_token: function() {
    return "Bearer " + storageGet("jwt.token");
  }
};

module.exports = {
  Auth
};
//import Auth=auth
