(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{21:function(e,t,n){e.exports=n.p+"static/media/cookie.40d27da8.svg"},23:function(e,t,n){e.exports=n(51)},27:function(e,t,n){},3:function(e,t,n){e.exports={component:"cookie_component__13Qtu",cookie:"cookie_cookie__29Eft",cookieContainer:"cookie_cookieContainer__hZc6m"}},45:function(e,t,n){},51:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(10),o=n.n(r),i=(n(27),n(2)),s=n.n(i),u=n(4),l=n(6),m=n(22),p=n(21),f=n.n(p),d=n(3),k=n.n(d),h=n(5),E=n.n(h);c.a.createContext(null);function g(e){var t=e.user,n=Object(a.useState)(t.clicks),r=Object(l.a)(n,2),o=r[0],i=r[1];return Object(a.useEffect)((function(){i(t.clicks)}),[t]),Object(a.useEffect)((function(){!function(e){var t=document.querySelector("."+k.a.cookie),n=document.querySelector("."+k.a.cookieContainer);t&&(n.style.width=e+100+"px",n.style.height=e+100+"px",t.style.marginTop="-10px",setTimeout((function(){t.style.width=e+100+"px",t.style.height=e+100+"px",t.style.marginTop="0"}),500))}(o)}),[o]),c.a.createElement("div",{className:k.a.component},c.a.createElement("span",{className:k.a.topLine},"Username: ",c.a.createElement("span",{className:"username"},t.name)),c.a.createElement("div",{className:k.a.cookieContainer},c.a.createElement("img",{src:f.a,onClick:function(e){return i(o+1)},className:k.a.cookie,alt:"Cookie"})),c.a.createElement("br",null),c.a.createElement("span",null,"clicks: ",c.a.createElement("span",{className:"click"},o)),c.a.createElement("button",{className:"send",onClick:v(t,o)},"update clicks to server"))}function v(e,t){return function(n){"Guest"!==e.name&&function(e){return b.apply(this,arguments)}(Object(m.a)({},e,{clicks:t})).then((function(e){e.success||console.log(e.message)}))}}function b(){return(b=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.post("/api/update",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(45);var _=n(11),w=n(7),y=n.n(w),x=function(e){var t=e.login,n=e.register;return c.a.createElement("div",{className:y.a.basicBuild},c.a.createElement(O,{text:"Register",styles:y.a.register,onClick:n}),c.a.createElement(O,{text:"Login",styles:y.a.login,onClick:t}))},O=function(e){var t=e.text,n=e.styles,r=e.onClick,o=Object(a.useRef)(null),i=Object(a.useRef)(null),s=t.toLowerCase();return c.a.createElement("div",{className:n+" "+s},c.a.createElement("h3",null,t),c.a.createElement("form",null,c.a.createElement("input",{type:"text",ref:o,className:"name",placeholder:"enter name",required:!0}),c.a.createElement("input",{type:"password",ref:i,className:"password",placeholder:"enter password",required:!0}),c.a.createElement("input",{type:"button",className:"button",onClick:function(e){return r(C(o),C(i))},value:s})))};function C(e){return e.current.value}function j(){var e=Object(a.useState)({name:"Guest",clicks:0}),t=Object(l.a)(e,2),n=t[0],r=function(e,t){return{login:function(n,a){n.trim()&&a.trim()&&function(e){return N.apply(this,arguments)}({name:n,password:a}).then((function(n){var a=n.data.user;a.clicks=a.clicks+e.clicks,Object(_.act)((function(){return t(a)}))})).catch((function(e){console.log(e)}))},register:function(n,a){var c="Guest"===e.name?e.clicks:0;if(n.trim()&&a.trim()){var r={name:n,password:a,clicks:c};(function(e){return S.apply(this,arguments)})(r).then((function(e){Object(_.act)((function(){return t(r)}))})).catch((function(e){console.log(e)}))}}}}(n,t[1]);return c.a.createElement("div",{className:"App"},c.a.createElement(g,{user:n}),c.a.createElement(x,r))}function N(){return(N=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.post("/api/get",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(){return(S=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.post("/api/create",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(48).config(),console.log(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0})),o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,n){e.exports={basicBuild:"authentication_basicBuild__346eT",register:"authentication_register__lAgwa",login:"authentication_login__34W5x"}}},[[23,1,2]]]);
//# sourceMappingURL=main.0e0c7f42.chunk.js.map