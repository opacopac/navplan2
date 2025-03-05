<?php declare(strict_types=1);

namespace Navplan\User\Rest\Model;

use Navplan\Common\StringNumberHelper;
use Navplan\User\UseCase\Register\RegisterRequest;


class RegisterRequestConverter
{
    public static function fromArgs(array $args, string $token): RegisterRequest
    {
        return new RegisterRequest(
            $token,
            StringNumberHelper::parseStringOrError($args, "password"),
            StringNumberHelper::parseIntOrError($args, "rememberme") === 1
        );
    }
}
