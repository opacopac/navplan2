<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\User\Domain\User;
use Navplan\User\UseCase\UserHelper;


class DummyUser1 {
    public static function create(): User {
        return new User(
            123,
            UserHelper::createToken("test@navplan.ch", FALSE),
            "test@navplan.ch",
            password_hash('123456', PASSWORD_BCRYPT)
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 22,
            "token" => UserHelper::createToken("test@navplan.ch", FALSE),
            "email" => "test@navplan.ch",
            "pw_hash" => password_hash('123456', PASSWORD_BCRYPT)
        );
    }
}
