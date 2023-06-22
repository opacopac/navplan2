<?php declare(strict_types=1);

namespace Navplan\Geoname\Persistence\Model;

use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Common\DomainModel\Altitude;
use Navplan\Geoname\Domain\Model\Geoname;


class DbGeonameConverter {
    public static function fromDbRow(array $row): Geoname {
        return new Geoname(
            intval($row["geonameid"]),
            $row["name"],
            $row["name"],
            $row["feature_class"],
            $row["feature_code"],
            $row["country_code"],
            $row["admin1_name"],
            $row["admin2_name"],
            intval($row["population"]),
            DbPosition2dConverter::fromDbRow($row),
            Altitude::fromMtAmsl(floatval($row["elevation"]))
        );
    }
}
