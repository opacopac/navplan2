<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Converter;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Circle2d;
use Navplan\Common\Domain\Model\IGeometry2d;
use Navplan\Common\Domain\Model\MultiRing2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\Common\Rest\Converter\RestCircle2dConverter;
use Navplan\Notam\Domain\Model\NotamGeometry;


class RestNotamGeometryConverter {
    public static function toRest(NotamGeometry $notamGeometry): array {
        return array(
            self::getShapeType($notamGeometry->shape) => self::getShape($notamGeometry->shape),
            "alt_bottom" => $notamGeometry->bottomAltitude ? RestAltitudeConverter::toRest($notamGeometry->bottomAltitude) : NULL,
            "alt_top" => $notamGeometry->topAltitude ? RestAltitudeConverter::toRest($notamGeometry->topAltitude) : NULL,
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
            return RestCircle2dConverter::toRest($shape);
        } else if ($shape instanceof Ring2d) {
            return $shape->toArray();
        } else if ($shape instanceof MultiRing2d) {
            return $shape->toArray();
        } else {
            throw new InvalidArgumentException('unknown shape');
        }
    }
}
