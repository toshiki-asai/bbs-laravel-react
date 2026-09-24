<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use App\Services\CommentService;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CommentController extends Controller
{
    public function __construct(
        protected CommentService $commentService,
        protected PostService $postService
    ) {}

    public function index(Post $post): AnonymousResourceCollection
    {
        $comments = $this->commentService->getCommentsByCursol($post->id);

        return CommentResource::collection($comments)->additional([
            'status' => 'success',
            'message' => 'コメント一覧を取得しました。'
        ]);
    }

    function store(Post $post, StoreCommentRequest $request): JsonResponse
    {
        $data = $request->validated();

        $this->commentService->addComment($request->user()->id, $post->id, $data);

        return response()->json([
            'status' => 'success',
            'message' => 'コメントを書き込みました。',
        ], 201);
    }

    function destroy(Post $post, Comment $comment): JsonResponse
    {
        $this->commentService->deleteComment($comment->id);

        return response()->json([
            'status' => 'success',
            'message' => 'コメントを削除しました。',
        ], 200);
    }
}
