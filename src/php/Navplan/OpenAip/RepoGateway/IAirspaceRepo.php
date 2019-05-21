<?php declare(strict_types=1);

namespace Navplan\OpenAip\RepoGateway;


interface IAirspaceRepo {
    function searchByExtent(float $minLon, float $minLat, float $maxLon, float $maxLat, int $zoom): array;
}
