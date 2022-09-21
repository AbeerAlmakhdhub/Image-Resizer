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
var file_1 = __importDefault(require("./../file"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
describe('Test Image Resizer API', function () {
    describe('Valid inputs', function () {
        var _this = this;
        it('Accses valid image', function () { return __awaiter(_this, void 0, void 0, function () {
            var originalImage, errorInPath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        originalImage = path_1.default.resolve(file_1.default.imagesOriginalPath, 'flowersAndCathedral.jpg');
                        errorInPath = '';
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.promises.open(originalImage)];
                    case 2:
                        _b.sent();
                        errorInPath = null;
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        errorInPath = 'No such image';
                        return [3 /*break*/, 4];
                    case 4:
                        expect(errorInPath).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Resize an image with 500x350', function () { return __awaiter(_this, void 0, void 0, function () {
            var resizedImagePath, errorInPath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, file_1.default.generateThumb({
                            imageName: 'river',
                            width: '500',
                            height: '350',
                        })];
                    case 1:
                        _b.sent();
                        resizedImagePath = path_1.default.resolve(file_1.default.imagesThumbPath, "river-500x350.jpg");
                        errorInPath = '';
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs_1.promises.open(resizedImagePath)];
                    case 3:
                        _b.sent();
                        errorInPath = null;
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _b.sent();
                        errorInPath = 'No such image';
                        return [3 /*break*/, 5];
                    case 5:
                        expect(errorInPath).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Invalid inputs', function () {
        var _this = this;
        it('Invalid width (negative)', function () { return __awaiter(_this, void 0, void 0, function () {
            var shouldBeErorr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, file_1.default.generateThumb({
                            imageName: 'nonExistingImage',
                            width: '300',
                            height: '100',
                        })];
                    case 1:
                        shouldBeErorr = _a.sent();
                        expect(shouldBeErorr).not.toBeNull(); // will return invalid path
                        return [2 /*return*/];
                }
            });
        }); });
        it('Invalid width (negative)', function () { return __awaiter(_this, void 0, void 0, function () {
            var shouldBeErorr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, file_1.default.generateThumb({
                            imageName: 'bike',
                            width: '-300',
                            height: '100',
                        })];
                    case 1:
                        shouldBeErorr = _a.sent();
                        expect(shouldBeErorr).not.toBeNull(); // will return invalid path
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
it('Invalid height (zero)', function () { return __awaiter(void 0, void 0, void 0, function () {
    var shouldBeErorr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, file_1.default.generateThumb({
                    imageName: 'lake',
                    width: '200',
                    height: '0',
                })];
            case 1:
                shouldBeErorr = _a.sent();
                console.log(shouldBeErorr);
                expect(shouldBeErorr).not.toBeNull(); // will return invalid path
                return [2 /*return*/];
        }
    });
}); });
//clear cache
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var resizedImagePath, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                resizedImagePath = path_1.default.resolve(file_1.default.imagesThumbPath, 'river-500x350.jpg');
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs_1.promises.access(resizedImagePath)];
            case 2:
                _b.sent();
                fs_1.promises.unlink(resizedImagePath);
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
