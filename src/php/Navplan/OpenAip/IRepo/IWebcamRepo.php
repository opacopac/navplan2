<?php declare(strict_types=1);

namespace Navplan\OpenAip\IRepo;

use Navplan\Geometry\Domain\Extent;


interface IWebcamRepo {
    function searchByExtent(Extent $extent): array;
}
