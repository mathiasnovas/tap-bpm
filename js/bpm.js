jQuery(function ($) {

    /**
     * Assign variables.
     */
    var lastClick = 0,
        doc = $(document),
        count = 0,
        canvas = $('#canvas p');

    /**
     * Various calculations
     *
     * @type {Object}
     */
    var calculate = {
        /**
         * Return the difference between two values.
         *
         * It also divides the number by 1000 to convert the output into seconds.
         *
         * @param {Number} now
         * @param {Number} last
         * @return {Number}
         */
        difference: function (now, last) {
            return (now - last) / 1000;
        },
        /**
         * Return the average value of an array
         *
         * @param {Array} arr
         * @return {Number}
         */
        average: function (arr) {
            var sum = 0;

            for (var i = 0; i < arr.length; i++) {
                sum += arr[i];
            }

            return sum / arr.length;
        }
    }

    /**
     * Value pool for "remembering" previous BPMs
     *
     * @type {Object}
     */
    var pool = {
        array: [],
        /**
         * Add value to the pool.
         *
         * @param {Number} val
         */
        add: function (val) {
            pool.array.push(val);
        },
        /**
         * Clear the pool.
         */
        flush: function () {
            pool.array = [];
        },
        /**
         * Advance the array by releasing the oldest value and appending a new one.
         */
        advance: function () {
            pool.array.shift();
        }
    }

    /**
     * Start the BPM mapping when clicking the document or hitting a key.
     *
     * It will always be 0 the first time you click as two values
     * are necessary to calculate the BPM.
     */
    doc.on('click keydown touchstart', function () {
        var timeNow = (new Date()).getTime(),
            bpm = 0;

        // We need at least two values to compare.
        if (count > 0) {
            var difference = calculate.difference(timeNow, lastClick),
                rawBpm = 60 / difference;

            // Advance the value pool after the 10th click.
            if (count > 10) {
                pool.advance();
            }

            pool.add(rawBpm);

            // Get the average BPM.
            bpm = calculate.average(pool.array).toFixed(2);
        }

        // Animate "Flash" effect
        canvas.stop().animate({
            opacity: 0.25
        }, 10, function () {
            canvas.animate({
                opacity: 1
            }, 100);
        });

        // Display the BPM
        canvas.html(bpm);

        lastClick = timeNow;
        count ++;
    });

});
