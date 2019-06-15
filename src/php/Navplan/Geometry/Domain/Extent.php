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


    public function calcMidPos(): Position2d {
        return new Position2d(
            ($this->minPos->longitude + $this->maxPos->longitude) / 2,
            ($this->minPos->latitude + $this->maxPos->latitude) / 2
        );
    }


    public function containsPos(Position2d $pos): bool {
        if (($pos->longitude < $this->minPos->longitude) || ($pos->latitude < $this->minPos->latitude) ||
            ($pos->longitude > $this->maxPos->longitude) || ($pos->latitude > $this->maxPos->latitude)) {
            return false;
        }

        return true;
    }
}