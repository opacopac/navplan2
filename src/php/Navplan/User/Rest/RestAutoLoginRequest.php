<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Shared\StringNumberHelper;
use Navplan\User\Domain\AutoLoginRequest;


class RestAutoLoginRequest {
    public static function fromArgs(array $args): AutoLoginRequest {
        return new AutoLoginRequest(
            StringNumberHelper::parseStringOrError($args, "token")
        );
    }
}
