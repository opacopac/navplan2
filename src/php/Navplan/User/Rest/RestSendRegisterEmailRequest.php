<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Shared\StringNumberService;
use Navplan\User\Domain\SendRegisterEmailRequest;


class RestSendRegisterEmailRequest {
    public static function fromArgs(array $args): SendRegisterEmailRequest {
        return new SendRegisterEmailRequest(
            StringNumberService::parseStringOrError($args, "email")
        );
    }
}
