<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Terrain module.
 * Replaces the former ProdTerrainDiContainer.
 */

use Navplan\Terrain\Domain\Service\ITerrainRepo;
use Navplan\Terrain\Domain\Service\ITerrainService;
use Navplan\Terrain\Domain\Service\TerrainService;
use Navplan\Terrain\File\Service\FileTerrainRepo;
use function DI\autowire;

return [
    ITerrainRepo::class => autowire(FileTerrainRepo::class),
    ITerrainService::class => autowire(TerrainService::class),
];

