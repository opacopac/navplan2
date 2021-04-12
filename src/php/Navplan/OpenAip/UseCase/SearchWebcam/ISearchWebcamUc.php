<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchWebcam;

use Navplan\Geometry\DomainModel\Extent;


interface ISearchWebcamUc {
    function searchByExtent(Extent $extent): array;
}
