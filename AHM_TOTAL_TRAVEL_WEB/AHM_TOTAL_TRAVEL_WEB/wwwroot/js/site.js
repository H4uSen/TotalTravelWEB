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
