$(document).ready(function ($) {
  function prepagoListElement(data){
    return '<label class="radio-inline">' +
      `<input type="radio" name="prepago_id" id="optionsRadiosInline_${data.id}" value="${data.id}">${data.orders} envios` +
      '</label>';
  }
  $.get('/prepagos', prepagos => {
    prepagos.forEach(prepago => {
      $('#jsPrepagoList').append(prepagoListElement(prepago));
    });
  });

  $('#save_prepago').click( () => {
    $.ajax({
      url: '/prepagos',
      type: "POST",
      data: $('#add_prepagoUser').serialize(),
      success: function (response) {
        if (response.error)
          return alert(response.error);

        window.location.href = response.next_url;
      }
    });

    return false;
  });
});