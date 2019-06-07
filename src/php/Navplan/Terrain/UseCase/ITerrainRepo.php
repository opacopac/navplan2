<?php declare(strict_types=1);

namespace Navplan\Terrain\UseCase;


interface ITerrainRepo {
    function readElevation(array $position2dList): array;
}
