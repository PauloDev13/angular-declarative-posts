interface IPost {
  id?: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string | undefined;
}

export type TPost = IPost;
export type TPosts = IPost[];
