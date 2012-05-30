/*jslint white: true, devel: true, onevar: false, undef: true, nomen: false,
  regexp: true, plusplus: false, bitwise: true, newcap: true, maxerr: 50,
  indent: 4 */
/*global window: false, document: false, localStorage: false,
  escape: false, unescape: false */

(function () {

    var logElem;
    var log = function (s) {
        logElem.value = logElem.value + Date.now() + ': ' + s + '\n';
        logElem.scrollTop = logElem.scrollHeight;
    };

    var encode = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
    };

    var decode = function (s) {
        return decodeURIComponent(escape(window.atob(s)));
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
        var encoding = document.getElementById('use-encoding');
        var read = document.getElementById('read');
        var write = document.getElementById('write');
        var clear = document.getElementById('clear');

        var input = document.getElementById('input');
        var output = document.getElementById('output');

        read.addEventListener('click', function () {
            log('reading from localStorage');
            if (deviceReady || !require.checked) {
                var value = localStorage.getItem('test');

                if (encoding.checked) {
                    log('decode from localStorage');
                    value = decode(value);
                }

                output.value = value;
            } else {
                log('device not ready');
            }
        });
        write.addEventListener('click', function () {
            log('writing to localStorage');
            if (deviceReady || !require.checked) {
                var value = input.value;

                if (encoding.checked) {
                    log('encode to localStorage');
                    value = encode(value);
                }

                localStorage.setItem('test', value);
            } else {
                log('device not ready');
            }
        });

        clear.addEventListener('click', function () {
            log('clear localStorage');
            if (deviceReady || !require.checked) {
                localStorage.clear();
                input.value = '';
                output.value = '';
            } else {
                log('device not ready');
            }
        });

    }, false);
}());
