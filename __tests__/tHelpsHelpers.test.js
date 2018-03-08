import fs from 'fs-extra';
import path from 'path-extra';
import * as tHelpsHelpers from "../src/helpers/tHelpsHelpers";
import { extractZipFile } from "../src/helpers/zipHelpers";

describe('Test tHelpsHelpers.convertMarkdownLinks() with large files', () => {
  const tempFilePath = path.join('.', '__tests__', 'output', 'trans_help');

  beforeEach(() => {
    const resourcePath = path.join('.', '__tests__', 'fixtures', 'resources');
    const zipfilepath = path.join(resourcePath, 'all_ta_tw_links.zip');
    extractZipFile(zipfilepath, tempFilePath);
  });

  afterEach(() => {
    if (tempFilePath) {
      fs.removeSync(tempFilePath);
    }
  });

  test('Test a large file of English tA content with a bunch of tA, tN, and tW links', () => {
    const preconvertFile = path.join(tempFilePath, 'all_ta_tw_links', 'en', 'all_ta_links_preconvert.md');
    const expectedFile = path.join(tempFilePath, 'all_ta_tw_links', 'en', 'all_ta_links_expected.md');
    let content = fs.readFileSync(preconvertFile, 'utf8');
    content = tHelpsHelpers.convertMarkdownLinks(content, 'en');
    const expectedContent = fs.readFileSync(expectedFile, 'utf8');
    const contentLines = content.split('\n');
    const expectedLines = expectedContent.split('\n');
    contentLines.forEach((line, idx)=>{
      expect(line).toEqual(expectedLines[idx]);
    });
  });

  test('Test a large file of English tW content with a bunch of tA, tN, and tW links', () => {
    const preconvertFile = path.join(tempFilePath, 'all_ta_tw_links', 'en', 'all_tw_links_preconvert.md');
    const expectedFile = path.join(tempFilePath, 'all_ta_tw_links', 'en', 'all_tw_links_expected.md');
    let content = fs.readFileSync(preconvertFile, 'utf8');
    content = tHelpsHelpers.convertMarkdownLinks(content, 'en');
    const expectedContent = fs.readFileSync(expectedFile, 'utf8');
    const contentLines = content.split('\n');
    const expectedLines = expectedContent.split('\n');
    contentLines.forEach((line, idx)=>{
      expect(line).toEqual(expectedLines[idx]);
    });
  });

  test('Test a large file of Hindi tW content with a bunch of tA, tN, and tW links', () => {
    const preconvertFile = path.join(tempFilePath, 'all_ta_tw_links', 'hi', 'all_tw_links_preconvert.md');
    const expectedFile = path.join(tempFilePath, 'all_ta_tw_links', 'hi', 'all_tw_links_expected.md');
    let content = fs.readFileSync(preconvertFile, 'utf8');
    content = tHelpsHelpers.convertMarkdownLinks(content, 'en');
    const expectedContent = fs.readFileSync(expectedFile, 'utf8');
    const contentLines = content.split('\n');
    const expectedLines = expectedContent.split('\n');
    contentLines.forEach((line, idx)=>{
      expect(line).toEqual(expectedLines[idx]);
    });
  });

  describe('Test each regexp replace in tHelpsHelpers.convertMarkdownLinks()', () => {
    test('OBS tN: Convert all [<Title>](rc://<lang>/tn/help/obs/*) links to just show "Open Bible Stories - <Title>"', () => {
      const content = 'Please see [Title](rc://en/tn/help/obs/test) for more information';
      const converted = tHelpsHelpers.convertMarkdownLinks(content, 'en');
      const expected = 'Please see Open Bible Stories - Title for more information';
      expect(converted).toEqual(expected);
    });

    test('tN: Convert all [<Bible Ref>](rc://<lang>/tn/*) links to just show the <Bible ref> (no link)', () => {
      const content = 'Please see [Title](rc://en/tn/help/bible/test) for more information';
      const converted = tHelpsHelpers.convertMarkdownLinks(content, 'en');
      const expected = 'Please see Title for more information';
      expect(converted).toEqual(expected);
    });

    test('tW: Convert all [<Title>](rc://<lang>/tw/dict/bible/<articleCat>/<articleId>) links to make a clickable link to call the followlink() function for tw', () => {
      const content = 'Please see [Title](rc://en/tw/dict/bible/kt/test) for more information';
      const converted = tHelpsHelpers.convertMarkdownLinks(content, 'en');
      const expected = 'Please see <a style="cursor: pointer" onclick="return followLink(\'en/tw/kt/test\')">Title</a> for more information';
      expect(converted).toEqual(expected);
    });

    test('tW: Convert all [<Title>](../[other|kt|names]/[articleId].md) relative tW links to make a clickable link to call the followlink() function for tw', () => {
      const content = 'Please see [Title](../kt/test.md) for more information';
      const converted = tHelpsHelpers.convertMarkdownLinks(content, 'en');
      const expected = 'Please see <a style="cursor: pointer" onclick="return followLink(\'en/tw/kt/test\')">Title</a> for more information';
      expect(converted).toEqual(expected);
    });

    test('tA: Convert all [<Title>](rc://<lang>/ta/man/<articleCat>/<articleId>) links to make a clickable link to call the followlink() function for ta', () => {
      const content = 'Please see [Title](rc://en/ta/man/translate/translate-names) for more information';
      const converted = tHelpsHelpers.convertMarkdownLinks(content, 'en');
      const expected = 'Please see <a style="cursor: pointer" onclick="return followLink(\'en/ta/translate/translate-names\')">Title</a> for more information';
      expect(converted).toEqual(expected);
    });

    test('tA: Convert all [<Title>](../[articleId]/01.md) relative tA links to make a clickable link to call the followlink() function for ta', () => {
      const content = 'Please see [Title](../translate-names/01.md) for more information';
      const converted = tHelpsHelpers.convertMarkdownLinks(content, 'en', 'translate');
      const expected = 'Please see <a style="cursor: pointer" onclick="return followLink(\'en/ta/translate/translate-names\')">Title</a> for more information';
      expect(converted).toEqual(expected);
    });

    test('tA: Convert all [<Title>](../../[manual]/[articleId]/01.md) relative tA links to make a clickable link to call the followlink() function for ta', () => {
      const content = 'Please see [Title](../translate/translate-names/01.md) for more information';
      const converted = tHelpsHelpers.convertMarkdownLinks(content, 'en');
      const expected = 'Please see <a style="cursor: pointer" onclick="return followLink(\'en/ta/translate/translate-names\')">Title</a> for more information';
      expect(converted).toEqual(expected);
    });

    test('tA: Convert all [<Title>](../[articleId]) relative tA links to make a clickable link to call the followlink() function for ta', () => {
      const content = 'Please see [Title](../translate-names) for more information';
      const converted = tHelpsHelpers.convertMarkdownLinks(content, 'en');
      const expected = 'Please see <a style="cursor: pointer" onclick="return followLink(\'en/ta//translate-names\')">Title</a> for more information';
      expect(converted).toEqual(expected);
    });

    test('tA: Convert all [<Title>](../[manual]/[articleId]) relative tA links to make a clickable link to call the followlink() function for ta', () => {
      const content = 'Please see [Title](../translate/translate-names) for more information';
      const converted = tHelpsHelpers.convertMarkdownLinks(content, 'en');
      const expected = 'Please see <a style="cursor: pointer" onclick="return followLink(\'en/ta/translate/translate-names\')">Title</a> for more information';
      expect(converted).toEqual(expected);
    });
  });
});
