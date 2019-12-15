<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DataImport;


class SmaStationListParser {
    public static function fromJson(array $smaStationListJson): array {
        return array_map(
            function ($stationJson) { return SmaStationParser::fromJson($stationJson); },
            $smaStationListJson["features"]
        );
    }
}
