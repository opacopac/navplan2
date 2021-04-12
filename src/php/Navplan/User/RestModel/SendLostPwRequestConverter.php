<?php declare(strict_types=1);

namespace Navplan\User\RestModel;

use Navplan\Shared\StringNumberHelper;
use Navplan\User\UseCase\SendLostPw\SendLostPwRequest;


class SendLostPwRequestConverter {
    public static function fromArgs(array $args): SendLostPwRequest {
        return new SendLostPwRequest(
            StringNumberHelper::parseStringOrError($args, "email")
        );
    }
}
