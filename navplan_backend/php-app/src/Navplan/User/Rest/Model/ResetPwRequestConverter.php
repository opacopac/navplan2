<?php declare(strict_types=1);

namespace Navplan\User\Rest\Model;

use Navplan\Common\StringNumberHelper;
use Navplan\User\UseCase\ResetPw\ResetPwRequest;


class ResetPwRequestConverter {
    public static function fromArgs(array $args, string $token): ResetPwRequest {
        return new ResetPwRequest(
            $token,
            StringNumberHelper::parseStringOrError($args, "password"),
            StringNumberHelper::parseIntOrError($args, "rememberme") === 1
        );
    }
}
