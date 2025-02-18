"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const templates_1 = require("./templates");
/** Class representing a XLSX Row transformation from array to Row. Also adds the necessary XLSX header and footer. */
class XLSXRowTransform extends stream_1.Transform {
    constructor(shouldFormat) {
        super({ objectMode: true });
        this.rowCount = 0;
        this.shouldFormat = shouldFormat;
        this.push(templates_1.SheetHeader);
    }
    /**
     * Transform array to row string
     */
    _transform(row, encoding, callback) {
        if (!Array.isArray(row))
            return callback();
        const xlsxRow = (0, templates_1.Row)(this.rowCount, row, this.shouldFormat);
        this.rowCount++;
        callback(null, xlsxRow);
    }
    _flush(callback) {
        this.push(templates_1.SheetFooter);
        callback();
    }
}
exports.default = XLSXRowTransform;
//# sourceMappingURL=XLSXRowTransform.js.map