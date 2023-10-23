import { JSDOM } from 'jsdom';

interface ParsedParagraph {
  content: string;
  index: number;
}

export function ParseParagraphs(content: string): ParsedParagraph[] {
  const dom = new JSDOM(content);
  const paragraphs = Array.from(dom.window.document.querySelectorAll('p:not(blockquote p)'));

  return Array.from(paragraphs).map((paragraph: Element) => {
    const html = paragraph.innerHTML;
    const index = content.indexOf(paragraph.outerHTML);

    return {
      content: `<p class="text-base leading-7">${html}</p>`,
      index,
    };
  });
}
