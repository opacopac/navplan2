<?php declare(strict_types=1);

namespace Navplan\User\Persistence\Model;

use Navplan\User\Domain\Model\User;


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
