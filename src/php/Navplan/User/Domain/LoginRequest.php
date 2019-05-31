<?php declare(strict_types=1);

namespace Navplan\User\Domain;


class LoginRequest {
    public $email;
    public $password;
    public $rememberMe;


    public function __construct(
        string $email,
        string $password,
        bool $rememberMe
    )
    {
        $this->email = $email;
        $this->password = $password;
        $this->rememberMe = $rememberMe;
    }
}
