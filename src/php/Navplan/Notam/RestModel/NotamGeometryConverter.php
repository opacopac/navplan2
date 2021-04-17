<?php declare(strict_types=1);

namespace Navplan\Notam\RestModel;

use InvalidArgumentException;
use Navplan\Geometry\DomainModel\Circle2d;
use Navplan\Geometry\DomainModel\IGeometry2d;
use Navplan\Geometry\DomainModel\MultiRing2d;
use Navplan\Geometry\DomainModel\Ring2d;
use Navplan\Geometry\RestModel\AltitudeConverter;
use Navplan\Geometry\RestModel\Circle2dConverter;
use Navplan\Notam\DomainModel\NotamGeometry;


class NotamGeometryConverter {
    public static function toRest(NotamGeometry $notamGeometry): array {
        return array(
            self::getShapeType($notamGeometry->shape) => self::getShape($notamGeometry->shape),
            "alt_bottom" => $notamGeometry->bottomAltitude ? AltitudeConverter::toRest($notamGeometry->bottomAltitude) : NULL,
            "alt_top" => $notamGeometry->topAltitude ? AltitudeConverter::toRest($notamGeometry->topAltitude) : NULL,
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
            return Circle2dConverter::toRest($shape);
        } else if ($shape instanceof Ring2d) {
            return $shape->toArray();
        } else if ($shape instanceof MultiRing2d) {
            return $shape->toArray();
        } else {
            throw new InvalidArgumentException('unknown shape');
        }
    }
}
