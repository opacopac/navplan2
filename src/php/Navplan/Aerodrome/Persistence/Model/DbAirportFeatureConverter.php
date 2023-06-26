<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportFeature;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;


class DbAirportFeatureConverter {
    public static function fromDbRow(array $row): AirportFeature {
        return new AirportFeature(
            $row["type"],
            $row["name"],
            DbPosition2dConverter::fromDbRow($row)
        );
    }
}
