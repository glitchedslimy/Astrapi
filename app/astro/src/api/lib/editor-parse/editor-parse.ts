import { ParseBlockQuotes } from './parse-blockquotes/parse-blockquotes';
import { ParseCode } from './parse-code/parse-code';
import { ParseHeaders } from './parse-headers/parse-headers';
import { ParseHR } from './parse-hr/parse-hr';
import { ParseImage } from './parse-image/parse-image';
import { ParseList } from './parse-list/parse-list';
import { ParseMedia } from './parse-media/parse-media';
import { ParseParagraphs } from './parse-paragraphs/parse-paragraphs';
import { ParseTable } from './parse-table/parse-table';

export function EditorParse(content: string) {
  if (content) {
    // Parse paragraphs
    const parsedParagraphs = ParseParagraphs(content);
    // Parse Headers
    const parsedHeaders = ParseHeaders(content);
    // Parse block quotes
    const parsedBlockQuotes = ParseBlockQuotes(content);
    // Parse tables
    const parsedTables = ParseTable(content);
    // Parse Images
    const parsedImages = ParseImage(content);
    // Parse List
    const parsedList = ParseList(content);
    // Parse Code
    const parsedCode = ParseCode(content);
    // Parse Media
    const parsedMedia = ParseMedia(content);
    // Parse HR
    const parsedHR = ParseHR(content);
    // Concatenate parsed content in the order that it appears in the original content
    const allParsedContent = [
      ...parsedParagraphs,
      ...parsedHeaders,
      ...parsedBlockQuotes,
      ...parsedTables,
      ...parsedList,
      ...parsedImages,
      ...parsedMedia,
      ...parsedCode,
      ...parsedHR,
    ];
    const sortedParsedContent = allParsedContent.sort((a: any, b: any) => a.index - b.index);
    const concatenatedParsedContent = sortedParsedContent.map((obj: any) => obj.content).join('');
    // Return parsed content
    return concatenatedParsedContent;
  }
}
