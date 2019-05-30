<?php declare(strict_types=1);

namespace Navplan\OpenAip\IRepo;

use Navplan\Geometry\Domain\Extent;


interface IWebcamSearch {
    function searchByExtent(Extent $extent): array;
}
