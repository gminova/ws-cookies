"use strict";

const { parse } = require("url");
const { readFile } = require("fs");
const path = require("path");
const notFoundPage = '<p style="font-size: 10vh; text-align: center;">404!</p>';

module.exports = (req, res) => {
  switch (`${req.method} ${req.url}`) {
    case "GET /":
      return readFile(path.join(__dirname, "index.html"), (err, data) => {
        res.writeHead(200, {
          "Content-Type": "text/html",
          "Content-Length": data.length
        });
        return res.end(data);
      });
    case "POST /login":
      return readFile(path.join(__dirname, "index.html"), (err, data) => {
        res.writeHead(302, {
          "Location": "/",
          "Set-Cookie": "logged_in=true; HttpOnly; Max-Age=9000"
        });
        return res.end();
      });
    default:
      res.writeHead(404, {
        "Content-Type": "text/html",
        "Content-Length": notFoundPage.length
      });
      return res.end(notFoundPage);
  }
};
