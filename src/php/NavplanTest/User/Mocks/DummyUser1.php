<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\User\Domain\User;
use Navplan\User\UseCase\TokenService;


class DummyUser1 {
    public static function create(TokenService $tokenService): User {
        return new User(
            123,
            $tokenService->createToken("test@navplan.ch", FALSE),
            "test@navplan.ch",
            password_hash('123456', PASSWORD_BCRYPT)
        );
    }


    public static function createDbResult(TokenService $tokenService): array {
        return array(
            "id" => 22,
            "token" => $tokenService->createToken("test@navplan.ch", FALSE),
            "email" => "test@navplan.ch",
            "pw_hash" => password_hash('123456', PASSWORD_BCRYPT)
        );
    }
}
