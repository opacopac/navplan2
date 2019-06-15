<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\Navaid;


class DbNavaid {
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
