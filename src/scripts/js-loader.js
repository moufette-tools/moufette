(function (document, moufette) {
  window.moufette = moufette
  var scriptName = "moufette.js"; //name of this script, used to get reference to own tag
  var scriptTag; //reference to the html script tag

  /******** Get reference to self (scriptTag) *********/
  var allScripts = document.getElementsByTagName('script');
  var targetScripts = [];
  for (var i in allScripts) {
    var name = allScripts[i].src
    if (name && name.indexOf(scriptName) > 0)
      targetScripts.push(allScripts[i]);
  }

  scriptTag = targetScripts[targetScripts.length - 1];

  /******** helper function to load external scripts *********/
  function loadScript(src, onLoad) {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type", "text/javascript");
    script_tag.setAttribute("src", src);

    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () {
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          onLoad();
        }
      };
    } else {
      script_tag.onload = onLoad;
    }
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
  }

  /******** helper function to load external css  *********/
  function loadCss(href) {
    var link_tag = document.createElement('link');
    link_tag.setAttribute("type", "text/css");
    link_tag.setAttribute("rel", "stylesheet");
    link_tag.setAttribute("href", href);
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(link_tag);
  }

  function addHtml() {
    var elem = document.createElement('div');
    elem.setAttribute('id', 'moufette-widget')
    document.body.appendChild(elem);
  }

  function setCookie(cname, cvalue, exdays, api_host) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  /******** starting point for your widget ********/
  window.moufette.init = function main(api_token, options) {
    //your widget code goes here
    setCookie('moufette_token', api_token, 30, options.api_host)

    window.addEventListener('DOMContentLoaded', function () {
      addHtml()
      loadScript(options.api_host + '/widget/main.js')
    })
    // loadCss(api_host + '/static/css/main.css')

    // TODO is this the best way?
    var moufetteConfig = window.moufetteConfig || {}
    moufetteConfig.api_host = options.api_host
    moufetteConfig.token = api_token
    window.moufetteConfig = moufetteConfig
  }

})(document, window.moufette || {});