<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Repositories\Interfaces\CommentRepositoryInterface;
use Illuminate\Support\Collection;

class CommentRepository implements CommentRepositoryInterface
{
    public function __construct(protected Comment $comment) {}

    public function find(string $id): ?Comment
    {
        return $this->comment->find($id);
    }

    public function getByPost(string $post_id): ?Collection
    {
        return $this->comment
            ->where('post_id', $post_id)
            ->with('user:id,name')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function create(array $data): Comment
    {
        return $this->comment->create($data);
    }

    public function delete(string $id): bool
    {
        $comment = $this->find($id);
        if ($comment) {
            return $comment->delete();
        }
        return false;
    }

}
