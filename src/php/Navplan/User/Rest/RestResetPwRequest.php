<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Shared\StringNumberService;
use Navplan\User\Domain\ResetPwRequest;


class RestResetPwRequest {
    public static function fromArgs(array $args): ResetPwRequest {
        return new ResetPwRequest(
            StringNumberService::parseStringOrError($args, "token"),
            StringNumberService::parseStringOrError($args, "password"),
            StringNumberService::parseIntOrError($args, "rememberme") === 1
        );
    }
}
