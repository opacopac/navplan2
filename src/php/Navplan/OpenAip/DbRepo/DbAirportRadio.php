<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\OpenAip\Domain\AirportRadio;


class DbAirportRadio {
    public static function fromDbResult(array $rs): AirportRadio {
        return new AirportRadio(
            $rs["category"],
            $rs["frequency"],
            $rs["type"],
            $rs["typespec"],
            $rs["description"]
        );
    }
}
