"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var app_config_1 = require("./app/app.config");
var app_component_1 = require("./app/app.component");
(0, platform_browser_1.bootstrapApplication)(app_component_1.AppComponent, app_config_1.appConfig)
    .catch(function (err) { return console.error(err); });
document.addEventListener("DOMContentLoaded", function () {
    var galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(function (item, index) {
        var countSpan = item.querySelector("#count".concat(index + 1));
        if (countSpan) {
            countSpan.textContent = "".concat(index + 1);
        }
    });
});
