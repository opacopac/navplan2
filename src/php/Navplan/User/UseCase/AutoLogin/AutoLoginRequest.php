<?php declare(strict_types=1);

namespace Navplan\User\UseCase\AutoLogin;


class AutoLoginRequest {
    public function __construct(public string $token) {
    }
}
