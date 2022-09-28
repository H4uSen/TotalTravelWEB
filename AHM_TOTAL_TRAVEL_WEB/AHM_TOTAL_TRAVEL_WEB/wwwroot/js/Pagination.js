

(function ($) {
    /* función privada*/
    function createTableFooterPagination(idTable, nTdsColspan, last) {
        var pagination =
            `<div class="ui right floated pagination menu">
                <a class="icon item paginationInit">
                    <i class="left chevron icon"></i>
                </a>`;
        for (var i = 1; i <= last; i++) {
            pagination += `<a class="item paginationClick">${i}</a>`;
        }
        pagination +=
            `<a class="icon item paginationEnd">
                    <i class="right chevron icon"></i>
                </a>
            </div>`;

        tfoot =
            `<tfoot class="full-width">
            <tr>
                <th colspan="${nTdsColspan}">
                    ${pagination}                                 
                </th>
            </tr>
        </tfoot>`;

        idTable.find("tfoot").remove();
        idTable.find("tbody").before(tfoot);
    }



    $.fn.paginationTdA = function (options) {

        var settings = $.extend({
            elemPerPage: 5
        }, options);


        var idTable = $(this);

        //Configuramos los TRs para comenzar con el plugin
        //de cada TR del table tbody agregamos la clase con la que haremos los calculos
        idTable.find("tbody").eq(0).find("tr").each(function () {
            $(this).addClass("elementToPaginate");
        });

        var elemPerPage = settings.elemPerPage;
        var totalElem = idTable.find("tbody").eq(0).find(".elementToPaginate").length;
        var first = 1;
        var division = Math.round(parseInt(totalElem) / elemPerPage);
        var last = totalElem > elemPerPage ? division : first;
        if ((elemPerPage * last) < totalElem) {
            last += 1;
        }


        var numberOfTds = idTable.find("thead").eq(0).find("tr").eq(0).find("th").length;
        createTableFooterPagination(idTable, numberOfTds, last);

        idTable.find("tbody").eq(0).find(".elementToPaginate").each(function (i) {
            $(this)
                .attr("data-number", (i + 1));
            // Ocultamos solo los que no sean inferiores o iguales al elemPerPage (para visualizar los primeros)
            if ((i + 1) > elemPerPage) {
                $(this).hide();
            }
        });

        /* Al clicar sobre un numero de la paginacion realizamos el algoritmo */
        $("body").on("click", ".paginationClick", function (e) {
            e.preventDefault();
            idTable.find("tbody").eq(0).find(".elementToPaginate").hide();
            var nClicked = $(this).html();
            var startIn = (elemPerPage * (nClicked - 1)) + 1;
            var stopIn = (elemPerPage * nClicked);

            for (var i = startIn; i <= stopIn; i++) {
                idTable.find("tbody").eq(0).find(".elementToPaginate[data-number='" + i + "']").fadeIn();
            }

        });

        /* Al clicar en 'primero' emulamos el algoritmo con nClicked = 1 (como si hubieramos clicado en 1)*/
        $("body").on("click", ".paginationInit", function (e) {
            e.preventDefault();
            idTable.find("tbody").eq(0).find(".elementToPaginate").hide();
            var nClicked = 1;
            var startIn = (elemPerPage * (nClicked - 1)) + 1;
            var stopIn = (elemPerPage * nClicked);

            for (var i = startIn; i <= stopIn; i++) {
                idTable.find("tbody").eq(0).find(".elementToPaginate[data-number='" + i + "']").fadeIn();
            }
        });

        /* Al clicar en 'ultimo' emulamos el algoritmo con nClicked = last (como si hubieramos clicado en el ultimo numero)*/
        $("body").on("click", ".paginationEnd", function (e) {
            e.preventDefault();
            idTable.find("tbody").eq(0).find(".elementToPaginate").hide();
            var nClicked = last;
            var startIn = (elemPerPage * (nClicked - 1)) + 1;
            var stopIn = (elemPerPage * nClicked);

            for (var i = startIn; i <= stopIn; i++) {
                idTable.find("tbody").eq(0).find(".elementToPaginate[data-number='" + i + "']").fadeIn();
            }
        });

        //});


        return this;

    };

}(jQuery));