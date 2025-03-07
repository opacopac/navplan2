<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestIdConverter
{
    const ARG_ID = "id";


    public static function getId(array $args): int
    {
        return StringNumberHelper::parseIntOrError($args, self::ARG_ID);
    }


    public static function getIdOrNull(array $args): ?int
    {
        return StringNumberHelper::parseIntOrNull($args, self::ARG_ID);
    }
}
