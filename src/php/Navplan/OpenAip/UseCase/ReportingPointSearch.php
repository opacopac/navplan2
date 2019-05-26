<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\IRepo\IReportingPointRepo;


class ReportingPointSearch {
    private $repo;


    private function getRepo(): IReportingPointRepo {
        return $this->repo;
    }


    public function __construct(IReportingPointRepo $repo) {
        $this->repo = $repo;
    }


    public function searchByExtent(Extent $extent): array {
        return $this->getRepo()->searchByExtent($extent);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        return $this->getRepo()->searchByPosition($position, $maxRadius_deg, $maxResults);

    }


    public function searchByText(string $searchText, int $maxResults): array {
        return $this->getRepo()->searchByText($searchText, $maxResults);
    }
}
