<?php declare(strict_types=1);

namespace Navplan\User\RestModel;

use Navplan\Shared\StringNumberHelper;
use Navplan\User\UseCase\Register\RegisterRequest;


class RegisterRequestConverter {
    public static function fromArgs(array $args): RegisterRequest {
        return new RegisterRequest(
            StringNumberHelper::parseStringOrError($args, "token"),
            StringNumberHelper::parseStringOrError($args, "password"),
            StringNumberHelper::parseIntOrError($args, "rememberme") === 1
        );
    }
}