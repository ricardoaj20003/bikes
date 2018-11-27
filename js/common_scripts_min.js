/* ==============================================
	Menu
=============================================== */
function toggleHandler(e){e.addEventListener("click",function(e){e.preventDefault(),this.classList.contains("active")===!0?this.classList.remove("active"):this.classList.add("active")})}$("a.open_close").on("click",function(){$(".main-menu").toggleClass("show"),$(".layer").toggleClass("layer-is-visible")}),$("a.show-submenu").on("click",function(){$(this).next().toggleClass("show_normal")}),$("a.show-submenu-mega").on("click",function(){$(this).next().toggleClass("show_mega")}),$(window).width()<=600&&$("a.open_close").on("click",function(){$(".cmn-toggle-switch").removeClass("active")});for(var toggles=document.querySelectorAll(".cmn-toggle-switch"),i=toggles.length-1;i>=0;i--){var toggle=toggles[i];toggleHandler(toggle)}
/* ============================================================
 * retina-replace.min.js v1.0
 * http://github.com/leonsmith/retina-replace-js
 * ============================================================
 * Author: Leon Smith
 * Twitter: @nullUK
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
(function(a){var e=function(d,c){this.options=c;var b=a(d),g=b.is("img"),f=g?b.attr("src"):b.backgroundImageUrl(),f=this.options.generateUrl(b,f);a("<img/>").attr("src",f).load(function(){g?b.attr("src",a(this).attr("src")):(b.backgroundImageUrl(a(this).attr("src")),b.backgroundSize(a(this)[0].width,a(this)[0].height));b.attr("data-retina","complete")})};e.prototype={constructor:e};a.fn.retinaReplace=function(d){var c;c=void 0===window.devicePixelRatio?1:window.devicePixelRatio;return 1>=c?this:this.each(function(){var b=
a(this),c=b.data("retinaReplace"),f=a.extend({},a.fn.retinaReplace.defaults,b.data(),"object"==typeof d&&d);c||b.data("retinaReplace",c=new e(this,f));if("string"==typeof d)c[d]()})};a.fn.retinaReplace.defaults={suffix:"_2x",generateUrl:function(a,c){var b=c.lastIndexOf("."),e=c.substr(b+1);return c.substr(0,b)+this.suffix+"."+e}};a.fn.retinaReplace.Constructor=e;a.fn.backgroundImageUrl=function(d){return d?this.each(function(){a(this).css("background-image",'url("'+d+'")')}):a(this).css("background-image").replace(/url\(|\)|"|'/g,
"")};a.fn.backgroundSize=function(d,c){var b=Math.floor(d/2)+"px "+Math.floor(c/2)+"px";a(this).css("background-size",b);a(this).css("-webkit-background-size",b)};a(function(){a("[data-retina='true']").retinaReplace()})})(window.jQuery);

/* Password strenght */
$(document).ready(function(){var password1=$('#password1');var password2=$('#password2');var passwordsInfo=$('#pass-info');passwordStrengthCheck(password1,password2,passwordsInfo);});function passwordStrengthCheck(password1,password2,passwordsInfo)
{var WeakPass=/(?=.{5,}).*/;var MediumPass=/^(?=\S*?[a-z])(?=\S*?[0-9])\S{5,}$/;var StrongPass=/^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])\S{5,}$/;var VryStrongPass=/^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[^\w\*])\S{5,}$/;$(password1).on('keyup',function(e){if(VryStrongPass.test(password1.val()))
{passwordsInfo.removeClass().addClass('vrystrongpass').html("Very Strong! (Awesome, please don't forget your pass now!)");}
else if(StrongPass.test(password1.val()))
{passwordsInfo.removeClass().addClass('strongpass').html("Strong! (Enter special chars to make even stronger");}
else if(MediumPass.test(password1.val()))
{passwordsInfo.removeClass().addClass('goodpass').html("Good! (Enter uppercase letter to make strong)");}
else if(WeakPass.test(password1.val()))
{passwordsInfo.removeClass().addClass('stillweakpass').html("Still Weak! (Enter digits to make good password)");}
else
{passwordsInfo.removeClass().addClass('weakpass').html("Very Weak! (Must be 5 or more chars)");}});$(password2).on('keyup',function(e){if(password1.val()!==password2.val())
{passwordsInfo.removeClass().addClass('weakpass').html("Passwords do not match!");}else{passwordsInfo.removeClass().addClass('goodpass').html("Passwords match!");}});}
/* Search modal */
$(".search-overlay-menu-btn").on("click",function(a){$(".search-overlay-menu").addClass("open"),$('.search-overlay-menu > form > input[type="search"]').focus()}),$(".search-overlay-close").on("click",function(a){$(".search-overlay-menu").removeClass("open")}),$(".search-overlay-menu, .search-overlay-menu .search-overlay-close").on("click keyup",function(a){(a.target==this||"search-overlay-close"==a.target.className||27==a.keyCode)&&$(this).removeClass("open")});
