$(document).ready(function ($) {
    $('#jsCloseSession').click(() => {
        $.ajax({
            url: '/sign_out',
            method: 'DELETE',
            success: response => {
                alert('Session cerrada');
                return location.reload();
            }
        });

        return false;
    });
});