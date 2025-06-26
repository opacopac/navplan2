<?php declare(strict_types=1);

namespace Navplan\User\UseCase;


class UserResponse {
    public function __construct(
        public int $code,
        public ?string $message,
        public ?string $email = NULL,
        public ?string $token = NULL,
        public bool $isModerator = false
    )
    {
    }
}
