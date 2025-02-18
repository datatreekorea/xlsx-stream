/** Class representing a XLSX Row transformation from array to Row. Also adds the necessary XLSX header and footer. */
export default class XLSXRowTransform extends Transform {
    constructor(shouldFormat: any);
    rowCount: number;
    shouldFormat: any;
    /**
     * Transform array to row string
     */
    _transform(row: any, encoding: any, callback: any): any;
    _flush(callback: any): void;
}
import { Transform } from 'stream';
//# sourceMappingURL=XLSXRowTransform.d.ts.map