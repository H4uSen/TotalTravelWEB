var imagesArray = [];
var imagesArrayPure = [];

$(document).ready(async function () {
    await GetImage();

});

async function GetImage() {


    var list = menusImage;
    var file = await createBlob(list)
        .then(function (data) {
            return data;
        });
    imagesArrayPure.push(file);
    const fileData = await convertImage(file)
        .then(function (data) {
            return data;
        });
    fileData.fileName = "Menu-" + menuID + "_photo-1.jpg";
    imagesArray.push(fileData);
    LoadImage();

}

function LoadImage() {

    var MenusCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="MenusCarousel" data-auto="false"></div>`;
    $("#MenusCarousel").replaceWith(MenusCarousel);
    $("#image-upload-list").html("");

    for (let i = 0; i < imagesArray.length; i++) {
        var HTML_img = document.createElement('img');
        const item = imagesArray[i];

        HTML_img.src = item.src;
        const fileItem =
            `<div class="item">
                                <i class="image big icon"></i>
                                <div class="content text-grap">
                                    ${item.fileName}
                                </div>
                            </div>`;

        $("#image-upload-list").append(fileItem);
        $("#MenusCarousel").append(HTML_img);
    }
    $("#MenusCarousel").fotorama();
}