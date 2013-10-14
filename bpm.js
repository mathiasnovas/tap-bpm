jQuery(function ($) {

    var lastClick = 0;
        numbs = [],
        count = 0,
        pool = 0;
    
    $(document).on('click', function () {
        
        var timeNow = (new Date()).getTime();

        if (count > 0) {
            var diff = (timeNow - lastClick) / 1000,
                hardBPM = 60/diff;

            numbs.push(hardBPM);

            console.log(hardBPM);
        }

        lastClick = timeNow;
        count ++;

    });
});

