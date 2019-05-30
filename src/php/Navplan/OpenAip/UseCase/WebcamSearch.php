<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\OpenAip\IRepo\IWebcamSearch;


class WebcamSearch {
    private $repo;


    private function getRepo(): IWebcamSearch {
        return $this->repo;
    }


    public function __construct(IWebcamSearch $repo) {
        $this->repo = $repo;
    }


    public function searchByExtent(Extent $extent): array {
        return $this->getRepo()->searchByExtent($extent);
    }
}
