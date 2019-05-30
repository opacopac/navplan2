<?php declare(strict_types=1);

namespace Navplan\Notam\Rest;

use InvalidArgumentException;
use Navplan\Geometry\Domain\Circle2d;
use Navplan\Geometry\Domain\IGeometry2d;
use Navplan\Geometry\Domain\MultiRing2d;
use Navplan\Geometry\Domain\Ring2d;
use Navplan\Geometry\Rest\RestAltitude;
use Navplan\Geometry\Rest\RestCircle2d;
use Navplan\Notam\Domain\NotamGeometry;


class RestNotamGeometry {
    public static function toArray(NotamGeometry $notamGeometry): array {
        return array(
            "shape" => self::getShape($notamGeometry->shape),
            "bottom_alt" => $notamGeometry->bottomAltitude ? RestAltitude::toArray($notamGeometry->bottomAltitude) : NULL,
            "top_alt" => $notamGeometry->topAltitude ? RestAltitude::toArray($notamGeometry->topAltitude) : NULL,
        );
    }


    private static function getShape(IGeometry2d $shape): array {
        if ($shape instanceof Circle2d) {
            return array(
                "circle" => RestCircle2d::toArray($shape)
            );
        } else if ($shape instanceof Ring2d) {
            return array(
                "polygon" => $shape->toArray()
            );
        } else if ($shape instanceof MultiRing2d) {
            return array(
                "multipolygon" => $shape->toArray()
            );
        } else {
            throw new InvalidArgumentException('unknown shape');
        }
    }
}
