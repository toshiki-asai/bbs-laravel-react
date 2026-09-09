<?php

namespace App\Repositories\Interfaces;

use App\Models\Post;
use Illuminate\Pagination\LengthAwarePaginator;

interface PostRepositoryInterface
{
    public function find(string $id): ?Post;

    public function findWithRelation(string $id, string $relation): ?Post;

    public function getPaginated(int $perPage = 10): LengthAwarePaginator;

    public function create(array $data): Post;

    public function update(string $id, array $data): bool;

    public function delete(string $id): bool;

}
