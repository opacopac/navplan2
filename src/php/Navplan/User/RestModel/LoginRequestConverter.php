<?php declare(strict_types=1);

namespace Navplan\User\RestModel;

use Navplan\Shared\StringNumberHelper;
use Navplan\User\UseCase\Login\LoginRequest;


class LoginRequestConverter {
    public static function fromArgs(array $args): LoginRequest {
        return new LoginRequest(
            StringNumberHelper::parseStringOrError($args, "email"),
            StringNumberHelper::parseStringOrError($args, "password"),
            StringNumberHelper::parseIntOrError($args, "rememberme") === 1
        );
    }
}
