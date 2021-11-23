<?php declare(strict_types=1);

namespace Navplan\Notam\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\Notam\UseCase\SearchNotam\ReadNotamByIcaoRequest;


class ReadNotamByIcaoRequestConverter {
    const ARG_ICAO = "icao";
    const ARG_MIN_NOTAM_TIME = "starttimestamp";
    const ARG_MAX_NOTAM_TIME = "endtimestamp";


    public static function fromArgs(array $args): ReadNotamByIcaoRequest {
        return new ReadNotamByIcaoRequest(
            StringNumberHelper::parseStringOrError($args, self::ARG_ICAO),
            StringNumberHelper::parseIntOrError($args, self::ARG_MIN_NOTAM_TIME),
            StringNumberHelper::parseIntOrError($args, self::ARG_MAX_NOTAM_TIME)
        );
    }
}
