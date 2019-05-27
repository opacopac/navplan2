<?php declare(strict_types=1);

namespace Navplan\Geometry\Domain;

use InvalidArgumentException;


class MultiRing2d implements IGeometry2d {
    public $ring2dList = [];


    public static function createFromArray(array $ringArrays): MultiRing2d {
        return new MultiRing2d(
            array_map(
                function (array $ringArray) { return Ring2d::createFromArray($ringArray); },
                $ringArrays
            )
        );
    }


    public function __construct(array $ring2dList) {
        foreach ($ring2dList as $ring2d) {
            if (!$ring2d instanceof Ring2d) {
                throw new InvalidArgumentException('argument is not of type Ring2d');
            }
        }

        $this->ring2dList = $ring2dList;
    }


    public function toArray(): array {
        return array_map(
            function (Ring2d $ring2d) { return $ring2d->toArray(); },
            $this->ring2dList
        );
    }
}
