<?php

namespace App\Services;

use Carbon\CarbonInterface;
use Illuminate\Contracts\Session\Session;

class PendingRegistrationSession
{
    private const EMAIL_KEY = 'pre_registered_email';

    private const EXPIRES_AT_KEY = 'pre_registered_expires_at';

    private const EXPIRES_AT_MINUTES = 60;

    public function __construct(private Session $session) {}

    public function store(string $email): void
    {
        $this->session->put(self::EMAIL_KEY, $email);
        $this->session->put(self::EXPIRES_AT_KEY, now()->addMinutes(self::EXPIRES_AT_MINUTES));
    }

    public function email(): ?string
    {
        $email = $this->session->get(self::EMAIL_KEY);
        $expires_at = $this->session->get(self::EXPIRES_AT_KEY);

        if (! is_string($email) || ! $expires_at instanceof CarbonInterface || $expires_at->isPast()) {
            $this->forget();

            return null;
        }

        return $email;
    }

    public function forget(): void
    {
        $this->session->forget(self::EMAIL_KEY);
        $this->session->forget(self::EXPIRES_AT_KEY);
    }
}
