<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase\SearchNotam;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Notam\Domain\ReadNotamByExtentRequest;
use Navplan\Notam\Domain\ReadNotamResponse;
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


    public function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp, int $maxResults): array {
        return $this->notamRepo->searchByPosition($position, $minNotamTimestamp, $maxNotamTimestamp, $maxResults);
    }


    public function searchByIcao(array $icaoList, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        return $this->notamRepo->searchByIcao($icaoList, $minNotamTimestamp, $maxNotamTimestamp);
    }
}
