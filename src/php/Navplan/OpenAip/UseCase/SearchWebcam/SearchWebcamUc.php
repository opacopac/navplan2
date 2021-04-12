<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchWebcam;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\OpenAip\DomainService\IWebcamRepo;


class SearchWebcamUc implements ISearchWebcamUc {
    public function __construct(private IWebcamRepo $webcamRepo) {
    }


    public function searchByExtent(Extent $extent): array {
        return $this->webcamRepo->searchByExtent($extent);
    }
}
