"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = row;
const tslib_1 = require("tslib");
/* eslint quotes: 0 */
const cell_1 = tslib_1.__importDefault(require("./cell"));
const utils_1 = require("../utils");
function row(index, values, shouldFormat) {
    return `
        <row r="${index + 1}" spans="1:${values.length}" x14ac:dyDescent="0.2">
            ${values.map((cellValue, cellIndex) => (0, cell_1.default)(cellValue, (0, utils_1.getCellId)(index, cellIndex), shouldFormat)).join("\n\t\t\t")}
        </row>`;
}
//# sourceMappingURL=row.js.map