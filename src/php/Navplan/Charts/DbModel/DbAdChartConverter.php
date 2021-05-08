<?php declare(strict_types=1);

namespace Navplan\Charts\DbModel;

use Navplan\Charts\DomainModel\AdChart;


class DbAdChartConverter {
    public static function fromDbRow(array $row): AdChart {
        return new AdChart(
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
