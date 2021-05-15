<?php declare(strict_types=1);

namespace Navplan\Enroute\DbModel;

use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Enroute\DomainModel\Navaid;


class DbNavaidConverter {
    public static function fromDbRow(array $row): Navaid {
        $unit = "MHz";
        if ($row["type"] == "NDB")
            $unit = "kHz";

        return new Navaid(
            intval($row["id"]),
            $row["type"],
            $row["kuerzel"],
            $row["name"],
            DbPosition2dConverter::fromDbRow($row),
            new Length(floatval($row["elevation"]), LengthUnit::M),
            $row["frequency"],
            $unit,
            floatval($row["declination"]),
            boolval($row["truenorth"])
        );
    }
}
