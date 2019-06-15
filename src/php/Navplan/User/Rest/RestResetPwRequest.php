<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Shared\StringNumberHelper;
use Navplan\User\Domain\ResetPwRequest;


class RestResetPwRequest {
    public static function fromArgs(array $args): ResetPwRequest {
        return new ResetPwRequest(
            StringNumberHelper::parseStringOrError($args, "token"),
            StringNumberHelper::parseStringOrError($args, "password"),
            StringNumberHelper::parseIntOrError($args, "rememberme") === 1
        );
    }
}
