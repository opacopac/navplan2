<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportChart2;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\System\Domain\Model\IDbResult;


class DbAirportChart2Converter {
    /**
     * @param IDbResult $result
     * @return AirportChart2[]
     */
    public static function fromDbResult(IDbResult $result): array {
        $charts = [];
        while ($row = $result->fetch_assoc()) {
            $charts[] = self::fromDbRow($row);
        }

        return $charts;
    }


    public static function fromDbRow(array $row): AirportChart2 {
        return new AirportChart2(
            intval($row["id"]),
            $row["ad_icao"],
            $row["source"],
            $row["type"],
            $row["filename"],
            Extent2d::createFromCoords(
                floatval($row["minlon"]),
                floatval($row["minlat"]),
                floatval($row["maxlon"]),
                floatval($row["maxlat"])
            )
        );
    }
}
