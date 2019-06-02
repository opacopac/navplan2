<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\User\Domain\User;


class DbUser {
    public static function fromDbResult(array $rs): User {
        return new User(
            intval($rs["id"]),
            $rs["token"],
            $rs["email"],
            $rs["pw_hash"]
        );
    }
}
