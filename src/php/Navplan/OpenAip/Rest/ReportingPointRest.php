<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\OpenAip\Domain\ReportingPoint;


class ReportingPointRest {
    public static function toArray(ReportingPoint $rp): array {
        return array(
            "id" => $rp->id,
            "type" => $rp->type,
            "airport_icao" => $rp->airport_icao,
            "name" => $rp->name,
            "heli" => $rp->heli,
            "inbd_comp" => $rp->inbd_comp,
            "outbd_comp" => $rp->outbd_comp,
            "min_ft" => $rp->min_ft,
            "max_ft" => $rp->max_ft,
            "latitude" => $rp->position ? RestHelper::reduceDegAccuracy($rp->position->latitude, "REPORTINGPOINT") : NULL, // only for reporting points
            "longitude" => $rp->position ? RestHelper::reduceDegAccuracy($rp->position->longitude, "REPORTINGPOINT") : NULL, // only for reporting points
            "polygon" => $rp->polygon // only for reporting sectors
        );
    }
}
