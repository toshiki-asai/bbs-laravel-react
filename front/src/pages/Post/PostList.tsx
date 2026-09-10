import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/services/api';
import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { formatDate } from '@/utils/date';
import ListPagination from '@/components/ListPagination';
import type { Post } from '@/types/post';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  const res = await api.get('/posts?page='+page)
  return res.data;
}

export default function PostList() {
  const posts = useLoaderData();

  //ページネーション

  return (
    <>
      <title>投稿一覧｜掲示板</title>
      <ListPagination data={posts.meta} />
      <div className="my-2 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {posts.data.map((post:Post) => (
          <Card key={post.id} className="relative">
            <Link to={'/posts/'+post.id} className="absolute inset-0"></Link>
            <CardHeader>
              <CardTitle className="font-bold">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-t-1 pt-1 text-sm"><span>{post.user_name}</span></div>
              <div className="text-xs">
                投稿：<time>{formatDate(post.created_at)}</time>
                {post.updated_at != post.created_at &&
                  <><br/>更新：<time>{formatDate(post.updated_at)}</time></>
                }
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ListPagination data={posts.meta} />
    </>
  )
}
