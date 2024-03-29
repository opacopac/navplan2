<?php declare(strict_types=1);

namespace Navplan\User\Rest\Model;

use Navplan\Common\StringNumberHelper;
use Navplan\User\UseCase\SendLostPw\SendLostPwRequest;


class SendLostPwRequestConverter {
    public static function fromArgs(array $args): SendLostPwRequest {
        return new SendLostPwRequest(
            StringNumberHelper::parseStringOrError($args, "email")
        );
    }
}
