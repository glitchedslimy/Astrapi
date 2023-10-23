import { EditorParse } from './lib/editor-parse/editor-parse';

interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
  preview?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @param preview - If the request is a preview request
 * @returns
 */
export async function fetchApi<T>({ endpoint, query, wrappedByKey, wrappedByList, preview }: Props): Promise<T> {
  // Remove leading slash if present
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  if (preview) {
    const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}?publicationState=preview&populate=*`);
    url.searchParams.append('preview', 'true');

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${import.meta.env.STRAPI_TOKEN}`,
      },
    });
    let data = await res.json();

    if (data.data[0].attributes.content) {
      data.data[0].attributes.content = EditorParse(data.data[0].attributes.content);
    }

    // Unwrap data if needed
    if (wrappedByKey) {
      data = data[wrappedByKey];
    }

    // Unwrap list if needed
    if (wrappedByList) {
      data = data[0];
    }

    // Return data as T type (generic)
    return data as T;
  } else {
    // Form new URL with the Strapi URL and endpoint and populate all relations (images, etc.)
    const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}?populate=*`);

    // Add query parameters if query is defined
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Fetch data with the Strapi token and preview mode
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${import.meta.env.STRAPI_TOKEN}`,
      },
    });

    let data = await res.json();

    if (data.data[0].attributes.content) {
      data.data[0].attributes.content = EditorParse(data.data[0].attributes.content);
    }

    // Unwrap data if needed
    if (wrappedByKey) {
      data = data[wrappedByKey];
    }

    // Unwrap list if needed
    if (wrappedByList) {
      data = data[0];
    }

    // Return data as T type (generic)
    return data as T;
  }
}
