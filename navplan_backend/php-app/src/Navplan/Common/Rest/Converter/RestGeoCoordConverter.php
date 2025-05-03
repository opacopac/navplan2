<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Model\GeoCoordinateType;
use Navplan\Common\Domain\Model\GeoCoordinate;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\SwissTopo\Lv03Coordinate;
use Navplan\Common\Domain\SwissTopo\Lv95Coordinate;
use Navplan\Common\StringNumberHelper;


class RestGeoCoordConverter
{
    public static function toRest(GeoCoordinate $coord): array
    {
        return [
            $coord->getType()->value,
            $coord->getE(),
            $coord->getN()
        ];
    }


    public static function fromRest(array $args): GeoCoordinate
    {
        $type = GeoCoordinateType::from($args[0]);
        $e = StringNumberHelper::parseFloatOrError($args, 1);
        $n = StringNumberHelper::parseFloatOrError($args, 2);

        switch ($type) {
            case GeoCoordinateType::LV03:
                return new Lv03Coordinate($e, $n);
            case GeoCoordinateType::LV95:
                return new Lv95Coordinate($e, $n);
            case GeoCoordinateType::LAT_LON:
                return new Position2d($e, $n);
            default:
                throw new InvalidArgumentException("Invalid coordinate type: " . $type->value);
        }
    }
}
