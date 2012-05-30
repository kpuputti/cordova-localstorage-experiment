/*jslint white: true, devel: true, onevar: false, undef: true, nomen: false,
  regexp: true, plusplus: false, bitwise: true, newcap: true, maxerr: 50,
  indent: 4 */
/*global window: false, document: false, localStorage: false */

(function () {

    var logElem;
    var log = function (s) {
        logElem.value = logElem.value + Date.now() + ': ' + s + '\n';
        logElem.scrollTop = logElem.scrollHeight;
    };

    window.addEventListener('DOMContentLoaded', function () {
        logElem = document.getElementById('log');
        log('dom content loaded');

        var deviceReady = false;

        document.addEventListener('deviceready', function () {
            log('device ready');
            deviceReady = true;
        }, false);

        var require = document.getElementById('require-deviceready');
        var read = document.getElementById('read');
        var write = document.getElementById('write');
        var input = document.getElementById('input');
        var output = document.getElementById('output');

        read.addEventListener('click', function () {
            log('reading from localStorage');
            if (deviceReady || !require.checked) {
                output.value = localStorage.getItem('test');
            } else {
                log('device not ready');
            }
        });
        write.addEventListener('click', function () {
            log('writing to localStorage');
            if (deviceReady || !require.checked) {
                localStorage.setItem('test', input.value);
            } else {
                log('device not ready');
            }
        });

    }, false);
}());
