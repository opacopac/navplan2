<?php declare(strict_types=1);

namespace Navplan\User\Domain;


class RegisterRequest {
    public $token;
    public $password;
    public $rememberMe;


    public function __construct(
        string $token,
        string $password,
        bool $rememberMe
    )
    {
        $this->token = $token;
        $this->password = $password;
        $this->rememberMe = $rememberMe;
    }
}
