<?php declare(strict_types=1);

namespace Navplan\User\Domain;


class UserResponse {
    public $code;
    public $message;
    public $email;
    public $token;


    public function __construct(
        int $errorCode,
        ?string $message,
        string $email = NULL,
        string $token = NULL
    )
    {
        $this->code = $errorCode;
        $this->message = $message;
        $this->email = $email;
        $this->token = $token;
    }
}
