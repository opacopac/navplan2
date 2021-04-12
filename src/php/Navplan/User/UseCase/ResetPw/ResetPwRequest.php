<?php declare(strict_types=1);

namespace Navplan\User\UseCase\ResetPw;


class ResetPwRequest {
    public function __construct(
        public string $token,
        public string $password,
        public bool $rememberMe
    ) {
    }
}
