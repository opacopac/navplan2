<?php declare(strict_types=1);

namespace Navplan\Terrain\UseCase\ReadElevationList;


interface IReadElevationListUc {
    public function read(array $posList): array;
}
