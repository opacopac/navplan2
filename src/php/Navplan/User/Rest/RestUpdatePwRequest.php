<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Shared\StringNumberHelper;
use Navplan\User\Domain\UpdatePwRequest;


class RestUpdatePwRequest {
    public static function fromArgs(array $args): UpdatePwRequest {
        return new UpdatePwRequest(
            StringNumberHelper::parseStringOrNull($args, "token"),
            StringNumberHelper::parseStringOrNull($args, "oldpassword"),
            StringNumberHelper::parseStringOrNull($args, "newpassword")
        );
    }
}
