<?php declare(strict_types=1);

namespace Navplan\User\Rest\Model;

use Navplan\Common\StringNumberHelper;
use Navplan\User\UseCase\AutoLogin\AutoLoginRequest;


class AutoLoginRequestConverter {
    public static function fromArgs(array $args): AutoLoginRequest {
        return new AutoLoginRequest(
            StringNumberHelper::parseStringOrError($args, "token")
        );
    }
}
