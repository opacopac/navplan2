<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestIdConverter
{
    const ARG_ID = "id";


    public static function getId(array $args, string $key = self::ARG_ID): int
    {
        return StringNumberHelper::parseIntOrError($args, $key);
    }


    public static function getIdOrNull(array $args, string $key = self::ARG_ID): ?int
    {
        return StringNumberHelper::parseIntOrNull($args, $key);
    }
}
