<?php declare(strict_types=1);

namespace Navplan\OpenAip\RepoGateway;


interface IWebcamRepo {
    function searchByExtent(float $minLon, float $minLat, float $maxLon, float $maxLat): array;
}
