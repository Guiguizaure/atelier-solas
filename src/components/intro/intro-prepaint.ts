import { INTRO_STORAGE_KEY } from "./intro-session";
import { SHIRT, collectShirt, drawShirt, drawStatic, layoutShirt } from "./shirt-geometry";

/*
 * Inline scripts for the home page, run while the HTML is parsed, before the first paint:
 * - INTRO_PREPAINT (right after the intro markup): decides whether the intro plays, and
 *   if so draws the closed shirt with the same geometry code React uses afterwards.
 *   Already seen in this session, or a #section link: the intro is hidden by CSS.
 *   Any error also falls back to « seen », so the site is never locked behind the intro.
 * - SITE_INERT (right after the site wrapper): makes the site inert during the intro,
 *   so keyboard focus cannot reach it before React hydrates.
 * Without JavaScript neither runs and a <noscript> style hides the intro.
 */
export const INTRO_PREPAINT = `(function(){var d=document.documentElement;try{
var seen=false;try{seen=sessionStorage.getItem(${JSON.stringify(INTRO_STORAGE_KEY)})==="1"}catch(e){}
if(seen||location.hash.length>1){d.dataset.intro="seen";return}
var root=document.getElementById("intro"),W=root.clientWidth,H=root.clientHeight,C=${JSON.stringify(SHIRT)};
var geo=(${layoutShirt.toString()})(W,H,C),els=(${collectShirt.toString()})(root);
(${drawStatic.toString()})(els,geo);(${drawShirt.toString()})(els,geo,[0,0,0,0,0,0,0],C);
d.style.setProperty("--vh",H+"px");d.dataset.intro="on";
}catch(e){d.dataset.intro="seen"}})();`;

export const SITE_INERT = `if(document.documentElement.dataset.intro==="on")document.getElementById("site").inert=true;`;
