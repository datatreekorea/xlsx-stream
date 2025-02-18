"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const archiver_1 = tslib_1.__importDefault(require("archiver"));
const stream_1 = require("stream");
const XLSXRowTransform_1 = tslib_1.__importDefault(require("./XLSXRowTransform"));
const templates = tslib_1.__importStar(require("./templates"));
/** Class representing a XLSX Transform Stream */
class XLSXTransformStream extends stream_1.Transform {
    /**
     * Create a new Stream
     * @param options {Object}
     * @param options.shouldFormat {Boolean} - If set to true writer is formatting cells with numbers and dates
     */
    constructor(options = {}) {
        super({ objectMode: true });
        this.options = options;
        this.initializeArchiver();
        this.sheetCount = 0;
        this.addNextSheet();
    }
    addNextSheet() {
        this.sheetCount++;
        if (this.rowTransform != null)
            this.rowTransform.end();
        this.rowTransform = new XLSXRowTransform_1.default(this.options.shouldFormat);
        this.zip.append(this.rowTransform, {
            name: `xl/worksheets/sheet${this.sheetCount}.xml`,
        });
    }
    initializeArchiver() {
        this.zip = (0, archiver_1.default)('zip', {
            forceUTC: true,
        });
        this.zip.on('data', (data) => {
            this.push(data);
        });
        this.zip.catchEarlyExitAttached = true;
        this.zip.append(templates.ContentTypes, {
            name: '[Content_Types].xml',
        });
        this.zip.append(templates.Rels, {
            name: '_rels/.rels',
        });
        this.zip.append(templates.Styles, {
            name: 'xl/styles.xml',
        });
        this.zip.on('warning', (err) => {
            console.warn(err);
        });
        this.zip.on('error', (err) => {
            console.error(err);
        });
    }
    _transform(row, encoding, callback) {
        if (this.rowTransform.rowCount >= 1000001) {
            this.addNextSheet();
        }
        if (this.rowTransform.write(row)) {
            process.nextTick(callback);
        }
        else {
            this.rowTransform.once('drain', callback);
        }
    }
    _flush(callback) {
        this.rowTransform.end();
        this.zip.append(templates.Workbook(this.sheetCount), {
            name: 'xl/workbook.xml',
        });
        this.zip.append(templates.WorkbookRels(this.sheetCount), {
            name: 'xl/_rels/workbook.xml.rels',
        });
        this.zip.finalize().then(callback);
    }
}
exports.default = XLSXTransformStream;
//# sourceMappingURL=XLSXTransformStream.js.map