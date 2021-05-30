<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase\SearchNotam;

use Navplan\Notam\DomainModel\ReadNotamByExtentRequest;
use Navplan\Notam\DomainModel\ReadNotamByIcaoRequest;
use Navplan\Notam\DomainModel\ReadNotamByPositionRequest;
use Navplan\Notam\DomainModel\ReadNotamResponse;


interface ISearchNotamUc {
    function searchByExtent(ReadNotamByExtentRequest $request): ReadNotamResponse;

    function searchByPosition(ReadNotamByPositionRequest $request): ReadNotamResponse;

    function searchByIcao(ReadNotamByIcaoRequest $request): ReadNotamResponse;
}
