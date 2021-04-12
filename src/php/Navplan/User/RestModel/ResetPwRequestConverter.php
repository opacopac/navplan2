<?php declare(strict_types=1);

namespace Navplan\User\RestModel;

use Navplan\Shared\StringNumberHelper;
use Navplan\User\UseCase\ResetPw\ResetPwRequest;


class ResetPwRequestConverter {
    public static function fromArgs(array $args): ResetPwRequest {
        return new ResetPwRequest(
            StringNumberHelper::parseStringOrError($args, "token"),
            StringNumberHelper::parseStringOrError($args, "password"),
            StringNumberHelper::parseIntOrError($args, "rememberme") === 1
        );
    }
}
