<?php declare(strict_types=1);

namespace Navplan\Geometry\DomainModel;

use InvalidArgumentException;


class Ring2d implements IGeometry2d {
    /**
     * @param string $ringString
     * @param string $posSeparator
     * @param string $lonLatSeparator
     * @return Ring2d
     * @throws InvalidArgumentException
     */
    public static function createFromString(string $ringString, string $posSeparator = ',', string $lonLatSeparator = ' '): Ring2d {
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


    public static function createFromArray(array $lonLatList): Ring2d {
        return new Ring2d(
            array_map(
                function (array $lonLat) { return Position2d::createFromArray($lonLat); },
                $lonLatList
            )
        );
    }


    public function __construct(public array $position2dList = []) {
        foreach ($position2dList as $pos2d) {
            if (!$pos2d instanceof Position2d) {
                throw new InvalidArgumentException('argument is not of type Position2d');
            }
        }
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
