$(document).ready(function ($) {
  function prepagoListElement(data){
    return '<label class="radio-inline">' +
      `<input type="radio" name="prepago_id" id="optionsRadiosInline_${data.id}" value="${data.id}">${data.orders} envios` +
      '</label>';
  }

  function prepagoUserListElement(data){
    return '<tr>' +
      '<td><div class="checkbox">' +
      '<label>' +
      `<input type="checkbox" id="actionTo_${data.id}" value="">` +
      '</label>' +
      '</div></td>' +
      `<td>${data.id}</td>` +
      `<td>${data.username}</td>` +
      `<td>${data.prepagoData.orders} Envios</td>` +
      `<td>$${data.prepagoData.price}</td>` +
      `<td>${calculateEndDate(data.prepago_start_at)}</td>` +
      `<td>${getStatus(data.prepago_active)}</td>` +
      '</tr>';
  }

  function getStatus(status){
    return status ? 'Activo' : 'Inactivo';
  }

  function calculateEndDate(startDate){
    if (startDate === null)
      return '----------'
    let startDateFormat = new Date(startDate);
    startDateFormat.setMonth(startDateFormat.getMonth() + 1);
    return new Intl.DateTimeFormat('es-MX').format(startDateFormat);
  }

  $('#activateUser').click( () => {
    $.each($('input[id^=actionTo_]:checked'), (index, objectElement) => {
      let userId = objectElement.getAttribute('id').replace(/actionTo_/,'');
      $.ajax({
        url: `/prepagos/active_user/${userId}`,
        type: "POST",
        success: function (response) {
          if (response.error)
            return alert(response.error);
          
          location.reload();
        }
      });

    });

    return false;
  });

  $('#unActivateUser').click( () => {
    $.each($('input[id^=actionTo_]:checked'), (index, objectElement) => {
      let userId = objectElement.getAttribute('id').replace(/actionTo_/,'');
      $.ajax({
        url: `/prepagos/unactive_user/${userId}`,
        type: "POST",
        success: function (response) {
          if (response.error)
            return alert(response.error);
          
          location.reload();
        }
      });

    });

    return false;
  });

  $('#cancelPrepagoUser').click( () => {
    $.each($('input[id^=actionTo_]:checked'), (index, objectElement) => {
      let userId = objectElement.getAttribute('id').replace(/actionTo_/,'');
      $.ajax({
        url: `/prepagos/cancel_user/${userId}`,
        type: "POST",
        success: function (response) {
          if (response.error)
            return alert(response.error);
          
          location.reload();
        }
      });

    });

    return false;
  });

  if ($('#prepagoUserLists').length)
    $.get('/prepagos/users_list', users => {
      if (users.error)
        return alert(users.error);

      users.forEach( user => {
        $('#prepagoUserLists tbody').append(prepagoUserListElement(user));
      });

      $('#userListTable').DataTable({
        'language': {
          "sProcessing": "Procesando...",
          "sLengthMenu": "Mostrar _MENU_ registros",
          "sZeroRecords": "No se encontraron resultados",
          "sEmptyTable": "Ningún dato disponible en esta tabla",
          "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
          "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
          "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
          "sInfoPostFix": "",
          "sSearch": "Buscar:",
          "sUrl": "",
          "sInfoThousands": ",",
          "sLoadingRecords": "Cargando...",
          "oPaginate": {
            "sFirst": "Primero",
            "sLast": "Último",
            "sNext": "Siguiente",
            "sPrevious": "Anterior"
          },
          "oAria": {
            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
          }
        }
      });
    });

  function addUserData(data){
    return `<option value="${data.id}">${data.username}|${data.name}</option>`;
  }

  if ($('#addNewPrepagoUserForm').length){
    $.get('/prepagos', prepagos => {
      if (prepagos.error)
        return alert(prepagos.error);

      prepagos.forEach(prepago => {
        $('#jsPrepagoList').append(prepagoListElement(prepago));
      });
    });

    $.get('/users/not_prepago', users => {
      if (users.error)
        return alert(users.error);

      users.forEach(user => {
        $('#actualUserList').append(addUserData(user));
      });
    });
  }

  $('#save_prepago').click( () => {
    if ($('#actualUserList').val() === '')
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

      $.ajax({
        url: `/users/${$('#actualUserList').val()}/make_prepago`,
        type: "POST",
        data: { prepagoId: $('input[type=radio]:checked').val() },
        success: function (response) {
          if (response.error)
            return alert(response.error);

          window.location.href = response.next_url;
        }
      });

    return false;
  });
});