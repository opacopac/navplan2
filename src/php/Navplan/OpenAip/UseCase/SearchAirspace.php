<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;


class SearchAirspace {
    private $airspaceRepo;


    public function __construct(IOpenAipConfig $config) {
        $this->airspaceRepo = $config->getOpenAipRepoFactory()->createAirspaceRepo();
    }


    public function searchByExtent(Extent $extent, int $zoom): array {
        return $this->airspaceRepo->searchByExtent($extent, $zoom);
    }
}
