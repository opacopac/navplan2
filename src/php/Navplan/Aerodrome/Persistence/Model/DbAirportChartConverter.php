<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportChart;
use Navplan\System\DomainModel\IDbResult;


class DbAirportChartConverter {
    /**
     * @param IDbResult $result
     * @return AirportChart[]
     */
    public static function fromDbResult(IDbResult $result): array {
        $charts = [];
        while ($row = $result->fetch_assoc()) {
            $charts[] = self::fromDbRow($row);
        }

        return $charts;
    }


    public static function fromDbRow(array $row): AirportChart {
        return new AirportChart(
            intval($row["id"]),
            $row["airport_icao"],
            $row["source"],
            $row["type"],
            $row["filename"],
            intval($row["mercator_n"]),
            intval($row["mercator_s"]),
            intval($row["mercator_e"]),
            intval($row["mercator_w"])
        );
    }
}
