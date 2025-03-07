<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestActionConverter
{
    const ARG_ACTION = "action";

    public static function getAction(array $args): string
    {
        return StringNumberHelper::parseStringOrError($args, self::ARG_ACTION);
    }


    public static function getActionOrNull(array $args): ?string
    {
        return StringNumberHelper::parseStringOrNull($args, self::ARG_ACTION);
    }
}
