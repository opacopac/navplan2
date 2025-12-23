<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Converter;

use Navplan\Common\Rest\Converter\RestTimestampIntervalConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Notam\Domain\Service\NotamIcaoRequest;


class RestNotamByIcaoRequestConverter {
    const ARG_ICAO = "icao";


    public static function fromRest(array $args): NotamIcaoRequest {
        return new NotamIcaoRequest(
            StringNumberHelper::parseStringOrError($args, self::ARG_ICAO),
            RestTimestampIntervalConverter::fromRest($args)
        );
    }
}
