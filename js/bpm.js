jQuery(function ($) {
    var lastClick = 0;
        count = 0,
        canvas = $('#canvas'),
        pool = [];

    $(document).on('click', function () {
        var timeNow = (new Date()).getTime(),
            sum = 0;

        if (count > 0) {
            var diff = (timeNow - lastClick) / 1000,
                hardBPM = 60/diff;

            pool.push(hardBPM);

            for (var i = 0; i < pool.length; i++) {
                sum += pool[i];
            }

            canvas.html(Math.round(sum/pool.length));
        }

        lastClick = timeNow;
        count ++;
    });
});

