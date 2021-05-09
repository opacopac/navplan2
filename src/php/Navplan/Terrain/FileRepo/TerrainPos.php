<?php declare(strict_types=1);

namespace Navplan\Terrain\FileRepo;

use Navplan\Common\DomainModel\Position2d;


class TerrainPos {
    public float $elevationM;


    public function __construct(
        public int $index,
        public Position2d $position2d,
        public string $filePath
    ) {
    }
}
