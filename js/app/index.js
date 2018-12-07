var $ = require('jquery');
window.jQuery = $;
window.$ = $;

function toggleHandler(e){e.addEventListener("click",function(e){e.preventDefault(),this.classList.contains("active")===!0?this.classList.remove("active"):this.classList.add("active")})}$("a.open_close").on("click",function(){$(".main-menu").toggleClass("show"),$(".layer").toggleClass("layer-is-visible")}),$("a.show-submenu").on("click",function(){$(this).next().toggleClass("show_normal")}),$("a.show-submenu-mega").on("click",function(){$(this).next().toggleClass("show_mega")}),$(window).width()<=600&&$("a.open_close").on("click",function(){$(".cmn-toggle-switch").removeClass("active")});for(var toggles=document.querySelectorAll(".cmn-toggle-switch"),i=toggles.length-1;i>=0;i--){var toggle=toggles[i];toggleHandler(toggle)}
/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */
!function(t,i,e,s){function o(i,e){var h=this;"object"==typeof e&&(delete e.refresh,delete e.render,t.extend(this,e)),this.$element=t(i),!this.imageSrc&&this.$element.is("img")&&(this.imageSrc=this.$element.attr("src"));var r=(this.position+"").toLowerCase().match(/\S+/g)||[];if(r.length<1&&r.push("center"),1==r.length&&r.push(r[0]),("top"==r[0]||"bottom"==r[0]||"left"==r[1]||"right"==r[1])&&(r=[r[1],r[0]]),this.positionX!=s&&(r[0]=this.positionX.toLowerCase()),this.positionY!=s&&(r[1]=this.positionY.toLowerCase()),h.positionX=r[0],h.positionY=r[1],"left"!=this.positionX&&"right"!=this.positionX&&(this.positionX=isNaN(parseInt(this.positionX))?"center":parseInt(this.positionX)),"top"!=this.positionY&&"bottom"!=this.positionY&&(this.positionY=isNaN(parseInt(this.positionY))?"center":parseInt(this.positionY)),this.position=this.positionX+(isNaN(this.positionX)?"":"px")+" "+this.positionY+(isNaN(this.positionY)?"":"px"),navigator.userAgent.match(/(iPod|iPhone|iPad)/))return this.imageSrc&&this.iosFix&&!this.$element.is("img")&&this.$element.css({backgroundImage:"url("+this.imageSrc+")",backgroundSize:"cover",backgroundPosition:this.position}),this;if(navigator.userAgent.match(/(Android)/))return this.imageSrc&&this.androidFix&&!this.$element.is("img")&&this.$element.css({backgroundImage:"url("+this.imageSrc+")",backgroundSize:"cover",backgroundPosition:this.position}),this;this.$mirror=t("<div />").prependTo("body");var a=this.$element.find(">.parallax-slider"),n=!1;0==a.length?this.$slider=t("<img />").prependTo(this.$mirror):(this.$slider=a.prependTo(this.$mirror),n=!0),this.$mirror.addClass("parallax-mirror").css({visibility:"hidden",zIndex:this.zIndex,position:"fixed",top:0,left:0,overflow:"hidden"}),this.$slider.addClass("parallax-slider").one("load",function(){h.naturalHeight&&h.naturalWidth||(h.naturalHeight=this.naturalHeight||this.height||1,h.naturalWidth=this.naturalWidth||this.width||1),h.aspectRatio=h.naturalWidth/h.naturalHeight,o.isSetup||o.setup(),o.sliders.push(h),o.isFresh=!1,o.requestRender()}),n||(this.$slider[0].src=this.imageSrc),(this.naturalHeight&&this.naturalWidth||this.$slider[0].complete||a.length>0)&&this.$slider.trigger("load")}function h(s){return this.each(function(){var h=t(this),r="object"==typeof s&&s;this==i||this==e||h.is("body")?o.configure(r):h.data("px.parallax")?"object"==typeof s&&t.extend(h.data("px.parallax"),r):(r=t.extend({},h.data(),r),h.data("px.parallax",new o(this,r))),"string"==typeof s&&("destroy"==s?o.destroy(this):o[s]())})}!function(){for(var t=0,e=["ms","moz","webkit","o"],s=0;s<e.length&&!i.requestAnimationFrame;++s)i.requestAnimationFrame=i[e[s]+"RequestAnimationFrame"],i.cancelAnimationFrame=i[e[s]+"CancelAnimationFrame"]||i[e[s]+"CancelRequestAnimationFrame"];i.requestAnimationFrame||(i.requestAnimationFrame=function(e){var s=(new Date).getTime(),o=Math.max(0,16-(s-t)),h=i.setTimeout(function(){e(s+o)},o);return t=s+o,h}),i.cancelAnimationFrame||(i.cancelAnimationFrame=function(t){clearTimeout(t)})}(),t.extend(o.prototype,{speed:.2,bleed:0,zIndex:-100,iosFix:!0,androidFix:!0,position:"center",overScrollFix:!1,refresh:function(){this.boxWidth=this.$element.outerWidth(),this.boxHeight=this.$element.outerHeight()+2*this.bleed,this.boxOffsetTop=this.$element.offset().top-this.bleed,this.boxOffsetLeft=this.$element.offset().left,this.boxOffsetBottom=this.boxOffsetTop+this.boxHeight;var t=o.winHeight,i=o.docHeight,e=Math.min(this.boxOffsetTop,i-t),s=Math.max(this.boxOffsetTop+this.boxHeight-t,0),h=this.boxHeight+(e-s)*(1-this.speed)|0,r=(this.boxOffsetTop-e)*(1-this.speed)|0;if(h*this.aspectRatio>=this.boxWidth){this.imageWidth=h*this.aspectRatio|0,this.imageHeight=h,this.offsetBaseTop=r;var a=this.imageWidth-this.boxWidth;this.offsetLeft="left"==this.positionX?0:"right"==this.positionX?-a:isNaN(this.positionX)?-a/2|0:Math.max(this.positionX,-a)}else{this.imageWidth=this.boxWidth,this.imageHeight=this.boxWidth/this.aspectRatio|0,this.offsetLeft=0;var a=this.imageHeight-h;this.offsetBaseTop="top"==this.positionY?r:"bottom"==this.positionY?r-a:isNaN(this.positionY)?r-a/2|0:r+Math.max(this.positionY,-a)}},render:function(){var t=o.scrollTop,i=o.scrollLeft,e=this.overScrollFix?o.overScroll:0,s=t+o.winHeight;this.boxOffsetBottom>t&&this.boxOffsetTop<=s?(this.visibility="visible",this.mirrorTop=this.boxOffsetTop-t,this.mirrorLeft=this.boxOffsetLeft-i,this.offsetTop=this.offsetBaseTop-this.mirrorTop*(1-this.speed)):this.visibility="hidden",this.$mirror.css({transform:"translate3d(0px, 0px, 0px)",visibility:this.visibility,top:this.mirrorTop-e,left:this.mirrorLeft,height:this.boxHeight,width:this.boxWidth}),this.$slider.css({transform:"translate3d(0px, 0px, 0px)",position:"absolute",top:this.offsetTop,left:this.offsetLeft,height:this.imageHeight,width:this.imageWidth,maxWidth:"none"})}}),t.extend(o,{scrollTop:0,scrollLeft:0,winHeight:0,winWidth:0,docHeight:1<<30,docWidth:1<<30,sliders:[],isReady:!1,isFresh:!1,isBusy:!1,setup:function(){if(!this.isReady){var s=t(e),h=t(i),r=function(){o.winHeight=h.height(),o.winWidth=h.width(),o.docHeight=s.height(),o.docWidth=s.width()},a=function(){var t=h.scrollTop(),i=o.docHeight-o.winHeight,e=o.docWidth-o.winWidth;o.scrollTop=Math.max(0,Math.min(i,t)),o.scrollLeft=Math.max(0,Math.min(e,h.scrollLeft())),o.overScroll=Math.max(t-i,Math.min(t,0))};h.on("resize.px.parallax load.px.parallax",function(){r(),o.isFresh=!1,o.requestRender()}).on("scroll.px.parallax load.px.parallax",function(){a(),o.requestRender()}),r(),a(),this.isReady=!0}},configure:function(i){"object"==typeof i&&(delete i.refresh,delete i.render,t.extend(this.prototype,i))},refresh:function(){t.each(this.sliders,function(){this.refresh()}),this.isFresh=!0},render:function(){this.isFresh||this.refresh(),t.each(this.sliders,function(){this.render()})},requestRender:function(){var t=this;this.isBusy||(this.isBusy=!0,i.requestAnimationFrame(function(){t.render(),t.isBusy=!1}))},destroy:function(e){var s,h=t(e).data("px.parallax");for(h.$mirror.remove(),s=0;s<this.sliders.length;s+=1)this.sliders[s]==h&&this.sliders.splice(s,1);t(e).data("px.parallax",!1),0===this.sliders.length&&(t(i).off("scroll.px.parallax resize.px.parallax load.px.parallax"),this.isReady=!1,o.isSetup=!1)}});var r=t.fn.parallax;t.fn.parallax=h,t.fn.parallax.Constructor=o,t.fn.parallax.noConflict=function(){return t.fn.parallax=r,this},t(e).on("ready.px.parallax.data-api",function(){t('[data-parallax="scroll"]').parallax()})}(jQuery,window,document);


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

