<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportCircuit;
use Navplan\Common\Persistence\Model\DbLine2dConverter;


class DbAirportCircuitConverter {
    public static function fromDbRow(array $row): AirportCircuit {
        return new AirportCircuit(
            $row["airportIcao"],
            $row["section"],
            $row["appendix"],
            $row["comment"],
            DbLine2dConverter::fromWktMultiLineString($row["lines2d"])
        );
    }
}
