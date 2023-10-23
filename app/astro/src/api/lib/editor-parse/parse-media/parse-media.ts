import { JSDOM } from 'jsdom';

interface ParsedMedia {
  content: string;
  index: number;
}

export function ParseMedia(content: string): ParsedMedia[] {
  const dom = new JSDOM(content);
  const mediaElements = Array.from(dom.window.document.querySelectorAll('figure.media'));

  return mediaElements.map((mediaElement: Element) => {
    const oembedElement = mediaElement.querySelector('oembed');
    const url = oembedElement?.getAttribute('url');
    const index = content.indexOf(mediaElement.outerHTML);

    let mediaContent = '';

    if (url?.includes('youtube.com')) {
      const videoId = url.split('v=')[1];
      mediaContent = `<div class="aspect-w-16 aspect-h-9">
                        <div style="width: 100%; height: 500px;">
                          <iframe id="player-${videoId}" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen width="100%" height="100%"></iframe>
                        </div>
                      </div>
                      <script>
                        const player = document.getElementById('player-${videoId}');

                        // Modify the player here
                      </script>`;
    }

    return {
      content: mediaContent,
      index,
    };
  });
}
