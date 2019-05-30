<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;


class AirspaceSearch {
    private $repo;


    private function getRepo(): IAirspaceSearch {
        return $this->repo;
    }


    public function __construct(IAirspaceSearch $repo) {
        $this->repo = $repo;
    }


    public function searchByExtent(Extent $extent, int $zoom): array {
        return $this->getRepo()->searchByExtent($extent, $zoom);
    }
}
