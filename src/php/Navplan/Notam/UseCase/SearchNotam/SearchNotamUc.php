<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase\SearchNotam;

use Navplan\Notam\DomainModel\ReadNotamByExtentRequest;
use Navplan\Notam\DomainModel\ReadNotamByIcaoRequest;
use Navplan\Notam\DomainModel\ReadNotamByPositionRequest;
use Navplan\Notam\DomainModel\ReadNotamResponse;
use Navplan\Notam\DomainService\INotamRepo;


class SearchNotamUc implements ISearchNotamUc {
    public function __construct(private INotamRepo $notamRepo) {
    }


    public function searchByExtent(ReadNotamByExtentRequest $request): ReadNotamResponse {
        $notamList = $this->notamRepo->searchByExtent(
            $request->extent,
            $request->zoom,
            $request->minNotamTimestamp,
            $request->maxNotamTimestamp
        );

        return new ReadNotamResponse($notamList);
    }


    public function searchByPosition(ReadNotamByPositionRequest $request): ReadNotamResponse {
        $notamList = $this->notamRepo->searchByPosition(
            $request->position,
            $request->minNotamTimestamp,
            $request->maxNotamTimestamp
        );

        return new ReadNotamResponse($notamList);
    }


    public function searchByIcao(ReadNotamByIcaoRequest $request): ReadNotamResponse {
        $notamList = $this->notamRepo->searchByIcao(
            $request->airportIcao,
            $request->minNotamTimestamp,
            $request->maxNotamTimestamp
        );

        return new ReadNotamResponse($notamList);
    }
}
