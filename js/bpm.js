jQuery(function ($) {

    /**
     * Assign variables.
     */
    var lastClick = 0,
        doc = $(document),
        count = 0,
        canvas = $('#canvas'),
        pool = [];

    /**
     * Start the BPM mapping when clicking the document.
     *
     * It will always be 0 the first time you click as two values
     * are necessary to calculate the BPM.
     */
    doc.on('click', function () {
        var timeNow = (new Date()).getTime(),
            sum = 0,
            bpm = 0;

        // We need at least two values to compare.
        if (count > 0) {
            var diff = (timeNow - lastClick) / 1000,
                hardBpm = 60 / diff;

            pool.push(hardBpm);

            // Calculate the average BPM
            for (var i = 0; i < pool.length; i++) {
                sum += pool[i];
            }

            bpm = Math.round(sum / pool.length);

            // Empty the value pool every 10th click.
            if (count === 10) {
                pool = [];
                count = 1;
            }
        }

        // Display the BPM
        canvas.html(bpm);

        lastClick = timeNow;
        count ++;
    });
});

