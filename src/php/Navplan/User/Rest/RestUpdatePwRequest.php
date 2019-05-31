<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Shared\StringNumberService;
use Navplan\User\Domain\UpdatePwRequest;


class RestUpdatePwRequest {
    public static function fromArgs(array $args): UpdatePwRequest {
        return new UpdatePwRequest(
            StringNumberService::parseStringOrNull($args, "token"),
            StringNumberService::parseStringOrNull($args, "oldpassword"),
            StringNumberService::parseStringOrNull($args, "newpassword")
        );
    }
}
