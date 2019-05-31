<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Shared\StringNumberService;
use Navplan\User\Domain\SendLostPwRequest;


class RestSendLostPwRequest {
    public static function fromArgs(array $args): SendLostPwRequest {
        return new SendLostPwRequest(
            StringNumberService::parseStringOrError($args, "email")
        );
    }
}
