<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestZoomConverter
{
    const ARG_ZOOM = "zoom";


    public static function fromArgs(array $args): int
    {
        return StringNumberHelper::parseIntOrError($args, self::ARG_ZOOM);
    }
}
