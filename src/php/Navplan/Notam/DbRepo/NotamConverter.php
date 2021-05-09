<?php declare(strict_types=1);

namespace Navplan\Notam\DbRepo;

use Navplan\Common\StringNumberHelper;
use Navplan\Notam\DomainModel\Notam;


class NotamConverter {
    public static function fromDbRow(array $row): Notam {
        $notam = json_decode($row["notam"], true);

        return new Notam(
            intval($row["id"]),
            $notam["StateCode"],
            $notam["StateName"],
            $notam["id"],
            StringNumberHelper::parseStringOrNull($notam, "entity"),
            StringNumberHelper::parseStringOrNull($notam, "status"),
            StringNumberHelper::parseStringOrNull($notam, "Qcode"),
            StringNumberHelper::parseStringOrNull($notam, "Area"),
            StringNumberHelper::parseStringOrNull($notam, "SubArea"),
            StringNumberHelper::parseStringOrNull($notam, "Condition"),
            StringNumberHelper::parseStringOrNull($notam, "Subject"),
            StringNumberHelper::parseStringOrNull($notam, "Modifier"),
            StringNumberHelper::parseStringOrNull($notam, "message"),
            $notam["startdate"],
            $notam["enddate"],
            $notam["all"],
            $notam["location"],
            boolval($notam["isICAO"]),
            $notam["Created"],
            $notam["key"],
            $notam["type"],
            NotamGeometryConverter::fromDbRow($row)
        );
    }
}
