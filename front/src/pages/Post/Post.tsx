import api from '@/services/api';
import { Await, data, Form, redirect, useActionData, useLoaderData, useNavigation, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router';
import { formatDate } from '@/utils/date';
import PostButton from '@/components/PostButton';
import type { Post } from '@/types/post';
import { flash } from '@/stores/flashMessageStore';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldError, FieldGroup, FieldSet } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import type { ValidationErrorResponse } from '@/types/validationErrorResponse';

type Comment = {
  data: {
    id: string;
    user_name: string;
    comment: string;
    created_at: string;
    can_delete: boolean;
  }[];
  meta: {
    next_cursor: string;
  };
}

async function getComment(id: string, cursor: string | null = null): Promise<Comment>
{
  const params = cursor ? { cursor: cursor } : undefined;
  return api.get('posts/'+id+'/comment', { params:params }).then(res => {
    return res.data;
  });
}

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.postId || "";

  const res = await api.get('/posts/'+id);
  const commentData = getComment(id);
  return {post:res.data.post, commentData: commentData};
}

export async function action({ ...args }: ActionFunctionArgs) {
  const formData = await args.request.clone().formData();
  switch(formData.get("_action")) {
    case "delete":
      return await actionDelete(args);
    case "add_comment":
      return await actionAddComment(args);
    case "delete_comment":
      return await actionDeleteComment(args);
    default:
      return null;
  }
}

async function actionDelete({ params }: ActionFunctionArgs) {
  const id = params.postId;

  await api.delete('/posts/'+id);
  flash.success("投稿を削除しました。", true);
  return redirect("/posts");
}

async function actionAddComment({ request, params }: ActionFunctionArgs) {
  const id = params.postId;
  const formData = await request.formData();
  const comment = formData.get("comment");

  try {
    await api.post(`/posts/${id}/comment`, {
      comment: comment,
    });
    flash.success("コメントを書き込みました。");
    return data({ state:"add_comment_success" });
  } catch(error) {
    if(axios.isAxiosError(error)){
      if (error.response?.status === 422) {
        return data({ errors: error.response.data.errors }, { status: 422 });
      }
    }
    throw error;
  }

}

async function actionDeleteComment({ request, params }: ActionFunctionArgs) {
  const id = params.postId;
  const formData = await request.formData();
  const commnetId = formData.get("id");

  await api.delete(`/posts/${id}/comment/${commnetId}`);
  flash.success("コメントを削除しました。");
  return data({ state:"delete_comment_success" });;
}


export default function Post() {
  const {post, commentData} = useLoaderData<{post:Post, commentData:Promise<Comment>}>();
  const actionData = useActionData<ValidationErrorResponse & {state?: string}>();
  const[commentDatas, setCommentDatas] = useState<Promise<Comment>[]>([]);
  const navigation = useNavigation();
  const ref = useRef(null);

  useEffect(()=>{
    setCommentDatas([commentData]);
  }, [commentData]);

  useEffect(()=>{
    if(navigation.state === "idle" && actionData?.state === "add_comment_success" && ref.current){
      ref.current.value = "";
    }
  }, [actionData, navigation.state]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    if (!window.confirm('本当に削除しますか？')) {
      e.preventDefault();
      return;
    }
  };

  const readComment = (cursor: string) => {
    const data = getComment(post.id, cursor);
    setCommentDatas([...commentDatas, data]);
  };

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
      <div className="mt-2 pt-4 border-t-1 border-stone-300">
        <h3 className="text-lg font-bold">コメント</h3>
        {commentDatas.map((commentData, index, array)=>
          <Suspense key={index} fallback={<p className="py-2">読み込み中...</p>}>
            <Await resolve={commentData} errorElement={<div className="bg-black text-white">コメントを取得できませんでした。</div>}>
              {(resolvedComment) => (
                <>
                  {resolvedComment.data.length === 0 &&
                    <div className="text-sm py-2 border-b border-stone-300">コメントはまだありません。</div>
                  }
                  {resolvedComment.data.length > 0 &&
                    <>
                      <ul>
                        {resolvedComment.data.map((comment) => (
                          <li key={comment.id} className="py-2 pr-4 border-b border-stone-300">
                            {comment.comment}<br/>
                            <span className="text-xs text-stone-600">[{ formatDate(comment.created_at) }]{ comment.user_name }</span>
                            {comment.can_delete &&
                              <Form method="delete" className="inline" onSubmit={handleSubmit}>
                                <input type="hidden" name="id" value={comment.id} />
                                <button type="submit" name="_action" value="delete_comment" className="text-xs text-red-600 cursor-pointer hover:underline">削除</button>
                              </Form>
                            }
                          </li>
                        ))}
                      </ul>
                      {resolvedComment.meta.next_cursor && index === array.length-1 &&
                        <div className="mt-2 text-right">
                          <Button variant="secondary" onClick={()=>{readComment(resolvedComment.meta.next_cursor)}}>続きを読み込む</Button>
                        </div>
                      }
                    </>
                  }
                </>
              )}
            </Await>
          </Suspense>
        )}
      </div>
      <Form method="post" className="w-full space-y-4 pt-4">
        <h3 className="text-lg font-bold">コメントフォーム</h3>
        <FieldGroup>
          <FieldSet className="relative w-full">
            <Field>
              <Textarea ref={ref} id="comment" name="comment" />
              { actionData?.errors?.comment && <FieldError>{ actionData.errors.comment }</FieldError> }
              <div className="text-right">
                <Button type="submit" name="_action" value="add_comment">コメントする</Button>
              </div>
            </Field>
          </FieldSet>
        </FieldGroup>
      </Form>
    </>
  )
}
