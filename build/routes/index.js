"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageResizing_1 = __importDefault(require("./api/imageResizing"));
var routes = express_1.default.Router();
routes.use('/api/images', imageResizing_1.default);
routes.get('/', function (request, response) {
    response.send('<h1 style="color:CornflowerBlue;text-align: center;">Welcom to Image Resizer API</h1>' +
        '<div style=" font-weight:bold;' +
        'background:LavenderBlush;' +
        'color:CornflowerBlue;' +
        'margin: auto; ' +
        'width: 60%;' +
        'border: 5px solid lightpink;' +
        'padding: 10px;">' +
        '<p> Make sure to have a valid image name. Do not forget adding the new dimensionsif you want to resize the image!</p>' +
        '<br><br><p>Services provided by image resizer:<ul><li>To dispaly original image use: <a href="/api/images?imageName=imageName">/api/images?imageName=imageName</a></li><li>To resize an image: <a href="/api/images?imageName=imageName&width=100&height=100">' +
        '/api/images?imageName=imageName&width=100&height=100</a></li></ul></p></div>');
});
exports.default = routes;
