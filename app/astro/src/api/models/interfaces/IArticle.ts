export interface Article {
    id: number;
    attributes: {
      Title: string;
      cover: any;
      Description: string;
      content: string;
      Slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }