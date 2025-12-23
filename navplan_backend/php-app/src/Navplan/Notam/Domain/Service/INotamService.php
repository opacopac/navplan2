<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Service;

use Navplan\Notam\Domain\Model\Notam;


interface INotamService {
    /**
     * @param NotamIcaoRequest $request
     * @return Notam[]
     */
    public function searchByIcao(NotamIcaoRequest $request): array;

    /**
     * @param NotamPositionRequest $request
     * @return Notam[]
     */
    public function searchByPosition(NotamPositionRequest $request): array;

    /**
     * @param NotamExtentRequest $request
     * @return Notam[]
     */
    public function searchByExtent(NotamExtentRequest $request): array;

    /**
     * @param NotamRouteRequest $request
     * @return Notam[]
     */
    public function searchByRoute(NotamRouteRequest $request): array;
}

