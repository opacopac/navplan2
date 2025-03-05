<?php declare(strict_types=1);

namespace Navplan\User\Rest\Model;

use Navplan\Common\StringNumberHelper;
use Navplan\User\UseCase\UpdatePw\UpdatePwRequest;


class UpdatePwRequestConverter
{
    public static function fromArgs(array $args, string $token): UpdatePwRequest
    {
        return new UpdatePwRequest(
            $token,
            StringNumberHelper::parseStringOrNull($args, "oldpassword"),
            StringNumberHelper::parseStringOrNull($args, "newpassword")
        );
    }
}
