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
            self::getShapeType($notamGeometry->shape) => self::getShape($notamGeometry->shape),
            "alt_bottom" => $notamGeometry->bottomAltitude ? RestAltitude::toRest($notamGeometry->bottomAltitude) : NULL,
            "alt_top" => $notamGeometry->topAltitude ? RestAltitude::toRest($notamGeometry->topAltitude) : NULL,
        );
    }


    private static function getShapeType(IGeometry2d $shape): string {
        if ($shape instanceof Circle2d) {
            return "circle";
        } else if ($shape instanceof Ring2d) {
            return "polygon";
        } else if ($shape instanceof MultiRing2d) {
            return "multipolygon";
        } else {
            throw new InvalidArgumentException('unknown shape');
        }
    }


    private static function getShape(IGeometry2d $shape): array {
        if ($shape instanceof Circle2d) {
            return RestCircle2d::toRest($shape);
        } else if ($shape instanceof Ring2d) {
            return $shape->toArray();
        } else if ($shape instanceof MultiRing2d) {
            return $shape->toArray();
        } else {
            throw new InvalidArgumentException('unknown shape');
        }
    }
}
