<?php declare(strict_types=1);

namespace Navplan\User\Domain;


class UpdatePwRequest {
    public $token;
    public $oldPassword;
    public $newPassword;


    public function __construct(
        string $email,
        string $password,
        string $rememberMe
    )
    {
        $this->token = $email;
        $this->oldPassword = $password;
        $this->newPassword = $rememberMe;
    }
}
