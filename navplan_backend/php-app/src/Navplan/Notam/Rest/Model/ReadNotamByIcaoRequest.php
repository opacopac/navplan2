<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Model;

use Navplan\Common\Rest\Converter\RestTimestampIntervalConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Notam\Domain\Service\NotamIcaoRequest;


class ReadNotamByIcaoRequest {
    const ARG_ICAO = "icao";


    public static function fromRest(array $args): NotamIcaoRequest {
        return new NotamIcaoRequest(
            StringNumberHelper::parseStringOrError($args, self::ARG_ICAO),
            RestTimestampIntervalConverter::fromRest($args)
        );
    }
}
