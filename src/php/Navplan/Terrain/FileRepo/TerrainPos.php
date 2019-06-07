<?php declare(strict_types=1);

namespace Navplan\Terrain\FileRepo;

use Navplan\Geometry\Domain\Position2d;


class TerrainPos {
    /* @var $index int */
    public $index;

    /* @var $filePath string */
    public $filePath;

    /* @var $position2d Position2d */
    public $position2d;

    /* @var $elevationM float */
    public $elevationM;


    public function __construct(int $index, Position2d $position2d, string $filePath) {
        $this->index = $index;
        $this->position2d = $position2d;
        $this->filePath = $filePath;
    }
}
