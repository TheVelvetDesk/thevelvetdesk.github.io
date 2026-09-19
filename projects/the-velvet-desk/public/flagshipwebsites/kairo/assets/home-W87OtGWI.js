(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const O=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" aria-hidden="true"><defs>
<radialGradient id="brothGrad" cx="50%" cy="42%" r="65%">
<stop offset="0%" stop-color="#f6c96e"/>
<stop offset="55%" stop-color="#e9a83c"/>
<stop offset="85%" stop-color="#c97f22"/>
<stop offset="100%" stop-color="#a55f14"/>
</radialGradient>
<radialGradient id="brothSheen" cx="38%" cy="30%" r="70%">
<stop offset="0%" stop-color="#ffffff" stop-opacity="0.32"/>
<stop offset="45%" stop-color="#ffffff" stop-opacity="0.07"/>
<stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
</radialGradient>
<radialGradient id="innerRimGrad" cx="50%" cy="45%" r="62%">
<stop offset="0%" stop-color="#f7ecd9"/>
<stop offset="72%" stop-color="#ecdcbe"/>
<stop offset="100%" stop-color="#d7c09c"/>
</radialGradient>
<linearGradient id="outerGlazeGrad" x1="25%" y1="0%" x2="75%" y2="100%">
<stop offset="0%" stop-color="#3c3733"/>
<stop offset="45%" stop-color="#211e1b"/>
<stop offset="100%" stop-color="#100e0d"/>
</linearGradient>
<radialGradient id="outerRimGrad" cx="50%" cy="40%" r="65%">
<stop offset="0%" stop-color="#4d4741"/>
<stop offset="60%" stop-color="#2b2724"/>
<stop offset="100%" stop-color="#151210"/>
</radialGradient>
<linearGradient id="chashuGrad" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stop-color="#bb7c50"/>
<stop offset="48%" stop-color="#9a5b33"/>
<stop offset="100%" stop-color="#78401f"/>
</linearGradient>
<linearGradient id="chashuEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#8a4a22"/>
<stop offset="55%" stop-color="#6d3517"/>
<stop offset="100%" stop-color="#4f2410"/>
</linearGradient>
<linearGradient id="fatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#f4e3c8"/>
<stop offset="60%" stop-color="#e7cba4"/>
<stop offset="100%" stop-color="#d3ae83"/>
</linearGradient>
<linearGradient id="eggWhiteGrad" x1="30%" y1="0%" x2="70%" y2="100%">
<stop offset="0%" stop-color="#fdf8ee"/>
<stop offset="60%" stop-color="#f2e8d4"/>
<stop offset="100%" stop-color="#e0d2b6"/>
</linearGradient>
<radialGradient id="yolkGrad" cx="42%" cy="40%" r="68%">
<stop offset="0%" stop-color="#ffc14d"/>
<stop offset="55%" stop-color="#f39c1f"/>
<stop offset="100%" stop-color="#d4760e"/>
</radialGradient>
<linearGradient id="noriGrad" x1="0%" y1="0%" x2="70%" y2="100%">
<stop offset="0%" stop-color="#3d5240"/>
<stop offset="55%" stop-color="#26382b"/>
<stop offset="100%" stop-color="#182420"/>
</linearGradient>
<radialGradient id="sesameGrad" cx="40%" cy="35%" r="70%">
<stop offset="0%" stop-color="#f7e9c8"/>
<stop offset="100%" stop-color="#d9bd8c"/>
</radialGradient>
<radialGradient id="steamGrad" cx="50%" cy="70%" r="60%">
<stop offset="0%" stop-color="#ffffff" stop-opacity="0.0"/>
<stop offset="55%" stop-color="#ffffff" stop-opacity="0.10"/>
<stop offset="100%" stop-color="#ffffff" stop-opacity="0.28"/>
</radialGradient>
<radialGradient id="shadowGrad" cx="50%" cy="50%" r="55%">
<stop offset="0%" stop-color="#000000" stop-opacity="0.30"/>
<stop offset="70%" stop-color="#000000" stop-opacity="0.12"/>
<stop offset="100%" stop-color="#000000" stop-opacity="0"/>
</radialGradient>
<radialGradient id="footGrad" cx="50%" cy="30%" r="70%">
<stop offset="0%" stop-color="#26221f"/>
<stop offset="100%" stop-color="#0c0a09"/>
</radialGradient>
</defs>
<g id="raw">
<g transform="translate(275 325) rotate(-25)">
<path d="M-95 -20 Q-120 -55 -92 -64 Q-75 -66 -62 -43 L66 -43 Q84 -71 104 -59 Q129 -41 97 -20 Q129 0 103 20 Q82 36 65 6 L-64 6 Q-90 33 -108 11 Q-124 -8 -95 -20" fill="#ded0b4" stroke="#a99474" stroke-width="3"/>
<path d="M-63 -27 L58 -27" stroke="#f8ead2" stroke-width="8" stroke-linecap="round"/>
</g>
<g transform="translate(485 340) rotate(18)">
<path d="M-50 -76 Q-12 -88 26 -64 L46 70 Q1 92 -45 62 Z" fill="url(#noriGrad)"/>
<path d="M-29 -63 L-21 64 M-10 -63 L0 71 M12 -57 L24 64" stroke="#6c7752" stroke-width="3" fill="none"/>
</g>
<g transform="translate(301 529) rotate(-18)">
<ellipse rx="65" ry="49" fill="#c6ae80"/>
<ellipse cy="-9" rx="65" ry="44" fill="#ead9b6"/>
<path d="M-47 -6 Q-29 -32 -8 -6 T33 -6 M-42 6 Q-18 -20 4 6 T46 6 M-31 18 Q-7 -8 15 18 M-29 -20 Q-6 -40 17 -20" fill="none" stroke="#bda171" stroke-width="4" stroke-linecap="round"/>
</g>
<g transform="translate(461 546) rotate(24)">
<ellipse rx="37" ry="48" fill="url(#eggWhiteGrad)"/>
</g>
<g transform="translate(510 494) rotate(-22)">
<ellipse rx="35" ry="46" fill="#bb8660"/>
<path d="M-18 -20 Q-29 0 -17 14" stroke="#d4ad86" stroke-width="5" fill="none" stroke-linecap="round"/>
</g>
<g stroke-linecap="round" fill="none">
<path d="M357 651 Q453 604 584 526" stroke="#677d48" stroke-width="10"/>
<path d="M357 651 L385 635" stroke="#e6dcc2" stroke-width="12"/>
<path d="M349 636 Q423 592 557 506" stroke="#82945c" stroke-width="9"/>
<path d="M349 636 L379 619" stroke="#e6dcc2" stroke-width="11"/>
</g>
</g>
<g id="bowl">
<ellipse cx="406" cy="455" rx="269" ry="265" fill="url(#shadowGrad)"/>
<ellipse cx="400" cy="672" rx="150" ry="34" fill="url(#footGrad)"/>
<path d="M150 440 C150 574 262 690 400 690 C538 690 650 574 650 440 Z" fill="url(#outerGlazeGrad)"/>
<path d="M150 440 C150 574 262 690 400 690 C538 690 650 574 650 440 Z" fill="url(#brothSheen)" opacity="0.12"/>
<ellipse cx="400" cy="440" rx="250" ry="250" fill="url(#outerRimGrad)"/>
<ellipse cx="400" cy="440" rx="232" ry="232" fill="url(#innerRimGrad)"/>
<ellipse cx="400" cy="440" rx="204" ry="204" fill="#b6a284"/>
</g>
<g id="broth">
<ellipse cx="400" cy="440" rx="204" ry="204" fill="url(#brothGrad)"/>
<ellipse cx="400" cy="438" rx="204" ry="204" fill="url(#brothSheen)" opacity="0.6"/>
<ellipse cx="345" cy="368" rx="56" ry="30" fill="#ffe3a1" opacity="0.35"/>
<ellipse cx="470" cy="520" rx="70" ry="34" fill="#b96f1c" opacity="0.30"/>
<ellipse cx="520" cy="390" rx="34" ry="16" fill="#ffdf94" opacity="0.28"/>
<ellipse cx="310" cy="510" rx="40" ry="20" fill="#b96f1c" opacity="0.25"/>
<circle cx="430" cy="330" r="7" fill="#f9d98c" opacity="0.5"/>
<circle cx="352" cy="318" r="5" fill="#f9d98c" opacity="0.45"/>
<circle cx="500" cy="345" r="6" fill="#f9d98c" opacity="0.4"/>
<circle cx="272" cy="420" r="5" fill="#f9d98c" opacity="0.4"/>
<circle cx="543" cy="470" r="5" fill="#f9d98c" opacity="0.4"/>
<circle cx="488" cy="572" r="6" fill="#f9d98c" opacity="0.35"/>
<circle cx="305" cy="565" r="5" fill="#f9d98c" opacity="0.35"/>
</g>
<g id="noodles">
<path d="M255 430 C290 395 340 390 372 418 C400 443 388 486 352 496 C322 504 296 484 300 458 C304 434 330 424 350 438" fill="none" stroke="#f0d9a8" stroke-width="13" stroke-linecap="round" opacity="0.97"/>
<path d="M282 505 C310 476 360 470 398 494 C434 516 432 560 396 572 C366 582 338 564 342 538" fill="none" stroke="#eed39c" stroke-width="13" stroke-linecap="round"/>
<path d="M330 372 C360 344 412 342 444 368 C474 392 468 434 432 444 C404 452 380 434 384 410" fill="none" stroke="#f2ddb0" stroke-width="13" stroke-linecap="round"/>
<path d="M400 470 C430 444 478 446 506 472 C532 496 526 536 490 544 C464 550 444 534 448 512" fill="none" stroke="#ecd098" stroke-width="13" stroke-linecap="round"/>
<path d="M440 392 C466 366 512 368 538 394 C562 418 554 456 520 462 C496 466 478 450 482 430" fill="none" stroke="#f0d7a4" stroke-width="12" stroke-linecap="round"/>
<path d="M300 452 C322 428 358 424 380 442 C400 460 394 490 366 496 C346 500 330 486 334 468" fill="none" stroke="#e8c98e" stroke-width="11" stroke-linecap="round"/>
<path d="M420 520 C444 498 482 498 504 518 C524 536 518 566 490 570 C470 573 456 558 460 540" fill="none" stroke="#e5c385" stroke-width="11" stroke-linecap="round"/>
<path d="M362 350 C386 330 422 332 440 352 C456 370 448 396 422 400 C404 403 392 390 396 374" fill="none" stroke="#e9cd93" stroke-width="11" stroke-linecap="round"/>
<path d="M480 440 C500 420 534 424 552 444 C568 462 560 490 534 494 C516 497 504 484 508 468" fill="none" stroke="#e2bd7d" stroke-width="10" stroke-linecap="round"/>
<path d="M262 486 C284 464 320 464 338 484 C354 502 346 528 320 532 C302 535 290 522 294 506" fill="none" stroke="#e6c68a" stroke-width="10" stroke-linecap="round"/>
<path d="M352 556 C374 538 408 540 424 558 C438 574 430 598 406 600 C390 601 380 588 384 574" fill="none" stroke="#e0bf80" stroke-width="10" stroke-linecap="round"/>
<path d="M470 348 C490 332 520 336 534 354 C546 370 538 392 516 394 C502 395 494 384 498 372" fill="none" stroke="#e7c88c" stroke-width="9" stroke-linecap="round"/>
</g>
<g id="chashu">
<g transform="translate(300 350) rotate(-18)">
<ellipse cx="0" cy="4" rx="62" ry="56" fill="#5f3315" opacity="0.35"/>
<path d="M-60 0 C-62 -34 -34 -58 2 -56 C38 -54 60 -30 58 2 C56 34 28 56 -6 54 C-38 52 -58 30 -60 0 Z" fill="url(#chashuGrad)"/>
<path d="M-60 0 C-62 -34 -34 -58 2 -56 C38 -54 60 -30 58 2 C56 34 28 56 -6 54 C-38 52 -58 30 -60 0 Z" fill="none" stroke="url(#chashuEdgeGrad)" stroke-width="7"/>
<path d="M-40 -14 C-26 -34 6 -40 26 -26 C44 -14 46 10 32 24 C18 38 -10 38 -26 24 C-40 12 -46 -2 -40 -14 Z" fill="none" stroke="url(#fatGrad)" stroke-width="6" stroke-linecap="round"/>
<path d="M-18 -8 C-10 -20 6 -22 16 -12 C26 -2 24 12 12 20 C0 28 -14 24 -20 12 C-24 4 -22 -2 -18 -8 Z" fill="url(#fatGrad)" opacity="0.9"/>
<path d="M-46 22 C-30 30 -6 32 14 26" fill="none" stroke="url(#fatGrad)" stroke-width="4" stroke-linecap="round" opacity="0.75"/>
<path d="M30 -40 C40 -30 48 -16 48 -2" fill="none" stroke="url(#fatGrad)" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
</g>
<g transform="translate(508 470) rotate(24)">
<ellipse cx="0" cy="4" rx="58" ry="52" fill="#5f3315" opacity="0.35"/>
<path d="M-56 0 C-58 -32 -32 -54 2 -52 C36 -50 56 -28 54 2 C52 32 26 52 -6 50 C-36 48 -54 28 -56 0 Z" fill="url(#chashuGrad)"/>
<path d="M-56 0 C-58 -32 -32 -54 2 -52 C36 -50 56 -28 54 2 C52 32 26 52 -6 50 C-36 48 -54 28 -56 0 Z" fill="none" stroke="url(#chashuEdgeGrad)" stroke-width="7"/>
<path d="M-36 -12 C-24 -30 4 -36 22 -24 C38 -12 40 8 28 22 C14 36 -10 34 -24 22 C-36 12 -42 0 -36 -12 Z" fill="none" stroke="url(#fatGrad)" stroke-width="6" stroke-linecap="round"/>
<path d="M-14 -6 C-6 -18 8 -18 16 -8 C24 2 20 14 10 20 C0 26 -12 20 -16 10 C-18 4 -18 -2 -14 -6 Z" fill="url(#fatGrad)" opacity="0.9"/>
<path d="M-42 18 C-26 26 -4 28 12 22" fill="none" stroke="url(#fatGrad)" stroke-width="4" stroke-linecap="round" opacity="0.75"/>
</g>
<g transform="translate(368 560) rotate(8)">
<ellipse cx="0" cy="4" rx="54" ry="48" fill="#5f3315" opacity="0.35"/>
<path d="M-52 0 C-54 -30 -30 -50 2 -48 C34 -46 52 -26 50 2 C48 30 24 48 -6 46 C-34 44 -50 26 -52 0 Z" fill="url(#chashuGrad)"/>
<path d="M-52 0 C-54 -30 -30 -50 2 -48 C34 -46 52 -26 50 2 C48 30 24 48 -6 46 C-34 44 -50 26 -52 0 Z" fill="none" stroke="url(#chashuEdgeGrad)" stroke-width="6"/>
<path d="M-32 -10 C-22 -26 4 -30 20 -20 C34 -10 36 8 24 20 C12 32 -10 30 -22 18 C-32 8 -38 0 -32 -10 Z" fill="none" stroke="url(#fatGrad)" stroke-width="5" stroke-linecap="round"/>
<path d="M-10 -4 C-4 -14 8 -14 14 -6 C20 2 16 12 8 16 C0 20 -10 14 -12 6 C-13 2 -12 0 -10 -4 Z" fill="url(#fatGrad)" opacity="0.9"/>
</g>
</g>
<g id="egg">
<g transform="translate(442 323) rotate(-25)">
<ellipse rx="49" ry="67" fill="#8a542b"/>
<ellipse rx="45" ry="63" fill="url(#eggWhiteGrad)"/>
<ellipse cy="12" rx="29" ry="32" fill="url(#yolkGrad)"/>
<path d="M-16 5 Q-4 -6 12 0" fill="none" stroke="#ffd17a" stroke-width="4" stroke-linecap="round"/>
</g>
<g transform="translate(531 363) rotate(25)">
<ellipse rx="47" ry="64" fill="#8a542b"/>
<ellipse rx="43" ry="60" fill="url(#eggWhiteGrad)"/>
<ellipse cy="11" rx="28" ry="30" fill="url(#yolkGrad)"/>
</g>
</g>
<g id="garnish">
<path d="M249 364 L213 272 L300 235 L345 329 Z" fill="url(#noriGrad)"/>
<path d="M244 274 L277 345 M263 265 L294 337 M282 257 L310 328" fill="none" stroke="#76916b" stroke-width="2" opacity=".35"/>
<g fill="#273e1c" stroke="#85a35c" stroke-width="5">
<ellipse cx="376" cy="440" rx="13" ry="8" transform="rotate(25 376 440)"/>
<ellipse cx="401" cy="416" rx="11" ry="7"/>
<ellipse cx="414" cy="450" rx="12" ry="8" transform="rotate(-35 414 450)"/>
<ellipse cx="352" cy="460" rx="12" ry="7"/>
<ellipse cx="390" cy="480" rx="13" ry="8"/>
<ellipse cx="430" cy="478" rx="10" ry="7"/>
<ellipse cx="359" cy="409" rx="10" ry="7"/>
</g>
<g fill="url(#sesameGrad)">
<ellipse cx="300" cy="400" rx="2" ry="5" transform="rotate(35 300 400)"/>
<ellipse cx="334" cy="480" rx="2" ry="5"/>
<ellipse cx="456" cy="409" rx="2" ry="5"/>
<ellipse cx="447" cy="553" rx="2" ry="5" transform="rotate(65 447 553)"/>
<ellipse cx="465" cy="540" rx="2" ry="5"/>
<ellipse cx="399" cy="369" rx="2" ry="5"/>
<ellipse cx="287" cy="498" rx="2" ry="5"/>
<ellipse cx="340" cy="359" rx="2" ry="5"/>
</g>
</g>
<g id="steam" fill="none" stroke="url(#steamGrad)" stroke-width="15" stroke-linecap="round">
<path d="M346 428 C292 362 393 324 345 247 S343 169 363 136"/>
<path d="M405 403 C457 345 369 308 410 241 S446 169 428 119"/>
<path d="M468 454 C520 390 446 345 483 296"/>
</g>
</svg>`,q=[{id:"broth",index:"01",kicker:"The Foundation",title:"Eighteen hours of patience",body:"Kombu wakes in cold water at dawn. Chicken bones and smoked pork ribs surrender to a gentle simmer — until the broth turns deep amber.",detail:"Yield per batch — 14 bowls"},{id:"noodles",index:"02",kicker:"The Backbone",title:"Cut to order, never before",body:"A 38% hydration dough rests, folds, and rests again. Hand-cut into thick wavy strands thirty seconds before they meet the broth.",detail:"Ashitaba flour, 38% hydration"},{id:"chashu",index:"03",kicker:"The Ember",title:"Seared over binchotan",body:"Pork belly braised overnight in soy, mirin, and sake, then kissed by white charcoal until the edges char and the fat turns to silk.",detail:"Rolled, braised, torched"},{id:"egg",index:"04",kicker:"The Heart",title:"Thirteen and a half minutes",body:"Precisely timed, shocked in ice, marinated for two days. The white sets to custard while the yolk holds its molten center.",detail:"Ajitama, 36-hour marinade"},{id:"garnish",index:"05",kicker:"The Assembly",title:"One bowl at a time",body:"Nori from Kyushu, scallion cut a handspan from the bowl, a whisper of black garlic oil. Then the bowl leaves the counter, still breathing steam.",detail:"Served within 90 seconds"}],P=e=>Math.min(1,Math.max(0,e)),R=e=>{const t=P(e);return t*t*(3-2*t)},L=["broth","noodles","chashu","egg","garnish"];function W(e,t=!1){const r=L.map(o=>R(e[o]??0)),a=[[0,0],[-70,-130],[115,-80],[-120,65],[100,110]];return{raw:1-r[0],steam:r[4],ingredients:L.map((o,s)=>{const l=r[s];return{id:o,opacity:t?1:l,x:t?0:a[s][0]*(1-l),y:t?0:a[s][1]*(1-l),scale:t?1:.88+l*.12}})}}function Y({sections:e,video:t,onUpdate:r}){const a=Array.from(e),o=window.matchMedia("(prefers-reduced-motion: reduce)"),s=c=>Math.min(1,Math.max(0,c));let l=0,h=0;const u=()=>{l=0;const c=window.innerHeight,k={};let v=null;a.forEach(f=>{const p=f.getBoundingClientRect();k[f.dataset.act]=s((c*.7-p.top)/Math.max(1,p.height*.85)),p.top<=c*.6&&(v=f.dataset.act)}),h=Object.values(k).reduce((f,p)=>f+p,0)/Math.max(1,a.length),r({progress:k,active:v,global:h,reducedMotion:o.matches})},i=()=>{l||(l=requestAnimationFrame(u))};return window.addEventListener("scroll",i,{passive:!0}),window.addEventListener("resize",i),o.addEventListener("change",i),u(),()=>{cancelAnimationFrame(l),window.removeEventListener("scroll",i),window.removeEventListener("resize",i),o.removeEventListener("change",i)}}const Q={value:0},$=document.querySelector("[data-backdrop]"),F=document.querySelector("[data-stage-inner]"),N=document.querySelector("[data-stage-caption]"),T=document.querySelector("[data-acts]"),B=document.querySelector("[data-nav]");F.innerHTML=O;const y=Object.fromEntries(["bowl","raw","broth","noodles","chashu","egg","garnish","steam"].map(e=>[e,F.querySelector(`#${e}`)]));T.innerHTML=q.map(e=>`
  <section class="act" id="${e.id}" data-act="${e.id}" aria-labelledby="title-${e.id}">
    <div class="act-card">
      <p class="act-index">${e.index} <span>/ 05</span></p>
      <p class="act-kicker">${e.kicker}</p>
      <h2 class="act-title" id="title-${e.id}">${e.title}</h2>
      <p class="act-body">${e.body}</p>
      <p class="act-detail">${e.detail}</p>
    </div>
  </section>`).join("");const E=document.querySelector("[data-stage]"),j=document.querySelector(".stage-wrap"),b=document.querySelector("[data-stage-video]"),S=document.querySelector("[data-stage-final]"),d=b.querySelector("[data-scroll-video]");let G=0,g=!1;d.preload="auto";d.pause();const m=()=>{Number.isFinite(d.duration)&&d.duration>0&&(G=d.duration),d.readyState>=2&&!g&&(g=!0,console.info("[kairo] scroll video ready, duration",G.toFixed(2)))};d.addEventListener("loadedmetadata",m);d.addEventListener("loadeddata",m);d.addEventListener("canplay",m);d.addEventListener("seeked",()=>{});d.addEventListener("seeking",()=>{});d.addEventListener("error",()=>{console.warn("[kairo] scroll video error",d.error)});m();d.load();window.__kairoVideo=d;const z=window.matchMedia("(prefers-reduced-motion: reduce)"),Z=(e,t)=>{const r={el:e,duration:0,ready:!1};e.pause();const a=()=>{Number.isFinite(e.duration)&&e.duration>0&&(r.duration=e.duration),e.readyState>=2&&!r.ready&&(r.ready=!0,console.info(`[kairo] ${t} ready, duration`,r.duration.toFixed(2)))};return e.addEventListener("loadedmetadata",a),e.addEventListener("loadeddata",a),e.addEventListener("canplay",a),e.addEventListener("error",()=>console.warn(`[kairo] ${t} error`,e.error)),a(),e.load(),r},x=Z($.querySelector("[data-bg-hero]"),"bg street"),w=Z($.querySelector("[data-bg-table]"),"bg table"),C=(e,t)=>{if(!e.ready||e.duration<=0||document.hidden)return;const r=M(t)*Math.max(0,e.duration-.05);if(Math.abs(e.el.currentTime-r)>.03)try{e.el.currentTime=r}catch{}},A=()=>{if(z.matches)x.el.style.opacity=1,w.el.style.opacity=0;else{C({el:d,duration:G,ready:g},Q.value/5);const e=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),t=M(window.scrollY/e);C(x,t/.8),C(w,(t-.75)/.25);const r=H((t-.78)/.12);x.el.style.opacity=(1-r).toFixed(3),w.el.style.opacity=r.toFixed(3)}requestAnimationFrame(A)};requestAnimationFrame(A);const M=e=>Math.min(1,Math.max(0,e)),H=e=>{const t=M(e);return t*t*(3-2*t)};Y({sections:T.querySelectorAll("[data-act]"),video:null,onUpdate:({progress:e,active:t,global:r,reducedMotion:a})=>{const o=W(e,a);y.bowl.style.opacity=a?1:1-o.raw,y.raw.style.opacity=a?0:o.raw,o.ingredients.forEach(i=>{y[i.id].style.opacity=i.opacity,y[i.id].style.transform=`translate(${i.x}px, ${i.y}px) scale(${i.scale})`}),y.steam.style.opacity=a?0:o.steam,N.textContent=r>=.999?"The signature bowl · ready to serve":t?`${q.find(i=>i.id===t).index} / 05 · ${t}`:"Before the first simmer",document.documentElement.style.setProperty("--progress",r);const l=["broth","noodles","chashu","egg","garnish"].reduce((i,c)=>i+(e[c]??0),0);Q.value=l,a||!g?(b.style.opacity=0,S.style.opacity=0,E.style.opacity=1):(b.style.opacity=1,S.style.opacity=H((l-4.55)/.45).toFixed(3),E.style.opacity=0),B.classList.toggle("is-solid",window.scrollY>40);const h=window.scrollY>window.innerHeight*.35,u=document.documentElement.scrollHeight-window.scrollY-window.innerHeight>140;j.style.opacity=h&&u?1:0}});const n=document.querySelector("#reservation");document.querySelector("[data-reserve]").addEventListener("click",()=>n.showModal());document.querySelector("[data-close]").addEventListener("click",()=>n.close());n.addEventListener("click",e=>{if(e.target===n){const t=n.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&n.close()}});
