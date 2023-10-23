import { JSDOM } from 'jsdom';

export function ParseTable(content: string): { content: string; index: number }[] {
  // Parse tables
  const dom = new JSDOM(content);
  const document = dom.window.document;
  const tables = Array.from(document.getElementsByTagName('table'));
  const parsedTables = tables.map((table: any) => {
    let headers: HTMLElement[] = [];
    let cells: string[][] = [];
    if (table.tHead) {
      headers = Array.from(table.tHead.getElementsByTagName('th'));
      cells = Array.from(table.tBodies[0].getElementsByTagName('tr')).map((row: any) => {
        const cells = Array.from(row.getElementsByTagName('td'));
        return cells.map((cell: any) => cell.textContent);
      });
    } else {
      const tbodyRows = Array.from((table as HTMLElement).getElementsByTagName('tbody')[0].getElementsByTagName('tr'));
      headers = Array.from(tbodyRows.shift()?.getElementsByTagName('th') ?? []);
      cells = tbodyRows.map((row: any) => {
        const cells = Array.from(row.getElementsByTagName('td'));
        return cells.map((cell: any) => cell.textContent);
      });
    }
    const headerHtml = headers
      .map((header: HTMLElement) => `<th class="px-6 py-4">${header.textContent}</th>`)
      .join('');
    const cellHtml = cells
      .map(
        (row: any) =>
          `<tr class="border-b dark:border-neutral-500">${row
            .map((cell: string) => `<td class="whitespace-nowrap px-6 py-4">${cell}</td>`)
            .join('')}</tr>`,
      )
      .join('');
    const index = content.indexOf(table.outerHTML);
    return {
      content: `<div class="flex flex-col overflow-x-auto"><div class="sm:-mx-6 lg:-mx-8"><div class="inline-block min-w-full py-2 sm:px-6 lg:px-8"><div class="overflow-x-auto"><table class="min-w-full text-left text-sm font-light"><thead class="border-b font-medium dark:border-neutral-500"><tr>${headerHtml}</tr></thead><tbody>${cellHtml}</tbody></table></div></div></div></div>`,
      index,
    };
  });
  return parsedTables;
}
