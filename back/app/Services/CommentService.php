<?php

namespace App\Services;

use App\Models\Comment;
use App\Repositories\Interfaces\CommentRepositoryInterface;
use Illuminate\Support\Collection;

class CommentService
{
    public function __construct(private CommentRepositoryInterface $commentRepository) {}

    public function findComment(string $id): ?Comment
    {
        return $this->commentRepository->find($id);
    }

    public function getComments(string $post_id): Collection
    {
        return $this->commentRepository->getByPost($post_id);
    }

    public function addComment(string $user_id, string $post_id, array $data): Comment
    {
        $data['user_id'] = $user_id;
        $data['post_id'] = $post_id;
        return $this->commentRepository->create($data);
    }

    public function deleteComment(string $id): bool
    {
        return $this->commentRepository->delete($id);
    }
}
