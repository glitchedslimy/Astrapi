export function EditorParse(content: any) {
    if (content) {
        console.log(content)
        // Parse paragraphs
        const paragraphs = ParseParagraphs(content);
        // Parse Headers
        const headers = ParseHeaders(content);
        // Concatenate parsed content
        const parsedContent = [...paragraphs, ...headers];
        // Return parsed content
        return parsedContent.join('');
      }
  }
  
  function ParseParagraphs(content: any) {
    // Parse paragraphs
    let paragraphs = content.split(/<\/?p[^>]*>/);
    paragraphs = paragraphs.filter((paragraph: any) => paragraph !== '');
    paragraphs = paragraphs.filter((paragraph: any) => paragraph.includes('<p>'));
    paragraphs = paragraphs.map((paragraph: any) => {
        console.log(paragraphs)
      return `<p class="text-red-500">${paragraph}</p>`;
    });
    return paragraphs;
  }
  
  function ParseHeaders(content: any) {
    // Parse headers
    let headers = content.split('<h');
    headers = headers.filter((header: any) => header !== '');
    headers = headers.map((header: any) => {
      const level = header.charAt(0);
      const text = header.substring(header.indexOf('>') + 1);
      switch (level) {
        case '1':
            return `<h1 class="text-5xl font-bold mb-4 mt-4">${text}</h1>`;
        case '2':
            return `<h2 class="text-4xl font-bold mb-4 mt-4">${text}</h2>`;
        case '3':
            return `<h3 class="text-3xl font-bold mb-4 mt-4">${text}</h3>`;
        case '4':
            return `<h4 class="text-2xl font-bold mb-4 mt-4">${text}</h4>`;
        case '5':
            return `<h5 class="text-xl font-bold mb-4 mt-4">${text}</h5>`;
        case '6':
            return `<h6 class="text-lg font-bold mb-4 mt-4">${text}</h6>`;
;
      }
    });
    return headers;
  }