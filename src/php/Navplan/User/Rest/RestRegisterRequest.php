<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Shared\StringNumberHelper;
use Navplan\User\Domain\RegisterRequest;


class RestRegisterRequest {
    public static function fromArgs(array $args): RegisterRequest {
        return new RegisterRequest(
            StringNumberHelper::parseStringOrError($args, "token"),
            StringNumberHelper::parseStringOrError($args, "password"),
            StringNumberHelper::parseIntOrError($args, "rememberme") === 1
        );
    }
}
