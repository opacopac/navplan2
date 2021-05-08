<?php declare(strict_types=1);

namespace Navplan\Navaid\DbModel;

use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Navaid\DomainModel\Navaid;


class DbNavaidConverter {
    public static function fromDbResult(array $rs): Navaid {
        $unit = "MHz";
        if ($rs["type"] == "NDB")
            $unit = "kHz";

        return new Navaid(
            intval($rs["id"]),
            $rs["type"],
            $rs["kuerzel"],
            $rs["name"],
            new Position2d(floatval($rs["longitude"]), floatval($rs["latitude"])),
            new Length(floatval($rs["elevation"]), LengthUnit::M),
            $rs["frequency"],
            $unit,
            floatval($rs["declination"]),
            boolval($rs["truenorth"])
        );
    }
}
