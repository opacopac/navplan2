<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbModel;

use Navplan\Aerodrome\DomainModel\AirportChart;


class DbAirportChartConverter {
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
