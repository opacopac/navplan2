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
    public static function toRest(?GeoCoordinate $coord): ?array
    {
        if ($coord === null) {
            return null;
        }

        return [
            $coord->getType()->value,
            $coord->getE(),
            $coord->getN()
        ];
    }


    public static function fromRest(?array $args): ?GeoCoordinate
    {
        if ($args === null || count($args) < 3) {
            return null;
        }

        $type = GeoCoordinateType::from($args[0]);
        $e = StringNumberHelper::parseFloatOrError($args, 1);
        $n = StringNumberHelper::parseFloatOrError($args, 2);

        return match ($type) {
            GeoCoordinateType::LV03 => new Lv03Coordinate($e, $n),
            GeoCoordinateType::LV95 => new Lv95Coordinate($e, $n),
            GeoCoordinateType::LON_LAT => new Position2d($e, $n),
            default => throw new InvalidArgumentException("Invalid coordinate type: " . $type->value),
        };
    }
}
