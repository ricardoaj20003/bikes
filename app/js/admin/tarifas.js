$(document).ready(function ($) {
  function prepagoUserListElement(data){
    return '<tr>' +
      '<td><div class="checkbox">' +
      '<label>' +
      `<input type="checkbox" id="actionTo_${data.id}" value="">` +
      '</label>' +
      '</div></td>' +
      `<td>${data.id}</td>` +
      `<td>${data.username}</td>` +
      `<td>${parseString(data.name)}</td>` +
      `<td>${parseString(data.phone)}</td>` +
      `<td>${parseString(data.is_admin)}</td>` +
      `<td><a href="tarifas/${data.id}"><i class="fa fa-pencil" aria-hidden="true" style="cursor: pointer"></i></a></td>` +
      '</tr>';
  }

  function validateAllFill(){
    var allFill = true;
    $.each($('#addUser .form-group.required'), function () {
      var value = $(this).find('input').val();
      if ($(this).find('input').val() === '') {
        allFill = false;
        return false;
      }

    });

    return allFill;
  }

  $('#updateUserPasswordSave').click( () => {
    if ($('input[name=password]').val() !== $('input[name=password_confirmation]').val() || $('input[name=password]').val() === ''){
      alert('Contraseña no coincide');
      return false;
    }

    let userId = window.location.href.split('/').pop();
    $.ajax({
      url: `/users/${userId}/update_password`,
      type: "POST",
      data: $(`#updateUserPassword_${userId}`).serialize(),
      success: function (response) {
        if (response.error)
          return alert(response.error);

        window.location.href = response.next_url;
      }
    });

    return false;
  });

  $('#updateUserSave').click( () => {
    if (!validateAllFill()) {
      alert('faltan campos');
      return false;
    }

    let userId = window.location.href.split('/').pop();
    $.ajax({
      url: `/users/${userId}/update`,
      type: "POST",
      data: $(`#updateUser_${userId}`).serialize(),
      success: function (response) {
        if (response.error)
          return alert(response.error);

        window.location.href = response.next_url;
      }
    });

    return false;
  });

  $('#saveUser').click( () => {
    if (!validateAllFill()) {
      alert('faltan campos');
      return false;
    }

    $.ajax({
      url: '/users',
      type: "POST",
      data: $('#addUser').serialize(),
      success: function (response) {
        if (response.error)
          return alert(response.error);

        window.location.href = response.next_url;
      }
    });

    return false;
  });

  if ($('#updateUserForm').length)
    $.get(`/users/${window.location.href.split('/').pop()}`, response => {
      delete response.password;
      Object.keys(response).forEach( attrName => {
        $(`#updateUserForm input[name=${attrName}]`).val(response[attrName])
      });
    });

  if ($('#tarifaUserLists').length)
    $.get('/users/not_prepago', users => {
      if (users.error)
        return alert(users.error);

      users.forEach( user => {
        $('#tarifaUserLists tbody').append(prepagoUserListElement(user));
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

  function parseString(cad){
    return cad === null ? '' : cad;
  }
});