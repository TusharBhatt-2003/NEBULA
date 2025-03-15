// Define Post interface (or import it if it's defined elsewhere)
export interface Post {
  _id: string;
  createdAt: number;
  tags: string[];
}

export const fetchAndStorePosts = async (): Promise<Post[]> => {
  const savedPosts = localStorage.getItem("feedPosts");

  if (savedPosts) {
    return JSON.parse(savedPosts);
  }

  try {
    const response = await fetch("/api/posts");
    if (!response.ok) throw new Error("Failed to fetch posts");

    const data: Post[] = await response.json();
    localStorage.setItem("feedPosts", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
