<?php declare(strict_types=1);

namespace Navplan\User\Domain\Model;


class User {
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
        public int $id,
        public string $token,
        public string $email,
        public string $pwhash
    ) {
    }
}
