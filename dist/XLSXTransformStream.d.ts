/** Class representing a XLSX Transform Stream */
export default class XLSXTransformStream extends Transform {
    /**
     * Create a new Stream
     * @param options {Object}
     * @param options.shouldFormat {Boolean} - If set to true writer is formatting cells with numbers and dates
     */
    constructor(options?: {
        shouldFormat: boolean;
    });
    options: {
        shouldFormat: boolean;
    };
    sheetCount: number;
    addNextSheet(): void;
    rowTransform: XLSXRowTransform | undefined;
    initializeArchiver(): void;
    zip: any;
    _transform(row: any, encoding: any, callback: any): void;
    _flush(callback: any): void;
}
import { Transform } from 'stream';
import XLSXRowTransform from './XLSXRowTransform';
//# sourceMappingURL=XLSXTransformStream.d.ts.map