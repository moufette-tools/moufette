import React from 'react'


const Setup = ({ currentUser }: any) => {
   const url = window.location.origin
   const token = currentUser?.team?.token
   return (
      <pre>
         {`
<script>
   (function(a,b){function c(b,c){var d=a.createElement("script");d.setAttribute("type","text/javascript"),d.setAttribute("src",b),d.readyState?d.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&c()}:d.onload=c,(a.getElementsByTagName("head")[0]||a.documentElement).appendChild(d)}function d(){var b=a.createElement("div");b.setAttribute("id","moufette-widget"),a.body.appendChild(b)}window.moufette=b;var e,f=a.getElementsByTagName("script"),g=[];for(var h in f){var i=f[h].src;i&&0<i.indexOf("moufette.js")&&g.push(f[h])}e=g[g.length-1],window.moufette.init=function(a,{api_host:b}){d(),c(b+"/static/js/main.js");var e=window.moufetteConfig||{};e.api_host=b,window.moufetteConfig=e}})(document,window.moufette||{});
   moufette.init("${token}", { api_host: "${url}" })
</script>
         `}
      </pre>
   )
}

export default Setup