<?php declare(strict_types=1);

namespace Navplan\Airport\DbModel;

use Navplan\Airport\DomainModel\AirportRunway;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\StringNumberHelper;


class DbAirportRunwayConverter {
    public static function fromDbRow(array $row): AirportRunway {
        $length = StringNumberHelper::parseFloatOrNull($row, "length", TRUE);
        $width = StringNumberHelper::parseFloatOrNull($row, "width", TRUE);
        $tora1 = StringNumberHelper::parseFloatOrNull($row, "tora1", TRUE);
        $tora2 = StringNumberHelper::parseFloatOrNull($row, "tora2", TRUE);
        $lda1 = StringNumberHelper::parseFloatOrNull($row, "lda1", TRUE);
        $lda2 = StringNumberHelper::parseFloatOrNull($row, "lda2", TRUE);

        return new AirportRunway(
            $row["name"],
            $row["surface"],
            $length ? new Length($length, LengthUnit::M) : NULL,
            $width ? new Length($width, LengthUnit::M) : NULL,
            intval($row["direction1"]),
            intval($row["direction2"]),
            $tora1 ? new Length($tora1, LengthUnit::M) : NULL,
            $tora2 ? new Length($tora2, LengthUnit::M) : NULL,
            $lda1 ? new Length($lda1, LengthUnit::M) : NULL,
            $lda2 ? new Length($lda2, LengthUnit::M) : NULL,
            StringNumberHelper::parseBoolOrNull($row, "papi1"),
            StringNumberHelper::parseBoolOrNull($row, "papi2")
        );
    }
}
