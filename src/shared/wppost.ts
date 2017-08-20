export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: object;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: string;
  content: object;
  excerpt: object;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: object;
  categories: number[];
  tags: object;
  _links: object;
  curies: object[];
}
