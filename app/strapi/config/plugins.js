'use strict';

module.exports = ({ env }) => ({
    ckeditor5: {
        enabled: true,
        config: {
          editor: {
            mediaEmbed: {
              previewsInData: true
            }
          }
        }
      },
  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::home.home',
          published: {
            url: env('PREVIEW_URL') + '/',
          },
        },
        {
          uid: 'api::articles.articles',
          draft: {
            url: env('PREVIEW_URL') + '?preview=true',
          },
          published: {
            url: env('PREVIEW_URL') + '/',
          },
        },
        {
          uid: 'api::article.article',
          draft: {
            url: env('PREVIEW_URL') + '/blog/{Slug}?preview=true',
          },
          published: {
            url: env('PREVIEW_URL') + '/blog/{Slug}',
          },
        },
      ],
    },
  },
});