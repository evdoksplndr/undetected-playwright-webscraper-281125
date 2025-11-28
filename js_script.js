(function () {
    'use strict';

    const noop = () => {};
    window.addEventListener('devtoolschange', noop, true);
    window.dispatchEvent(new Event('devtoolschange')); 

    const realInnerHeight = window.innerHeight;
    Object.defineProperty(window, 'outerHeight', {
        get: () => realInnerHeight + Math.floor(Math.random() * 80) + 50, 
        configurable: false
    });
    Object.defineProperty(window, 'outerWidth', {
        get: () => window.innerWidth + Math.floor(Math.random() * 20),
        configurable: false
    });

    const cdc_patterns = [/^(\$cdc_.*)/, /cdc_.*$/, /\$cdc_\$?/];
    function deleteCdc(obj = window, depth = 0) {
        if (depth > 6) return;
        for (const key in obj) {
            if (cdc_patterns.some(p => p.test(key))) {
                try { delete obj[key]; } catch(e) {}
            }
        }
        if (obj.__proto__) deleteCdc(obj.__proto__, depth + 1);
    }
    deleteCdc();

    Object.defineProperty(window, 'chrome', {
        value: {
            runtime: undefined,
            debugger: undefined,
            app: undefined,
            csi: undefined,
            loadTimes: undefined
        },
        writable: false,
        configurable: false
    });

    ['Runtime', 'Debugger', 'Inspector', 'Page'].forEach(name => {
        Object.defineProperty(window, name, {
            value: undefined,
            writable: false,
            configurable: false
        });
    });

    const desc = Object.getOwnPropertyDescriptor(Navigator.prototype, 'webdriver');
    Object.defineProperty(Navigator.prototype, 'webdriver', {
        get: () => undefined,
        configurable: true
    });
    if (navigator.__proto__) {
        try { delete navigator.__proto__.webdriver; } catch(e) {}
    }

    const addNoise = (data) => {
        for (let i = 0; i < data.data.length; i += 4) {
            data.data[i] += Math.floor((Math.random() - 0.5) * 6);
            data.data[i + 1] += Math.floor((Math.random() - 0.5) * 4);
            data.data[i + 2] += Math.floor((Math.random() - 0.5) * 3);
        }
        return data;
    };

    const origGetImageData = CanvasRenderingContext2D.prototype.getImageData;
    CanvasRenderingContext2D.prototype.getImageData = function (...args) {
        const data = origGetImageData.apply(this, args);
        return addNoise(data);
    };

    const origToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function (...args) {
        const ctx = this.getContext('2d');
        if (ctx) {
            const imgData = ctx.getImageData(0, 0, this.width, this.height);
            ctx.putImageData(addNoise(imgData), 0, 0);
        }
        return origToDataURL.apply(this, args);
    };

    const origOsc = AudioContext.prototype.createOscillator;
    AudioContext.prototype.createOscillator = function () {
        const osc = origOsc.call(this);
        osc.frequency.value += (Math.random() - 0.5) * 15;
        return osc;
    };
    Object.defineProperty(navigator, 'plugins', {
        get: () => [
            { name: "Chrome PDF Plugin", filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai" },
            { name: "Chrome PDF Viewer", filename: "internal-pdf-viewer" }
        ],
        configurable: true
    });

    const getParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function (param) {
        if (param === 37445) return 'Intel Inc.';
        if (param === 37446) return 'Intel Iris OpenGL Engine';
        if (param === 7938) return 'WebKit';
