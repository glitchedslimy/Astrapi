import { JSDOM } from 'jsdom';

export function ParseList(content: string): { content: string; index: number }[] {
  // Parse lists
  const dom = new JSDOM(content);
  const document = dom.window.document;
  const lists = Array.from(document.querySelectorAll('ul, ol'));
  const parsedLists = lists.map((list: any) => {
    const listItems = Array.from(list.querySelectorAll('li'));
    const listItemsHTML = listItems.map((listItem: any) => listItem.outerHTML).join('');
    const index = content.indexOf(list.outerHTML);
    const listType = list.tagName === 'OL' ? 'list-decimal' : 'list-disc';
    return { content: `<div class="${listType} ml-8">${listItemsHTML}</div>`, index };
  });
  return parsedLists;
}
