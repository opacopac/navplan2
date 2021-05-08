<?php declare(strict_types=1);

namespace Navplan\Ivao\DbModel;

use Navplan\Geometry\DbModel\Line2dConverter;
use Navplan\Ivao\DomainModel\Circuit;


class DbCircuitConverter {
    public static function fromDbRow(array $row): Circuit {
        return new Circuit(
            $row["airportIcao"],
            $row["section"],
            $row["appendix"],
            $row["comment"],
            Line2dConverter::fromWktMultiLineString($row["lines2d"])
        );
    }
}
