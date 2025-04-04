<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\System\Domain\Model\IDbResult;


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
