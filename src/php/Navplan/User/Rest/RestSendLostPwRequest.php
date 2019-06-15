<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Shared\StringNumberHelper;
use Navplan\User\Domain\SendLostPwRequest;


class RestSendLostPwRequest {
    public static function fromArgs(array $args): SendLostPwRequest {
        return new SendLostPwRequest(
            StringNumberHelper::parseStringOrError($args, "email")
        );
    }
}
