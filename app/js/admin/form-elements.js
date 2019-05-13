$(document).ready(function ($) {

  $(".uploadlogo").change(function () {
    var filename = readURL(this);
    $(this).parent().children('span').html(filename);
  });

  function readURL(input) {
    var url = input.value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0] && (
      ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "gif" || ext == "pdf"
    )) {
      var path = $(input).val();
      var filename = path.replace(/^.*\\/, "");
      return "Nombre de archivo : " + filename;
    } else {
      $(input).val("");
      return "Solo imagenes/pdf son soportados!";
    }
  }

  (function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["../datepicker"], factory);
    } else {
      factory(jQuery.datepicker);
    }
  }(function (datepicker) {
    datepicker.regional['es-MX'] = {
      closeText: 'Cerrar',
      prevText: '< Anterior',
      nextText: 'Siguiente >',
      currentText: 'Hoy',
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
      weekHeader: 'Sm',
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''
    };
    datepicker.setDefaults(datepicker.regional['es-MX']);
    return datepicker.regional['es-MX'];
  }));
  $('#selectDateTime').datetimepicker();
});