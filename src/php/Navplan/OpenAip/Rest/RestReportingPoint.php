<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\Geometry\Rest\RestLength;
use Navplan\Geometry\Rest\RestPosition2d;
use Navplan\Geometry\Rest\RestRing2d;
use Navplan\OpenAip\Domain\ReportingPoint;


class RestReportingPoint {
    public const ROUND_DIGITS_POS = 6;
    public const ROUND_DIGITS_POLY = 6;


    public static function toRest(ReportingPoint $rp): array {
        return array(
            "id" => $rp->id,
            "type" => $rp->type,
            "airport_icao" => $rp->airport_icao,
            "name" => $rp->name,
            "heli" => $rp->heli,
            "inbd_comp" => $rp->inbd_comp,
            "outbd_comp" => $rp->outbd_comp,
            "alt_min" => $rp->alt_min ? RestLength::toRest($rp->alt_min) : NULL,
            "alt_max" => $rp->alt_max ? RestLength::toRest($rp->alt_max) : NULL,
            "pos" => $rp->position ? RestPosition2d::toRest($rp->position, self::ROUND_DIGITS_POS) : NULL, // only for reporting points
            "polygon" => $rp->polygon ? RestRing2d::toRest($rp->polygon, self::ROUND_DIGITS_POLY) : NULL // only for reporting sectors
        );
    }
}
