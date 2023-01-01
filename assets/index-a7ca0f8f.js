(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const n=document.getElementById("canvas"),t=n.getContext("2d");n.width=document.body.clientWidth;n.height=document.body.clientHeight;const m=Math.floor(window.innerWidth/window.innerHeight),i={leafRadius:()=>Math.random()*20+10,hex:()=>`rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,treeAngle:()=>Math.random()*20+5,branchWidth:()=>(Math.random()*(window.innerWidth*5/100)+20)/m,leafLimit:()=>Math.floor(Math.random()*5)+5,nop:a=>Math.round(Math.random())==1?-a:a,curve:()=>Math.random()*10};let f=i.treeAngle(),c=i.curve(),h=window.innerWidth*10/100+window.innerHeight*10/100;function l(a,s,o,d,e,r){if(t.beginPath(),t.save(),t.strokeStyle=r.branch,t.lineWidth=e,t.fillStyle=r.leaf,t.shadowBlur=10,t.shadowColor="black",t.translate(a,s),t.rotate(w(d)),t.moveTo(0,0),d>0?t.bezierCurveTo(c,-o/2,c,-o/2,0,-o):t.bezierCurveTo(c,-o/2,-c,-o/2,0,-o),t.stroke(),o<10){t.beginPath(),t.arc(0,-o,i.leafRadius(),0,Math.PI/2),t.fill(),t.restore();return}o*=.75,e=Math.max(2,e*.5),l(0,-o,o,d+f,e,r),l(0,-o,o,d-f,e,r),t.restore(),console.log(h)}function w(a){return a*Math.PI/180}l(n.width/2,n.height,h,0,i.branchWidth(),{branch:i.hex(),leaf:i.hex()});window.addEventListener("resize",()=>{n.width=window.innerWidth,n.height=window.innerHeight,h=window.innerWidth*10/100+window.innerHeight*10/100,l(n.width/2,n.height,h,0,i.branchWidth(),{branch:i.hex(),leaf:i.hex()})});
