<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestIdConverter
{
    const ARG_ID = "id";


    public static function fromRest(array $args): int
    {
        return StringNumberHelper::parseIntOrError($args, self::ARG_ID);
    }
}
