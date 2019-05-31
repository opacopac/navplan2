<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Shared\StringNumberService;
use Navplan\User\Domain\LoginRequest;


class RestLoginRequest {
    public static function fromArgs(array $args): LoginRequest {
        return new LoginRequest(
            StringNumberService::parseStringOrError($args, "email"),
            StringNumberService::parseStringOrError($args, "password"),
            StringNumberService::parseIntOrError($args, "rememberme") === 1
        );
    }
}
