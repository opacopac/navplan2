<?php declare(strict_types=1);

namespace Navplan\User\Rest\Model;

use Navplan\Common\StringNumberHelper;
use Navplan\User\UseCase\SendRegisterEmail\SendRegisterEmailRequest;


class SendRegisterEmailRequestConverter {
    public static function fromArgs(array $args): SendRegisterEmailRequest {
        return new SendRegisterEmailRequest(
            StringNumberHelper::parseStringOrError($args, "email")
        );
    }
}
