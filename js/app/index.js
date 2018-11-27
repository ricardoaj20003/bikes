var $ = require('jquery');
window.jQuery = $;
window.$ = $;

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
  var directionsService = new google.maps.DirectionsService();
  google.maps.event.addDomListener(window, 'load', function () {
    new google.maps.places.SearchBox(document.getElementById('txtSource'));
    new google.maps.places.SearchBox(document.getElementById('txtDestination'));
    directionsDisplay = new google.maps.DirectionsRenderer({ 
      'draggable': true 
    });
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
