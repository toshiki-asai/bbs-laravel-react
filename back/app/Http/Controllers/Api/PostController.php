<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Requests\Api\StorePostRequest;
use App\Http\Requests\Api\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Services\CommentService;
use App\Services\PostService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    public function __construct(
        protected PostService $postService,
        protected CommentService $commentService,
        protected UserService $userService
    ) {}

    public function index(): AnonymousResourceCollection
    {
        $posts = $this->postService->getPostsWithPagination(10);
        return PostResource::collection($posts);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): JsonResponse
    {
        $data = $request->validated();
        $post = $this->postService->createPost($request->user()->id, $data);

        return response()->json([
            'status' => 'success',
            'message' => '投稿が完了しました。',
            'post_id' => $post->id
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Post $post): JsonResponse
    {
        $user = $this->userService->findUser($post->user_id);
        $post->setRelation('user', $user);

        return response()->json([
            'status' => 'success',
            'message' => '投稿を取得しました。',
            'post' => new PostResource($post)
        ], 200);
    }

    public function edit(Request $request, Post $post): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => '投稿編集用の情報を取得しました。',
            'post' => new PostResource($post)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post): JsonResponse
    {
        $data = $request->validated();
        $this->postService->updatePost($post->id, $data);

        return response()->json([
            'status' => 'success',
            'message' => '投稿を修正しました。',
            'post_id' => $post->id
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post, Request $request): JsonResponse
    {
        $this->postService->deletePost($post->id);

        return response()->json([
            'status' => 'success',
            'message' => '投稿を削除しました。',
        ], 200);

    }

}
