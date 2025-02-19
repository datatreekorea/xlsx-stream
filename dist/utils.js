"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCellId = getCellId;
exports.sanitize = sanitize;
exports.timeoutPromised = timeoutPromised;
exports.getNumberFormat = getNumberFormat;
exports.getDateFormat = getDateFormat;
const baseString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function getCellId(rowIndex, cellIndex) {
    let cellXPosition = '';
    let position;
    let remaining = cellIndex;
    do {
        position = remaining % baseString.length;
        cellXPosition = baseString[position] + cellXPosition;
        remaining = Math.floor(remaining / baseString.length) - 1;
    } while (remaining >= 0);
    return `${cellXPosition}${rowIndex + 1}`;
}
function sanitize(text) {
    const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const sourceBuffer = Buffer.from(escaped);
    const buffer = Buffer.alloc(sourceBuffer.byteLength); // allocate enough space
    let letter;
    let writtenLength = 0;
    for (let i = 0; i < escaped.length; i++) {
        letter = escaped[i];
        if ((letter === '\x09') ||
            (letter === '\x0A') ||
            (letter === '\x0D') ||
            ((letter >= '\x20') && (letter <= '\uD7FF')) ||
            ((letter >= '\uE000') && (letter <= '\uFFFD'))) {
            writtenLength += buffer.write(letter, writtenLength);
        }
    }
    return buffer.toString('utf8', 0, writtenLength);
}
function timeoutPromised(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}
function getNumberFormat(n) {
    const number = Math.abs(n);
    if (number.toString().length >= 11) {
        return 5;
    }
    if (number % 1 === 0) {
        return number >= 1000 ? 3 : 1;
    }
    return number >= 1000 ? 4 : 2;
}
function getDateFormat() {
    return 6;
}
//# sourceMappingURL=utils.js.map