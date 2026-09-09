<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class RegistrationService
{
    private const EMAIL_EXPIRES_AT_MINUTES = 60;

    public function __construct(private UserRepositoryInterface $userRepository) {}

    /**
     * @param  array{username: string, email: string, password: string}  $data
     */
    public function register(array $data, ?string $email = null): User
    {
        return $this->userRepository->create([
            'email' => $email ?? $data['email'],
            'name' => $data['username'],
            'password' => $data['password'],
        ]);
    }

    public function isEmailRegistered(string $email): bool
    {
        return $this->userRepository->findByEmail($email) !== null;
    }

    public function createVerifyEmailUrl(string $email): string
    {
        return URL::temporarySignedRoute(
            'preRegister.verifyEmail',
            now()->addMinutes(self::EMAIL_EXPIRES_AT_MINUTES),
            ['email' => $email]
        );
    }

    public function createVerifyEmailFrontEndUrl(string $email): string
    {
        $url = $this->createVerifyEmailUrl($email);
        return Str::replace(config('app.url'), config('app.front_url'), $url);
    }
}
