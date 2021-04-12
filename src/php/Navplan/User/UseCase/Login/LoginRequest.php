<?php declare(strict_types=1);

namespace Navplan\User\UseCase\Login;


class LoginRequest {
    public function __construct(
        public string $email,
        public string $password,
        public bool $rememberMe
    ) {
    }
}
