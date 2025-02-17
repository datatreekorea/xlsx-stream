export default function (sheetCount) {
    let relationships = '';
    for (let i = 1; i <= sheetCount; i++) {
        relationships += `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i}.xml"/>`;
        if (i !== sheetCount) {
            relationships += '\n';
        }
    }

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
    ${relationships}
</Relationships>`;
}
