import { JSDOM } from 'jsdom';

interface ParsedHR {
  content: string;
  index: number;
}

export function ParseHR(content: string): ParsedHR[] {
  const dom = new JSDOM(content);
  const hr = Array.from(dom.window.document.querySelectorAll('hr'));

  return Array.from(hr).map((hr: Element) => {
    const index = content.indexOf(hr.outerHTML);

    return {
      content: `<hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />`,
      index,
    };
  });
}
