"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResponse = void 0;
exports.buildResponse = (status, response) => {
    return {
        status: status,
        data: status >= 500 ? null : response,
        error: status >= 500 ? response : null,
    };
};
//# sourceMappingURL=RoutesResponses.js.map