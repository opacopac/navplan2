<?php declare(strict_types=1);

namespace Navplan\Exporter\Rest\Converter;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Rest\Converter\RestFlightrouteConverter;
use Navplan\Track\Domain\Model\Track;
use Navplan\Track\Rest\Model\RestTrackConverter;


class RestExportGpxRequest {
    const ARG_FLIGHTROUTE = "flightroute";
    const ARG_TRACK = "track";


    public function __construct(
        public Flightroute $flightroute,
        public Track $track,
    ) {
    }


    public static function fromRest(array $args): RestExportGpxRequest {
        return new RestExportGpxRequest(
            RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE]),
            RestTrackConverter::fromRest($args[self::ARG_TRACK]),
        );
    }
}
