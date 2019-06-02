<?php declare(strict_types=1);

namespace Navplan\User\Domain;


class User {
    public $id;
    public $token;
    public $email;
    public $pwhash;


    public function __construct(
        int $id,
        string $token,
        string $email,
        string $pwhash
    ) {
        $this->id = $id;
        $this->token = $token;
        $this->email = $email;
        $this->pwhash = $pwhash;
    }
}
