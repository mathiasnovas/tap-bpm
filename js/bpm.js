jQuery(function ($) {
    var lastClick = 0;
        count = 0,
        canvas = $('#canvas');

    $(document).on('click', function () {
        var timeNow = (new Date()).getTime();

        if (count > 0) {
            var diff = (timeNow - lastClick) / 1000,
                hardBPM = 60/diff;

            canvas.html(Math.round(hardBPM));
        }

        lastClick = timeNow;
        count ++;
    });
});

