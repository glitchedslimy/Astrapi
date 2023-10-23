import { JSDOM } from 'jsdom';

export function ParseBlockQuotes(content: string): { content: string; index: number }[] {
  // Parse blockquotes
  const dom = new JSDOM(content);
  const document = dom.window.document;
  const blockquotes = Array.from(document.getElementsByTagName('blockquote'));
  const parsedBlockQuotes = blockquotes.map((blockquote: HTMLElement) => {
    const quote = blockquote.innerHTML;
    const index = content.indexOf(blockquote.outerHTML);
    return { content: `<div class="border-l-4 border-gray-400 pl-4">${quote}</div>`, index };
  });
  return parsedBlockQuotes;
}
