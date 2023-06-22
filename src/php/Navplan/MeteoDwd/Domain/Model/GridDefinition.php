<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Model;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;


class GridDefinition {
    public Extent2d $extent;


    public function __construct(
        public int $width,
        public int $height,
        Position2d $minPos,
        public float $stepLon,
        public float $stepLat,
        public float $oddRowOffset,
    ) {
        if ($this->width <= 0 || $this->height <= 0) {
            throw new InvalidArgumentException("width / height must be positive numbers");
        }

        $this->extent = Extent2d::createFromCoords(
            $minPos->longitude,
            $minPos->latitude,
            $minPos->longitude + $this->width * $this->stepLon,
            $minPos->latitude + $this->height * $this->stepLat
        );
    }


    public function getX(float $lon): float {
        return ($lon - $this->extent->minPos->longitude) / $this->stepLon;
    }


    public function getY(float $lat): float {
        return ($lat - $this->extent->minPos->latitude) / $this->stepLat;
    }


    public function getLon(float $x): float {
        return $this->extent->minPos->longitude + $x * $this->stepLon;
    }


    public function getLat(float $y): float {
        return $this->extent->minPos->latitude + $y * $this->stepLat;
    }


    public function getLonWithOffset(float $x, float $y): float {
        $offset = $y % 2 === 0 ? 0 : $this->oddRowOffset;

        return $this->getLon($x) + $offset;
    }
}
