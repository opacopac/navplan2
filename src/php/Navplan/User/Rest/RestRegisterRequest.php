<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Shared\StringNumberService;
use Navplan\User\Domain\RegisterRequest;


class RestRegisterRequest {
    public static function fromArgs(array $args): RegisterRequest {
        return new RegisterRequest(
            StringNumberService::parseStringOrError($args, "token"),
            StringNumberService::parseStringOrError($args, "password"),
            StringNumberService::parseIntOrError($args, "rememberme") === 1
        );
    }
}
