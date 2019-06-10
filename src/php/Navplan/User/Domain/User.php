<?php declare(strict_types=1);

namespace Navplan\User\Domain;


class User {
    public $id;
    public $token;
    public $email;
    public $pwhash;


    public static function checkEmailFormat(string $email) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 100)
            return FALSE;

        return TRUE;
    }


    public static function checkPwFormat(string $password): bool {
        if (strlen($password) < 6 || strlen($password) > 50)
            return FALSE;

        return TRUE;
    }


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
