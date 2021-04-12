<?php declare(strict_types=1);

namespace Navplan\Terrain\DomainService;


interface ITerrainRepo {
    function readElevation(array $position2dList): array;
}
