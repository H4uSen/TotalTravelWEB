$(document).ready(function () {
    $('#example').DataTable({
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        }
    });
});

// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$('#popButton').popup({
    position: 'right center',
    popup: $('#popContent'),
    delay: {
        show: 100,
        hide: 800
    }
});