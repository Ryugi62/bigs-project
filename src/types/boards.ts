export type BoardCategory = 'NOTICE' | 'FREE' | 'QNA' | 'ETC';

export type Board = {
  id: number;
  title: string;
  content: string;
  boardCategory: BoardCategory;
  createdAt: string;
  imageUrl?: string;
  author?: {
    id: string;
    name: string;
  };
  preview?: string;
};

export type BoardListResponse = {
  content: Array<{
    id: number;
    title: string;
    category: BoardCategory;
    createdAt: string;
    content?: string;
    summary?: string;
    snippet?: string;
    preview?: string;
    author?: {
      id?: number | string;
      name?: string;
    };
  }>;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  last: boolean;
  first: boolean;
};
