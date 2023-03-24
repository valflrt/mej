var O=Object.defineProperty;var k=(e,t,n)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var h=(e,t,n)=>(k(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();class L{constructor(t){h(this,"ctx");h(this,"x",0);h(this,"y",0);h(this,"angle",0);h(this,"color","#ffffff");h(this,"width",1);this.ctx=t}moveTo(t,n){return this.x=t,this.y=n,this}forward(t){let[n,s]=[this.x,this.y];return this.x+=t*Math.sin(this.angle),this.y+=t*Math.cos(this.angle),this.ctx.lineWidth=this.width,this.ctx.strokeStyle=this.color,this.ctx.beginPath(),this.ctx.lineCap="round",this.ctx.moveTo(n,s),this.ctx.lineTo(this.x,this.y),this.ctx.stroke(),this}left(t){return this.angle+=t/180*Math.PI,this}right(t){return this.left(-t)}dot(t=1,n){return this.ctx.beginPath(),this.ctx.arc(this.x,this.y,t*2,0,2*Math.PI,!1),this.ctx.fillStyle=n,this.ctx.fill(),this}setColor(t){return this.color=t,this}setWidth(t){return this.width=t,this}text(t,n,s,r){return this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.font=r??"12px Open Sans Light",this.ctx.strokeText(t,this.x+n,this.y+s),this}clear(){return this.ctx.clearRect(-10,-10,1e5,1e5),this}reset(){return this.x=0,this.y=0,this.angle=0,this.color="#ffffff",this.width=1,this}}function I(e,t,n){e.width=t,e.height=n;const s=e.getContext&&e.getContext("2d");return s.translate(.5,.5),s.lineCap="square",s}function D(e){return e.map(t=>t===0?1:0).reverse()}const F=[];function p(e){return e>0?[...D(p(e-1)),0,...p(e-1)]:F}const M=[1,2];function E(e){if(e>2){let[t,n]=E(e-2);return[t*2+1,n*2+1]}else return M}const j=[1,1];function b(e){if(e>1){let[t,n]=b(e-2);return e%4==3?[t*2,n*2+1]:[t*2+2,n*2+1]}else return j}function H(e){return e%2==0?E(e):b(e)}function N(e,{n:t,centerX:n,centerY:s,segLen:r,segWidth:i,showAngleTag:o,showCenter:a,showPrevSeq:q}){n=n*r,s=s*r,e.setColor("rgba(220, 220, 230, 1)").setWidth(i*2-1).moveTo(n,s);let l=p(t-1);console.log(l);let y=[];function _(c){y.findIndex(([f,C])=>e.x===f&&e.y===C)===-1?(y.push([e.x,e.y]),e.text(c.toString(),7,-9)):e.text(c.toString(),-7,9)}let w=(c,f)=>{e.forward(r),o&&_(f?c?0:1:c),c===0?e.left(90):e.right(90)};l.forEach(c=>w(c)),e.forward(r),t===1&&e.left(90),e.moveTo(n,s),o&&_(0),q&&e.setColor("rgb(150, 150, 255)"),l.forEach(c=>w(c,!0)),e.forward(r),e.moveTo(n,s),a!==!1&&e.dot(3,"rgb(255, 90, 90)")}function K(e,t){let n=I(e,t.width,t.height);N(new L(n),t)}const R=800,$=600;let z=I(document.getElementById("canvas"),R,$),v=new L(z);const W=document.getElementById("rang_input"),T=document.getElementById("segment_len_input"),S=document.getElementById("seg_width"),B=document.getElementById("offset_x_input"),X=document.getElementById("offset_y_input"),Y=document.getElementById("angle_tag_input"),A=document.getElementById("prev_seq_input"),d=document.querySelector("#drawing_wrapper .msg"),m={preset_1:{n:1,centerX:9.5,centerY:7,segLen:40,segWidth:1,showAngleTag:!0},preset_2:{n:2,centerX:9.5,centerY:7.5,segLen:40,segWidth:1,showAngleTag:!0},preset_3:{n:3,centerX:9.5,centerY:6.5,segLen:40,segWidth:1,showAngleTag:!0},preset_4:{n:4,centerX:10.5,centerY:6,segLen:40,segWidth:1,showAngleTag:!0},preset_5:{n:5,centerX:12,centerY:6,segLen:40,segWidth:1,showAngleTag:!0},preset_6:{n:6,centerX:12.5,centerY:8,segLen:40,segWidth:1,showAngleTag:!0},preset_10:{n:10,centerX:29.5,centerY:27.5,segLen:10,segWidth:1},preset_12:{n:12,centerX:55.5,centerY:16,segLen:8,segWidth:1},preset_16:{n:16,centerX:178.5,centerY:234.5,segLen:2,segWidth:1},preset_17:{n:17,centerX:285,centerY:385,segLen:1,segWidth:1}};function g(e){Object.entries(m).forEach(([n,s])=>{var r,i;return Object.entries(s).every(([o,a])=>a===e[o])?(r=document.getElementById(n))==null?void 0:r.classList.add("active"):(i=document.getElementById(n))==null?void 0:i.classList.remove("active")}),v.clear().reset();let t=G(e);t.length===0?(console.log(e),d.classList.remove("error"),d.innerText=`Dimensions de la figure: (${H(e.n).join("; ")})`,x(e),N(v,e)):(d.classList.add("error"),d.innerText=t.join(" / "))}function u(){let e=Number.parseFloat(W.value);e=isNaN(e)?10:e;let t=Number.parseFloat(T.value);t=isNaN(t)?0:t;let n=Number.parseFloat(S.value);n=isNaN(n)?1:n;let s=Number.parseFloat(B.value);s=isNaN(s)?0:s;let r=Number.parseFloat(X.value);return r=isNaN(r)?0:r,{n:e,centerX:s,centerY:r,segLen:t,segWidth:n,showAngleTag:Y.checked,showPrevSeq:A.checked}}function G({n:e,segLen:t,segWidth:n}){let s=[];return!Number.isInteger(e)&&s.push("n doit être un nombre entier"),e>30&&s.push("n ne doit pas dépasser 30"),e<1&&s.push("n ne doit pas être plus petit que 1"),!Number.isInteger(t)&&s.push("La longueur des segments doit être un nombre entier"),t<1&&s.push("La longueur des segments ne doit pas être plus petit que 1"),t>100&&s.push("La longueur des segments ne doit pas dépasser 100"),!Number.isInteger(n)&&s.push("L'épaisseur des segments doit être un nombre entier"),n<1&&s.push("L'épaisseur des segments ne doit pas être plus petite que 1"),n>5&&s.push("L'épaisseur des segments ne doit pas dépasser 5"),s}function x({n:e,centerX:t,centerY:n,segLen:s,segWidth:r,showAngleTag:i,showPrevSeq:o}){W.value=e.toString(),B.value=t.toString(),X.value=n.toString(),T.value=s.toString(),S.value=r.toString(),Y.checked=i??!1,A.checked=o??!0}function P(){x(m.preset_12),g(u())}P();document.getElementById("draw_button").addEventListener("click",()=>{g(u())});document.addEventListener("keypress",e=>e.key==="Enter"&&g(u()));document.getElementById("reset_button").addEventListener("click",P);Object.entries(m).forEach(([e,t])=>document.getElementById(e).addEventListener("click",()=>{x(t),g(u())}));[["fig_rang_1",{n:1,centerX:.5,centerY:.5,width:60,height:60,segLen:30,segWidth:1}],["fig_rang_2",{n:2,centerX:.5,centerY:1.5,width:42.5,height:62.5,segLen:20,segWidth:1}],["fig_rang_3",{n:3,centerX:1.5,centerY:.5,width:82.5,height:62.5,segLen:20,segWidth:1}],["fig_rang_4",{n:4,centerX:4,centerY:1,width:105,height:75,segLen:15,segWidth:1}],["fig_rang_5",{n:5,centerX:5.5,centerY:2.5,width:72.5,height:82.5,segLen:10,segWidth:1}],["fig_rang_12",{n:12,centerX:55,centerY:12,width:200,height:136,segLen:2,segWidth:1}],["fig_rang_13",{n:13,centerX:90,centerY:48,width:116,height:138,segLen:1,segWidth:1}]].forEach(([e,t])=>K(document.getElementById(e),t));
