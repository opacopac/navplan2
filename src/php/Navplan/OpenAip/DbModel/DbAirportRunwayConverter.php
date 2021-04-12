<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbModel;

use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\OpenAip\DomainModel\AirportRunway;
use Navplan\Shared\StringNumberHelper;


class DbAirportRunwayConverter {
    public static function fromDbResult(array $rs): AirportRunway {
        $length = StringNumberHelper::parseFloatOrNull($rs, "length", TRUE);
        $width = StringNumberHelper::parseFloatOrNull($rs, "width", TRUE);
        $tora1 = StringNumberHelper::parseFloatOrNull($rs, "tora1", TRUE);
        $tora2 = StringNumberHelper::parseFloatOrNull($rs, "tora2", TRUE);
        $lda1 = StringNumberHelper::parseFloatOrNull($rs, "lda1", TRUE);
        $lda2 = StringNumberHelper::parseFloatOrNull($rs, "lda2", TRUE);

        return new AirportRunway(
            $rs["name"],
            $rs["surface"],
            $length ? new Length($length, LengthUnit::M) : NULL,
            $width ? new Length($width, LengthUnit::M) : NULL,
            intval($rs["direction1"]),
            intval($rs["direction2"]),
            $tora1 ? new Length($tora1, LengthUnit::M) : NULL,
            $tora2 ? new Length($tora2, LengthUnit::M) : NULL,
            $lda1 ? new Length($lda1, LengthUnit::M) : NULL,
            $lda2 ? new Length($lda2, LengthUnit::M) : NULL,
            StringNumberHelper::parseBoolOrNull($rs, "papi1"),
            StringNumberHelper::parseBoolOrNull($rs, "papi2")
        );
    }
}
