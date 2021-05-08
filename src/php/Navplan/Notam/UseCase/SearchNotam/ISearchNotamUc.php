<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase\SearchNotam;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Notam\DomainModel\ReadNotamByExtentRequest;
use Navplan\Notam\DomainModel\ReadNotamResponse;


interface ISearchNotamUc {
    function searchByExtent(ReadNotamByExtentRequest $request): ReadNotamResponse;


    function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp, int $maxResults): array;


    function searchByIcao(array $icaoList, int $minNotamTimestamp, int $maxNotamTimestamp): array;
}