export default function (sheetCount) {
    let sheets = '';
    for (let i = 1; i <= sheetCount; i++) {
        sheets += `<sheet name="sheet${i}" sheetId="${i}" r:id="rId${i + 1}"/>`;
        if (i !== sheetCount) {
            sheets += '\n';
        }
    }

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook
    xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
>
    <fileVersion appName="xl" lastEdited="1" lowestEdited="1" rupBuild="9000"/>
    <workbookPr defaultThemeVersion="124226"/>
    <bookViews>
        <workbookView xWindow="480" yWindow="60" windowWidth="18195" windowHeight="8505"/>
    </bookViews>
    <sheets>
        ${sheets}
    </sheets>
    <calcPr calcId="145621"/>
</workbook>`;
}
