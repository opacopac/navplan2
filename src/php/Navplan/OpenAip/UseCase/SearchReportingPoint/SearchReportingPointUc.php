<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchReportingPoint;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\OpenAip\DomainService\IReportingPointRepo;


class SearchReportingPointUc implements ISearchReportingPointUc {
    public function __construct(private IReportingPointRepo $rpRepo) {
    }


    public function searchByExtent(Extent $extent): array {
        return $this->rpRepo->searchByExtent($extent);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        return $this->rpRepo->searchByPosition($position, $maxRadius_deg, $maxResults);
    }


    public function searchByText(string $searchText, int $maxResults): array {
        return $this->rpRepo  ->searchByText($searchText, $maxResults);
    }


    public function searchByIcao(array $icaoList): array {
        return $this->rpRepo->searchByIcao($icaoList);
    }
}
