<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Service;

use Navplan\Notam\Domain\Model\Notam;
use Navplan\Notam\Domain\Query\INotamSearchByExtentQuery;
use Navplan\Notam\Domain\Query\INotamSearchByIcaoQuery;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
use Navplan\Notam\Domain\Query\INotamSearchByRouteQuery;


class NotamService implements INotamService {
    public function __construct(
        private INotamSearchByExtentQuery $notamSearchByExtentQuery,
        private INotamSearchByIcaoQuery $notamSearchByIcaoQuery,
        private INotamSearchByPositionQuery $notamSearchByPositionQuery,
        private INotamSearchByRouteQuery $notamSearchByRouteQuery
    ) {
    }


    /**
     * @param NotamIcaoRequest $request
     * @return Notam[]
     */
    public function searchByIcao(NotamIcaoRequest $request): array {
        return $this->notamSearchByIcaoQuery->searchByIcao(
            $request->airportIcao,
            $request->interval
        );
    }


    /**
     * @param NotamPositionRequest $request
     * @return Notam[]
     */
    public function searchByPosition(NotamPositionRequest $request): array {
        return $this->notamSearchByPositionQuery->searchByPosition(
            $request->position,
            $request->interval
        );
    }


    /**
     * @param NotamExtentRequest $request
     * @return Notam[]
     */
    public function searchByExtent(NotamExtentRequest $request): array {
        return $this->notamSearchByExtentQuery->searchByExtent(
            $request->extent,
            $request->zoom,
            $request->interval
        );
    }


    /**
     * @param NotamRouteRequest $request
     * @return Notam[]
     */
    public function searchByRoute(NotamRouteRequest $request): array {
        return $this->notamSearchByRouteQuery->searchByRoute(
            $request->flightroute,
            $request->maxDistFromRoute,
            $request->interval
        );
    }
}

