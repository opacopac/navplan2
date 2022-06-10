<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;


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
        public float $stepLat
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


    public function getXbyLon(float $lon): float {
        return ($lon - $this->extent->minPos->longitude) / $this->stepLon;
    }


    public function getYbyLat(float $lat): float {
        return ($lat - $this->extent->minPos->latitude) / $this->stepLat;
    }


    public function getLonByX(float $x): float {
        return $this->extent->minPos->longitude + $x * $this->stepLon;
    }


    public function getLatByY(float $y): float {
        return $this->extent->minPos->latitude + $y * $this->stepLat;
    }
}
