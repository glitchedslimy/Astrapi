import { JSDOM } from 'jsdom';

interface ParsedImage {
  content: string;
  index: number;
}

export function ParseImage(content: string): ParsedImage[] {
  const dom = new JSDOM(content);
  const images = Array.from(dom.window.document.querySelectorAll('img'));

  return images.map((image: Element) => {
    const src = image.getAttribute('src');
    const width = image.getAttribute('width');
    const sizes = image.getAttribute('sizes');
    const figure = image.parentElement;
    const figcaption = figure ? figure.querySelector('figcaption') : null;
    const figcaptionText = figcaption ? figcaption.textContent : '';
    const figcaptionLink = figcaption ? figcaption.querySelector('a') : null;
    const figcaptionLinkHref = figcaptionLink ? figcaptionLink.getAttribute('href') : null;
    const imgClass = figure!.getAttribute('class');
    const index = content.indexOf(image.outerHTML);

    let figureClass = 'mx-auto my-4';
    let imgWrapperClass = '';

    if (imgClass?.includes('image-style-block-align-right')) {
      figureClass += ' float-right';
      imgWrapperClass = 'text-right';
    } else if (imgClass?.includes('image-style-side')) {
      figureClass += ' flex flex-row-reverse';
      imgWrapperClass = 'flex-1';
    }

    return {
      content: `<figure class="${figureClass}">
                    ${figcaptionLink ? `<a href="${figcaptionLinkHref}">` : ''}
                    <div class="${imgWrapperClass}">
                      <img src="${src}" ${width ? `width="${width}"` : ''} ${
                        sizes ? `sizes="${sizes}"` : ''
                      } alt="${figcaptionText}" ${imgClass ? `class="${imgClass}"` : ''} />
                    </div>
                    ${figcaptionLink ? `</a>` : ''}
                    <figcaption class="text-center">${figcaptionText}</figcaption>
                  </figure>`,
      index,
    };
  });
}
