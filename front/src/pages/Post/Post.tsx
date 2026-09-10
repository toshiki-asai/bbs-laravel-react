import api from '@/services/api';
import { redirect, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router';
import { formatDate } from '@/utils/date';
import PostButton from '@/components/PostButton';
import type { Post } from '@/types/post';

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.postId;

  const res = await api.get('/posts/'+id);
  return res.data.post;
}

export async function action({ params }: ActionFunctionArgs) {
  const id = params.postId;

  await api.delete('/posts/'+id);
  return redirect("/posts");
}

export default function Post() {
  const post = useLoaderData<Post>();

  return (
    <>
      <title>{ post.title+"｜掲示板" }</title>
      <div className="space-y-4">
        <PostButton id={ post.id } can_edit={ post.can_edit } can_delete={ post.can_delete }/>
        <h2 className="text-lg font-bold">{ post.title }</h2>
        <div className="text-sm pb-3 border-b-1 border-stone-300">
          投稿者：{ post.user_name }
          / 投稿日時：<time>{ formatDate(post.created_at) }</time>
          { post.updated_at && post.updated_at != post.created_at &&
            <> / 最終更新日時：<time>{ formatDate(post.updated_at) }</time></>
          }
        </div>
        <div className="relative w-full whitespace-pre-wrap">{ post.content }</div>
        <PostButton id={ post.id } can_edit={ post.can_edit } can_delete={ post.can_delete }/>
      </div>
    </>
  )
}
