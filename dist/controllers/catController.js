"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCatList = exports.getSingleCat = exports.createCat = exports.getAllCats = exports.removeAllDocuments = void 0;
const http_status_codes_1 = require("http-status-codes");
const Cat_1 = __importDefault(require("../models/Cat"));
const errors_1 = require("../errors");
const removeAllDocuments = async (req, res) => {
    const db = await Cat_1.default.deleteMany({});
    res.status(http_status_codes_1.StatusCodes.OK).json(db);
};
exports.removeAllDocuments = removeAllDocuments;
const getAllCats = async (req, res) => {
    const cats = await Cat_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({ cats, count: cats.length });
};
exports.getAllCats = getAllCats;
const createCat = async (req, res) => {
    const { name, human } = req.body;
    if (!name || !human) {
        throw new errors_1.BadRequest("Please provide all values");
    }
    const cat = await Cat_1.default.create({ name, human });
    res.status(http_status_codes_1.StatusCodes.OK).json(cat);
};
exports.createCat = createCat;
const getSingleCat = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new errors_1.BadRequest("Please provide all values");
    }
    const cat = await Cat_1.default.findOne({ _id: id }).populate({
        path: "human",
        select: "name",
    });
    if (!cat) {
        throw new errors_1.BadRequest(`No cat with id ${req.params.id}`); // TODO Change not found
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(cat);
};
exports.getSingleCat = getSingleCat;
const toggleCatList = async (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    let cat = await Cat_1.default.findOne({ _id: id });
    if (!cat) {
        throw new errors_1.BadRequest(`No cat with id ${id}`);
    }
    const isCatOnList = await Cat_1.default.findOne({
        _id: id,
        human: { $in: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id },
    });
    if (!isCatOnList) {
        cat = await Cat_1.default.findOneAndUpdate({
            _id: id,
        }, { $push: { human: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id } }, { runValidators: true, new: true });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "added", cat });
    }
    cat = await Cat_1.default.findOneAndUpdate({
        _id: id,
    }, { $pull: { human: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id } }, { runValidators: true, new: true });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "remove from list" });
};
exports.toggleCatList = toggleCatList;
