<?php declare(strict_types=1);

namespace Navplan\Airport\DbModel;

use Navplan\Airport\DomainModel\AirportCircuit;
use Navplan\Geometry\DbModel\Line2dConverter;


class DbAirportCircuitConverter {
    public static function fromDbRow(array $row): AirportCircuit {
        return new AirportCircuit(
            $row["airportIcao"],
            $row["section"],
            $row["appendix"],
            $row["comment"],
            Line2dConverter::fromWktMultiLineString($row["lines2d"])
        );
    }
}
