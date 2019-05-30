<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

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
            floatval($rs["elevation"]),
            $rs["frequency"],
            $unit,
            floatval($rs["declination"]),
            boolval($rs["truenorth"])
        );
    }
}
