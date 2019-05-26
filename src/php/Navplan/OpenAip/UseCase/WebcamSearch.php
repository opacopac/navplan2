<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\OpenAip\IRepo\IWebcamRepo;


class WebcamSearch {
    private $repo;


    private function getRepo(): IWebcamRepo {
        return $this->repo;
    }


    public function __construct(IWebcamRepo $repo) {
        $this->repo = $repo;
    }


    public function searchByExtent(Extent $extent): array {
        return $this->getRepo()->searchByExtent($extent);
    }
}
