$(document).ready(function () {
    // validate form data

    var productId = '143249';
    var sizeRequestUrl = 'https://www.dollskill.com/codetest/api.php?ids=' + productId + '&op=get_size_attributes';

    $.getJSON(sizeRequestUrl, function (json) {
        console.log(json);
    });
});