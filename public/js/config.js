"use strict";

require.config({
    baseUrl: "js",
    optimize: "uglify",
    waitSeconds: 10,
    packages: [{
        name: 'jquery',
        location: '../libs/jquery',
        main: 'jquery.min'
    }],
    deps: ["main"]
});
//# sourceMappingURL=config.js.map