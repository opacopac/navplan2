<?php declare(strict_types=1);

namespace Navplan\Aerodrome\RestModel;

use Navplan\Aerodrome\DomainModel\ReportingPoint;
use Navplan\Common\RestModel\RestLengthConverter;
use Navplan\Common\RestModel\RestPosition2dConverter;
use Navplan\Common\RestModel\RestRing2dConverter;


class RestReportingPointConverter {
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
            "alt_min" => $rp->alt_min ? RestLengthConverter::toRest($rp->alt_min) : NULL,
            "alt_max" => $rp->alt_max ? RestLengthConverter::toRest($rp->alt_max) : NULL,
            "pos" => $rp->position ? RestPosition2dConverter::toRest($rp->position, self::ROUND_DIGITS_POS) : NULL, // only for reporting points
            "polygon" => $rp->polygon ? RestRing2dConverter::toRest($rp->polygon, self::ROUND_DIGITS_POLY) : NULL // only for reporting sectors
        );
    }


    public static function listToRest(array $rpList): array {
        return array_map(function ($rp) { return self::toRest($rp); }, $rpList);
    }
}
