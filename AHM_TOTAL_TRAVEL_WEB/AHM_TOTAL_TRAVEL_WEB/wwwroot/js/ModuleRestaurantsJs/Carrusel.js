var imagesArray = [];
var imagesArrayPure = [];

$(document).ready(async function () {
    await GetImage();
});

async function GetImage() {
    var responseImage = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/RootFiles/GetAllImages?folderName=" + folderName)
    if (responseImage.code == 200) {
        var list = responseImage.data
        for (var i = 0; i < list.length; i++) {
            var imageUrl = list[i].imageUrl;

            var split = imageUrl.split("/");
            var fileName = split[split.length - 1];
            var file = await createBlob(imageUrl)
                .then(function (data) {
                    return data;
                });

            imagesArrayPure.push(file);
            const fileData = await convertImage(file)
                .then(function (data) {
                    return data;
                });

            fileData.fileName = fileName;
            imagesArray.push(fileData);
        }
        LoadImage();
    }
}

function LoadImage() {

    var RestaurantCarousel = `<div class="fotorama" data-nav="thumbs" data-allowfullscreen="true" id="RestaurantCarousel" data-auto="false"></div>`;
    $("#RestaurantCarousel").replaceWith(RestaurantCarousel);
    $("#image-upload-list").html("");

    for (let i = 0; i < imagesArray.length; i++) {
        var HTML_img = document.createElement('img');
        const item = imagesArray[i];

        HTML_img.src = item.src;       
        $("#RestaurantCarousel").append(HTML_img);
    }
    $("#RestaurantCarousel").fotorama();
}