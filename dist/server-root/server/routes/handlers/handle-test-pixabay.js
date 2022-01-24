"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTestPixabay = void 0;
const pixabay_api_1 = require("pixabay-api");
exports.handleTestPixabay = (req, res) => {
    pixabay_api_1.searchImages(process.env.PIXABAY_API_KEY, 'piano')
        .then(images => {
        let result = false;
        if (images && images.hits.length > 0) {
            result = true;
        }
        else {
            result = false;
        }
        res.status(200).send(result);
    })
        .catch(() => {
        const response = false;
        res.status(200).send(response);
    });
};
//# sourceMappingURL=handle-test-pixabay.js.map