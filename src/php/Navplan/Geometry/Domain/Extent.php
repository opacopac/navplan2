<?php declare(strict_types=1);

namespace Navplan\Geometry\Domain;

use InvalidArgumentException;


class Extent {
    public $minPos;
    public $maxPos;


    public static function createFromCoords(float $minLon, float $minLat, float $maxLon, float $maxLat): Extent {
        return new Extent(
            new Position2d($minLon, $minLat),
            new Position2d($maxLon, $maxLat)
        );
    }


    public function __construct(Position2d $minPos, Position2d $maxPos) {
        if ($minPos->longitude > $maxPos->longitude || $minPos->latitude > $maxPos->latitude) {
            $minPosStr = $minPos->longitude . ", " . $minPos->latitude;
            $maxPosStr = $maxPos->longitude . ", " . $maxPos->latitude;
            throw new InvalidArgumentException("minPos (" . $minPosStr . ") must be smaller or equal than maxPos (" . $maxPosStr . ")");
        }

        $this->minPos = $minPos;
        $this->maxPos = $maxPos;
    }
}
