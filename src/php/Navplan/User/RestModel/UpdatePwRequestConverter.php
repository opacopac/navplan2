<?php declare(strict_types=1);

namespace Navplan\User\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\User\UseCase\UpdatePw\UpdatePwRequest;


class UpdatePwRequestConverter {
    public static function fromArgs(array $args): UpdatePwRequest {
        return new UpdatePwRequest(
            StringNumberHelper::parseStringOrNull($args, "token"),
            StringNumberHelper::parseStringOrNull($args, "oldpassword"),
            StringNumberHelper::parseStringOrNull($args, "newpassword")
        );
    }
}
