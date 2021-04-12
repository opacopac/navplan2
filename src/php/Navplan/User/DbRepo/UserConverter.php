<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\User\DomainModel\User;


class UserConverter {
    public static function fromDbResult(array $rs): User {
        return new User(
            intval($rs["id"]),
            $rs["token"],
            $rs["email"],
            $rs["pw_hash"]
        );
    }
}
