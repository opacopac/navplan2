<?php declare(strict_types=1);

namespace Navplan\Geoname\DbRepo;

use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Common\DomainModel\Altitude;
use Navplan\Geoname\DomainModel\Geoname;


class DbGeonameConverter {
    public static function fromDbRow(array $row): Geoname {
        return new Geoname(
            intval($row["geonameid"]),
            $row["name"],
            $row["searchresultname"],
            $row["feature_class"],
            $row["feature_code"],
            $row["country"],
            $row["admin1"],
            $row["admin2"],
            intval($row["population"]),
            DbPosition2dConverter::fromDbRow($row),
            Altitude::fromMtAmsl($row["elevation"])
        );
    }
}
