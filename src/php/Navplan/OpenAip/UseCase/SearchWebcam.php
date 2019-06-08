<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;


class SearchWebcam {
    private $webcamRepo;


    public function __construct(IOpenAipConfig $config) {
        $this->webcamRepo = $config->getOpenAipRepoFactory()->createWebcamRepo();
    }


    public function searchByExtent(Extent $extent): array {
        return $this->webcamRepo->searchByExtent($extent);
    }
}
