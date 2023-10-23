export function getImage(image: any) {
  return `${import.meta.env.STRAPI_URL}${image.data.attributes.url}`;
}
