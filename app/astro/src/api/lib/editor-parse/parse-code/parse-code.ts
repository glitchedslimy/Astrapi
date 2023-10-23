import { JSDOM } from 'jsdom';

interface ParsedCode {
  content: string;
  index: number;
}

export function ParseCode(content: string): ParsedCode[] {
  const dom = new JSDOM(content);
  const code = Array.from(dom.window.document.querySelectorAll('pre'));

  return Array.from(code).map((code: Element) => {
    const html = code.innerHTML;
    const index = content.indexOf(code.outerHTML);

    return {
      content: `<pre>${html}</pre>`,
      index,
    };
  });
}
