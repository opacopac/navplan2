<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Model;

use Navplan\Common\Domain\Model\TimestampInterval;
use Navplan\Common\Rest\Converter\RestTimestampIntervalConverter;
use Navplan\Common\StringNumberHelper;


class ReadNotamByIcaoRequest {
    const ARG_ICAO = "icao";


    public function __construct(
        public string $airportIcao,
        public TimestampInterval $interval
    ) {
    }


    public static function fromRest(array $args): ReadNotamByIcaoRequest {
        return new ReadNotamByIcaoRequest(
            StringNumberHelper::parseStringOrError($args, self::ARG_ICAO),
            RestTimestampIntervalConverter::fromRest($args)
        );
    }
}
