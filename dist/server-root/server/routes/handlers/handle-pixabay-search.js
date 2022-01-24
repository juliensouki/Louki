"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePixabaySearch = void 0;
const pixabay_api_1 = require("pixabay-api");
const logger_1 = require("../../logger");
exports.handlePixabaySearch = (req, res) => {
    const search = req.query.search;
    pixabay_api_1.searchImages(process.env.PIXABAY_API_KEY, search).then(results => {
        const images = [];
        for (let i = 0; i < results.hits.length; i++) {
            images.push(results.hits[i].webformatURL);
        }
        res.status(200).send(images);
    }, pixabayError => {
        const response = {
            name: `Pixabay search error`,
            message: pixabayError.message,
        };
        logger_1.logError(response);
        res.status(500).send(response);
    });
};
//# sourceMappingURL=handle-pixabay-search.js.map