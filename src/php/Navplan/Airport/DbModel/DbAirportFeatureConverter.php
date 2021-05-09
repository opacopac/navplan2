<?php declare(strict_types=1);

namespace Navplan\Airport\DbModel;

use Navplan\Airport\DomainModel\AirportFeature;
use Navplan\Common\DbModel\DbPosition2dConverter;


class DbAirportFeatureConverter {
    public static function fromDbRow(array $row): AirportFeature {
        return new AirportFeature(
            $row["type"],
            $row["name"],
            DbPosition2dConverter::fromDbRow($row)
        );
    }
}
