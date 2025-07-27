<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;

use InvalidArgumentException;
use Navplan\Common\GeoHelper;


class Ring2d implements IGeometry2d
{
    /**
     * @param string|null $ringString
     * @param string $posSeparator
     * @param string $lonLatSeparator
     * @return Ring2d|null
     */
    public static function createFromString(string|null $ringString, string $posSeparator = ',', string $lonLatSeparator = ' '): ?Ring2d
    {
        if ($ringString === NULL || $ringString === '') {
            return NULL;
        }

        return new Ring2d(
            array_map(
                function (string $posString) use ($lonLatSeparator) {
                    return Position2d::createFromString($posString, $lonLatSeparator);
                },
                explode($posSeparator, $ringString),
                [$lonLatSeparator]
            )
        );
    }


    public static function createFromArray(array $lonLatList): Ring2d
    {
        return new Ring2d(
            array_map(
                function (array $lonLat) {
                    return Position2d::createFromArray($lonLat);
                },
                $lonLatList
            )
        );
    }


    public function __construct(public array $position2dList = [])
    {
        foreach ($position2dList as $pos2d) {
            if (!$pos2d instanceof Position2d) {
                throw new InvalidArgumentException('argument is not of type Position2d');
            }
        }
    }


    public function toString(string $posSeparator = ',', string $lonLatSeparator = ' '): string
    {
        return join(
            $posSeparator,
            array_map(
                function (Position2d $pos2d) use ($lonLatSeparator) {
                    return $pos2d->toString($lonLatSeparator);
                },
                $this->position2dList
            )
        );
    }


    public function toArray(): array
    {
        return array_map(
            function (Position2d $pos2d) {
                return $pos2d->toArray();
            },
            $this->position2dList
        );
    }


    public function containsPoint(Position2d $point): bool
    {
        $polygon = array_map(
            function (Position2d $pos2d) {
                return $pos2d->toArray();
            },
            $this->position2dList
        );
        return GeoHelper::isPointInPolygon($point->toArray(), $polygon);
    }


    /**
     * @param LineInterval2d $interval2d
     * @return Position2d[]
     */
    public function calcIntersectionPoints(LineInterval2d $interval2d): array
    {
        $points = [];

        for ($i = 1; $i < count($this->position2dList); $i++) {
            $ringInterval = new LineInterval2d($this->position2dList[$i - 1], $this->position2dList[$i]);
            $isect = GeoHelper::calcLineIntersection($interval2d, $ringInterval);
            if ($isect !== NULL) {
                $points[] = $isect;
            }
        }

        // sort
        $isLatAsc = $interval2d->start->latitude <= $interval2d->end->latitude;
        $isLonAsc = $interval2d->start->longitude <= $interval2d->end->longitude;
        usort(
            $points,
            function (Position2d $a, Position2d $b) use ($isLatAsc, $isLonAsc) {
                $latDiff = ($a->latitude - $b->latitude) > 0 ? 1 : -1;
                $lonDiff = ($a->longitude - $b->longitude) > 0 ? 1 : -1;
                if ($latDiff != 0) {
                    return $isLatAsc ? $latDiff : -$latDiff;
                } else if ($lonDiff != 0) {
                    return $isLonAsc ? $lonDiff : -$lonDiff;
                } else {
                    return 0;
                }
            }
        );

        return $points;
    }
}
