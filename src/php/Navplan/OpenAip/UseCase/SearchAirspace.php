<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;


class SearchAirspace {
    private $repo;


    private function getRepo(): IAirspaceRepo {
        return $this->repo;
    }


    public function __construct(IAirspaceRepo $repo) {
        $this->repo = $repo;
    }


    public function searchByExtent(Extent $extent, int $zoom): array {
        return $this->getRepo()->searchByExtent($extent, $zoom);
    }
}
