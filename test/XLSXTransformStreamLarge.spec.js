import { expect } from 'chai';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';
import XLSXTransformStream from '../src/XLSXTransformStream';

const TEST_ROWS_COUNT = 1048577;

describe('The XLSXTransformStream Large Files', () => {
    it(`The transformed xlsx file corresponds to the snapshot xlsx large file (${TEST_ROWS_COUNT} rows)`, async () => {
        const snapshotFiles = {};
        await fs.createReadStream(path.resolve(__dirname, 'test-large.xlsx'))
            .pipe(unzipper.Parse())
            .on('entry', async (entry) => {
                snapshotFiles[entry.path] = await entry.buffer();
            })
            .promise();

        const inputStream = new Readable({ objectMode: true });
        const testFiles = {};

        for (let i = 0; i < TEST_ROWS_COUNT; i++) {
            inputStream.push(['Testing', i + 1]);
        }
        inputStream.push(null);

        await inputStream
            .pipe(new XLSXTransformStream())
            .pipe(unzipper.Parse())
            .on('entry', async (entry) => {
                testFiles[entry.path] = await entry.buffer();
            })
            .promise();

        Object.keys(testFiles).map((key) => {
            expect(snapshotFiles[key] && testFiles[key].equals(snapshotFiles[key])).to.be.equal(true);
        });
    }).timeout(60000);
});
