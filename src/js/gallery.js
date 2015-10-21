$(document).ready(function() {

    // Get images
    $('.gallery .image').each(function() {

        // Image
        var img = $('img', this),
            src = img.attr('src');

        // Hide image
        $(img).hide();

        // Add image as background on A tag
        $(this).attr('style', 'background-image: url('+ src +')');

        // Add lightbox property
        $(this).attr('data-lightbox', 'gallery');

    });

});
