<?php declare(strict_types=1);

namespace Navplan\User\Rest\Model;

use Navplan\Common\StringNumberHelper;


class TokenRequestConverter
{
    const ARG_TOKEN = "token";


    public static function getToken(array $cookies): string
    {
        return StringNumberHelper::parseStringOrError($cookies, self::ARG_TOKEN);
    }
}
