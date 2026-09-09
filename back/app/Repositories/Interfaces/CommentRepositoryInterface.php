<?php

namespace App\Repositories\Interfaces;

use App\Models\Comment;
use Illuminate\Support\Collection;

interface CommentRepositoryInterface
{
    public function find(string $id): ?Comment;

    public function getByPost(string $post_id): ?Collection;

    public function create(array $data): Comment;

    public function delete(string $id): bool;

}
