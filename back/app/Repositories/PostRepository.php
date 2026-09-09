<?php

namespace App\Repositories;

use App\Models\Post;
use App\Repositories\Interfaces\PostRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class PostRepository implements PostRepositoryInterface
{
    public function __construct(protected Post $post) {}

    public function find(string $id): ?Post
    {
        return $this->post->find($id);
    }

    public function findWithRelation(string $id, string $relation): ?Post
    {
        return $this->post->with($relation)->find($id);
    }

    public function getPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return $this->post
            ->select('id','title','content','created_at','updated_at','user_id')
            ->with('user:id,name')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function create(array $data): Post
    {
        return $this->post->create($data);
    }

    public function update(string $id, array $data): bool
    {
        $post = $this->find($id);
        if ($post) {
            return $post->update($data);
        }
        return false;
    }

    public function delete(string $id): bool
    {
        $post = $this->find($id);
        if ($post) {
            return $post->delete();
        }
        return false;
    }
}
