<?php declare(strict_types=1);

namespace Navplan\OpenAip\RepoGateway;


interface IReportingPointRepo {
    function searchByExtent(float $minLon, float $minLat, float $maxLon, float $maxLat): array;

    function searchByPosition(float $lon, float $lat, float $maxRadius_deg, int $maxResults): array;

    function searchByText(string $searchText, int $maxResults): array;
}
