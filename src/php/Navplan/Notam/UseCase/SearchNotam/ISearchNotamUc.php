<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase\SearchNotam;


interface ISearchNotamUc {
    function searchByExtent(ReadNotamByExtentRequest $request): ReadNotamResponse;

    function searchByPosition(ReadNotamByPositionRequest $request): ReadNotamResponse;

    function searchByIcao(ReadNotamByIcaoRequest $request): ReadNotamResponse;
}
