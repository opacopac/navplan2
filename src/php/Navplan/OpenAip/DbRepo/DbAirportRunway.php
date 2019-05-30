<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\OpenAip\Domain\AirportRunway;


class DbAirportRunway {
    public static function fromDbResult(array $rs): AirportRunway {
        return new AirportRunway(
            $rs["name"],
            $rs["surface"],
            floatval($rs["length"]),
            floatval($rs["width"]),
            intval($rs["direction1"]),
            intval($rs["direction2"]),
            intval($rs["tora1"]),
            intval($rs["tora2"]),
            intval($rs["lda1"]),
            intval($rs["lda2"]),
            boolval($rs["papi1"]),
            boolval($rs["papi2"])
        );
    }
}
