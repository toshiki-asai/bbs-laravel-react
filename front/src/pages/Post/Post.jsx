import api from '@/services/api';
import { Link, redirect, useLoaderData, useParams } from 'react-router-dom';
import { formatDate } from '@/utils/date';
import PostButton from '@/components/PostButton';

export async function loader({ params }) {
  const id = params.postId;

  const res = await api.get('/posts/'+id);
  return res.data;
}

export async function action({ params }) {
  const id = params.postId;

  await api.delete('/posts/'+id);
  return redirect("/posts");
}

export default function Post() {
  const data = useLoaderData();
  const params = useParams();

  return (
    <>
      <title>{ data.post.title+"｜掲示板" }</title>
      <div className="space-y-4">
        <PostButton id={ params.postId } can_edit={ data.post.can_edit } can_delete={ data.post.can_delete }/>
        <h2 className="text-lg font-bold">{ data.post.title }</h2>
        <div className="text-sm pb-3 border-b-1 border-stone-300">
          投稿者：{ data.post.user_name }
          / 投稿日時：<time>{ formatDate(data.post.created_at) }</time>
          { data.post.updated_at && data.post.updated_at != data.postcreated_at &&
            <> / 最終更新日時：<time>{ formatDate(data.post.updated_at) }</time></>
          }
        </div>
        <div className="relative w-full whitespace-pre-wrap">{ data.post.content }</div>
        <PostButton id={ params.postId } can_edit={ data.post.can_edit } can_delete={ data.post.can_delete }/>
      </div>
    </>
  )
}