var iCheck = require('icheck');
var magnificPopup = require('magnific-popup');
var placeholder = require('jquery-placeholder');

import 'bootstrap';
import WOW from 'wow.js'
import morphText from 'morph-text'

$(function() {

/* ==============================================
  Preload
=============================================== */
$(window).load(function() { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(250).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(250).css({'overflow':'visible'});
  $('#sub_content').addClass('animated zoomIn');
  $(window).scroll();
  $('.number').each(function () {
    $(this).prop('Counter',0).animate({
      Counter: $(this).text()
    }, {
      duration: 2000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
  });
})
/* ==============================================
  Sticky nav
=============================================== */
$(window).scroll(function(){
  'use strict';
  if ($(this).scrollTop() > 1){  
    $('header').addClass("sticky");
  }
  else{
    $('header').removeClass("sticky");
  }
});
/* ==============================================
  Common
=============================================== */
new WOW().init();

jQuery(function($) {
  "use strict";
  function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog"),
      offset = ($(window).height() - $dialog.height()) / 2,
      bottomMargin = parseInt($dialog.css('marginBottom'), 10);
    if (offset < bottomMargin) offset = bottomMargin;
    $dialog.css("margin-top", offset);
  }
  $('.modal').on('show.bs.modal', centerModal);
  $('.modal-popup .close-link').click(function(event){
    event.preventDefault();
    $('.modal').modal('hide');
  });
  $(window).on("resize", function() {
    $('.modal:visible').each(centerModal);
  });
});

//<!-- Magnific popup -->	
  $(function () {
'use strict';
    $('.video_pop').magnificPopup({type:'iframe'});	/* video modal*/
    /* Gallery images modal*/
    $('.magnific-gallery').each(function() {
      $(this).magnificPopup({
        delegate: 'a', 
        type: 'image',
        gallery:{enabled:true},
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
          beforeOpen: function() {
            // just a hack that adds mfp-anim class to markup 
            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
            this.st.mainClass = this.st.el.attr('data-effect');
          }
        },
        closeOnContentClick: true,
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
      });
    }); 
  }); 

//<!-- Radio and checkbox styles -->	
  $('input.icheck').iCheck({
    checkboxClass: 'icheckbox_square-grey',
    radioClass: 'iradio_square-grey'
  });

//<!-- Collapse filters close on mobile-->	
  if( $(this).width() < 991 )
{
  $('.collapse#collapseFilters').removeClass('in');
  $('.collapse#collapseFilters').addClass('out');
}
else
{
  $('.collapse#collapseFilters').removeClass('out');
  $('.collapse#collapseFilters').addClass('in');
};

//<!-- Tooltip -->	
  $('.tooltip-1').tooltip({html:true});

//<!-- Pace holder -->	
  $('input, textarea').placeholder();

//<!-- Accordion -->	
  function toggleChevron(e) {
    $(e.target)
      .prev('.panel-heading')
      .find("i.indicator")
      .toggleClass('icon_plus_alt2 icon_minus_alt2');
  }
$('.panel-group').on('hidden.bs.collapse shown.bs.collapse', toggleChevron);

//<!-- Cat nav onclick active -->	
  $('ul#cat_nav li a').on('click', function(){
    $('ul#cat_nav li a.active').removeClass('active');
    $(this).addClass('active');
  });

//<!-- Drop down menu options-->	
  $('.dropdown-menu').on("click",function(e) {e.stopPropagation();});  /* top drodown prevent close*/

function determineDropDirection(){
  $(".dropdown-menu").each( function(){
    // Invisibly expand the dropdown menu so its true height can be calculated
    $(this).css({
      visibility: "hidden",
      display: "block"
    });
    // Necessary to remove class each time so we don't unwantedly use dropup's offset top
    $(this).parent().removeClass("dropup");
    // Determine whether bottom of menu will be below window at current scroll position
    if ($(this).offset().top + $(this).outerHeight() > $(window).innerHeight() + $(window).scrollTop()){
      $(this).parent().addClass("dropup");
    }
    // Return dropdown menu to fully hidden state
    $(this).removeAttr("style");
  });
}
determineDropDirection();
$(window).scroll(determineDropDirection);

$("a.add_to_basket").on("click",function(){
  $(".dropdown").removeClass("open");
});
  var source, destination;
  var directionsDisplay;
  var countryRestrict = {'country': 'mx'};
  var directionsService = new google.maps.DirectionsService();
  google.maps.event.addDomListener(window, 'load', function () {
    new google.maps.places.autocomplete(document.getElementById('txtSource'), {
      types: ['(regions)'],
      componentRestrictions: countryRestrict
    });
    
  var mumbai = new google.maps.LatLng(20.6737777, -103.4054536);
  var mapOptions = {
    zoom: 12,
    center: mumbai
  };

  var map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
  var infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      var geocoder = new google.maps.Geocoder;
      var latlng = {
        lat: position.coords.latitude, lng: position.coords.longitude
      };

      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            $('#txtSource').val(results[0].formatted_address)
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });

      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }

  window.GetRoute = () => {

    directionsDisplay.setMap(map);

    directionsDisplay.addListener('directions_changed', function() {
      let request = directionsDisplay.getDirections().request;
      let source = request.origin.query ? request.origin.query : request.origin;
      let destination = request.destination.query ? request.destination.query : request.destination;
      putDistanceAndDuration(source, destination);
    });

    let source = document.getElementById("txtSource").value;
    let destination = document.getElementById("txtDestination").value;

    var request = {
      origin: source,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });

    putDistanceAndDuration(source, destination);

    function putDistanceAndDuration(source, destination){
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
          var distance = response.rows[0].elements[0].distance.text;
          var duration = response.rows[0].elements[0].duration.text;
          var price;
          var metros = response.rows[0].elements[0].distance.value;
          if(metros <= 3000){
            price = '$35.00';
          }else{
            var calc =(35 + ((metros - 3000)/1000) * 5.5).toFixed(2);
            price = '$' + calc;
          }

          document.getElementById("distance-value").innerHTML = "Distancia: " + distance;
          document.getElementById("time-value").innerHTML = "Duración: " + duration;
          document.getElementById("price-value").innerHTML = "Precio: " + price;
        } else {
          alert("Unable to find the distance via road.");
        }
      });
    }
  }
});
