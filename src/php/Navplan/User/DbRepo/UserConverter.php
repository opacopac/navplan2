<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\User\DomainModel\User;


class UserConverter {
    public static function fromDbRow(array $row): User {
        return new User(
            intval($row["id"]),
            $row["token"],
            $row["email"],
            $row["pw_hash"]
        );
    }
}
