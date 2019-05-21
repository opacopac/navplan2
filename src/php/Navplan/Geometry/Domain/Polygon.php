<?php declare(strict_types=1);

namespace Navplan\Geometry\Domain;

use InvalidArgumentException;


class Polygon {
    public $position2dList = [];


    /**
     * @param string $polygonString
     * @param string $posSeparator
     * @param string $lonLatSeparator
     * @return Polygon
     * @throws InvalidArgumentException
     */
    public static function createFromString(string $polygonString, string $posSeparator = ',', string $lonLatSeparator = ' '): Polygon {
        return new Polygon(
            array_map(
                function (string $posString) use ($lonLatSeparator) {
                    return Position2d::createFromString($posString, $lonLatSeparator);
                },
                explode($posSeparator, $polygonString),
                [$lonLatSeparator]
            )
        );
    }


    public static function createFromArray(array $lonLatList): Polygon {
        return new Polygon(
            array_map(
                function (array $lonLat) { return Position2d::createFromArray($lonLat); },
                $lonLatList
            )
        );
    }


    public function __construct(array $position2dList = []) {
        foreach ($position2dList as $pos2d) {
            if (!$pos2d instanceof Position2d) {
                throw new InvalidArgumentException('argument is not of type Position2d');
            }
        }

        $this->position2dList = $position2dList;
    }


    public function toString(string $posSeparator = ',', string $lonLatSeparator = ' '): string {
        return join(
            $posSeparator,
            array_map(
                function (Position2d $pos2d) use ($lonLatSeparator) { return $pos2d->toString($lonLatSeparator); },
                $this->position2dList
            )
        );
    }


    public function toArray(): array {
        return array_map(
            function (Position2d $pos2d) { return $pos2d->toArray(); },
            $this->position2dList
        );
    }
}
