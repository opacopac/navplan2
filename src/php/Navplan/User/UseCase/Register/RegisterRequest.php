<?php declare(strict_types=1);

namespace Navplan\User\UseCase\Register;


class RegisterRequest {
    public function __construct(
        public string $token,
        public string $password,
        public bool $rememberMe
    ) {
    }
}
