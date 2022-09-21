"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var imageResizer_1 = __importDefault(require("./imageResizer")); // Image handling
var file = /** @class */ (function () {
    function file() {
    }
    /**
     * Determine image path.
     * @param {ImageParameters} params Parameters.
     * @param {string} [params.imageName] Image name.
     * @param {string} [params.height]
     * @param {string} [params.width]
     * @return {string|null} Path, if image exists, else it will be null.
     */
    /**
     * Check if an image exists
     * @param {string} [imageName=''] image name
     * @return {boolean} True if image exists, else false.
     */
    file.checkImage = function (imageName) {
        if (imageName === void 0) { imageName = ''; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!imageName) {
                            return [2 /*return*/, false]; //does not exist, exit
                        }
                        return [4 /*yield*/, file.getExistngImageNames()];
                    case 1: return [2 /*return*/, (_a.sent()).includes(imageName)];
                }
            });
        });
    };
    /**
     * Chech if certian thumb is alredy generated -- avoid redundancy
     * @param {ImageParameters} params Parameters.
     * @param {string} [params.imageName] imageName.
     * @param {string} [params.width]
     * @param {string} [params.height]
     * @return {boolean} True, if thumb exists with same dimensions, else false.
     */
    file.checkThumb = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!params.imageName || !params.width || !params.height) {
                            return [2 /*return*/, false];
                        }
                        filePath = path_1.default.resolve(file.imagesThumbPath, "".concat(params.imageName, "-").concat(params.width, "x").concat(params.height, ".jpg"));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.promises.access(filePath)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    file.generateThumbPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.promises.open(file.imagesThumbPath)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        fs_1.promises.mkdir(file.imagesThumbPath);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create thumb file.
     * @param {ImageParameters} params Parameters.
     * @param {string} [params.imageName] imageName.
     * @param {string} [params.width] Desired width.
     * @param {string} [params.height] Desired height.
     * @return {string|null} Error message or null.
     */
    file.generateThumb = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var filePathOriginal, filePathThumb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!params.imageName || !params.width || !params.height) {
                            //quick quit
                            //if some or all of the query segments are lost
                            return [2 /*return*/, null];
                        }
                        filePathOriginal = path_1.default.resolve(file.imagesOriginalPath, "".concat(params.imageName, ".jpg"));
                        filePathThumb = path_1.default.resolve(file.imagesThumbPath, "".concat(params.imageName, "-").concat(params.width, "x").concat(params.height, ".jpg"));
                        if (parseInt(params.width) > 0 && parseInt(params.height) > 0) {
                            console.log("image ".concat(filePathThumb, "'s thumb was created in dimensions of w").concat(params.width, "xh").concat(params.height, " "));
                        }
                        else {
                            console.log("Attempt to create thumb for image ".concat(filePathThumb, " has failed"));
                        }
                        return [4 /*yield*/, (0, imageResizer_1.default)({
                                sourceImagePath: filePathOriginal,
                                targetImagePath: filePathThumb,
                                height: parseInt(params.height),
                                width: parseInt(params.width),
                            })];
                    case 1: 
                    // Resize original image and store as thumb in image/thumb
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    file.getImagePath = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var imagePathTemp, imagePath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!params.imageName) {
                            //image was not found, or do not exist
                            return [2 /*return*/, null];
                        }
                        if (params.height && params.width) {
                            imagePathTemp = path_1.default.resolve(file.imagesThumbPath, "".concat(params.imageName, "-").concat(params.width, "x").concat(params.height, ".jpg"));
                        }
                        else {
                            imagePathTemp = path_1.default.resolve(file.imagesOriginalPath, "".concat(params.imageName, ".jpg"));
                        }
                        imagePath = imagePathTemp;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.promises.access(imagePath)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, imagePath];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Dispaly provided images
     * @return {string[]} list of existing images.
     */
    file.getExistngImageNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.promises.readdir(file.imagesOriginalPath)];
                    case 1: 
                    // get all images in images/original
                    return [2 /*return*/, (_b.sent()).map(function (imageName) { return imageName.split('.')[0]; } //string.split([separator][, limit]);
                        )];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, []]; //No images provided
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    file.imagesOriginalPath = path_1.default.resolve(__dirname, '../images/original');
    file.imagesThumbPath = path_1.default.resolve(__dirname, '../images/thumb');
    return file;
}());
exports.default = file;
