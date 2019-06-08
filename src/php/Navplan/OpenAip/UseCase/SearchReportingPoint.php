<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;


class SearchReportingPoint {
    private $rpRepo;


    public function __construct(IOpenAipConfig $config) {
        $this->rpRepo = $config->getOpenAipRepoFactory()->createReportingPointRepo();
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
