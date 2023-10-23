import { JSDOM } from 'jsdom';

interface ParsedHeader {
  content: string;
  index: number;
}

export function ParseHeaders(content: string): ParsedHeader[] {
  const dom = new JSDOM(content);
  const headers = Array.from(dom.window.document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  return headers.map((header: Element) => {
    const level = parseInt(header.tagName.charAt(1));
    const html = header.innerHTML;
    const index = content.indexOf(header.outerHTML);

    return {
      content: `<h${level} class="text-${
        7 - level
      }xl font-bold leading-9 tracking-tight mb-6 mt-6">${html}</h${level}>`,
      index,
    };
  });
}
