<?php declare(strict_types=1);

namespace Navplan\User\Domain;


class AutoLoginRequest {
    public $token;


    public function __construct(string $token) {
        $this->token = $token;
    }
}
