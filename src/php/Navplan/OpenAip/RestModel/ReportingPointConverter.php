<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestModel;

use Navplan\Geometry\RestModel\LengthConverter;
use Navplan\Geometry\RestModel\Position2dConverter;
use Navplan\Geometry\RestModel\Ring2dConverter;
use Navplan\OpenAip\DomainModel\ReportingPoint;


class ReportingPointConverter {
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
            "alt_min" => $rp->alt_min ? LengthConverter::toRest($rp->alt_min) : NULL,
            "alt_max" => $rp->alt_max ? LengthConverter::toRest($rp->alt_max) : NULL,
            "pos" => $rp->position ? Position2dConverter::toRest($rp->position, self::ROUND_DIGITS_POS) : NULL, // only for reporting points
            "polygon" => $rp->polygon ? Ring2dConverter::toRest($rp->polygon, self::ROUND_DIGITS_POLY) : NULL // only for reporting sectors
        );
    }
}
