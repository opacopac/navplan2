<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbModel;

use Navplan\Aerodrome\DomainModel\AirportRunway;
use Navplan\Aerodrome\DomainModel\AirportRunwayType;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\StringNumberHelper;


class DbAirportRunwayConverter {
    public static function fromDbRow(array $row): AirportRunway {
        $length = StringNumberHelper::parseFloatOrNull($row, "length", TRUE);
        $width = StringNumberHelper::parseFloatOrNull($row, "width", TRUE);
        $tora = StringNumberHelper::parseFloatOrNull($row, "tora", TRUE);
        $lda = StringNumberHelper::parseFloatOrNull($row, "lda", TRUE);

        return new AirportRunway(
            $row["name"],
            AirportRunwayType::from($row["surface"]),
            $length ? new Length($length, LengthUnit::M) : NULL,
            $width ? new Length($width, LengthUnit::M) : NULL,
            intval($row["direction"]),
            $tora ? new Length($tora, LengthUnit::M) : NULL,
            $lda ? new Length($lda, LengthUnit::M) : NULL,
            StringNumberHelper::parseBoolOrNull($row, "papi"),
        );
    }
}
