"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const utils_1 = require("../utils");
// 25569 = Days between 1970/01/01 and 1900/01/01 (min date in Windows Excel)
const OFFSET_DAYS = 25569;
// 24 * 60 * 60 * 1000
const MILLISECONDS_IN_ONE_DAY = 86400000;
function default_1(value, cell, shouldFormat) {
    if (value instanceof Date) {
        const unixTimestamp = value.getTime();
        const officeTimestamp = (unixTimestamp / MILLISECONDS_IN_ONE_DAY) + OFFSET_DAYS;
        const maybeFormat = shouldFormat && (0, utils_1.getDateFormat)();
        return `<c r="${cell}" t="n"${maybeFormat ? ` s="${maybeFormat}"` : ''}><v>${officeTimestamp}</v></c>`;
    }
    else if (typeof value === 'string') {
        return `<c r="${cell}" t="inlineStr"><is><t>${(0, utils_1.sanitize)(value)}</t></is></c>`;
    }
    else if (typeof value === 'boolean') {
        return `<c r="${cell}" t="inlineStr"><is><t>${value}</t></is></c>`;
    }
    else if (typeof value === 'number') {
        const maybeFormat = shouldFormat && (0, utils_1.getNumberFormat)(value);
        return `<c r="${cell}" t="n"${maybeFormat ? ` s="${maybeFormat}"` : ''}><v>${value}</v></c>`;
    }
    else if (value) {
        return `<c r="${cell}" t="inlineStr"><is><t>${(0, utils_1.sanitize)(`${value}`)}</t></is></c>`;
    }
    return '';
}
//# sourceMappingURL=cell.js.map