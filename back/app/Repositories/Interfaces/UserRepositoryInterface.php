<?php

namespace App\Repositories\Interfaces;

use App\Models\User;

interface UserRepositoryInterface
{
    public function find(string $id): ?User;

    public function findByEmail(string $email): ?User;

    public function create(array $data): User;

}
