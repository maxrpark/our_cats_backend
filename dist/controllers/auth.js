"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.logout = exports.verifyEmail = exports.login = exports.register = void 0;
const register = async (req, res) => {
    res.json("register");
};
exports.register = register;
const verifyEmail = async (req, res) => {
    res.json("verifyEmail");
};
exports.verifyEmail = verifyEmail;
const login = async (req, res) => {
    res.json("login");
};
exports.login = login;
const logout = async (req, res) => {
    res.json("logout");
};
exports.logout = logout;
const forgotPassword = async (req, res) => {
    res.json("forgotPassword");
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    res.json("resetPassword");
};
exports.resetPassword = resetPassword;
