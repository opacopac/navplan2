<?php declare(strict_types=1);

namespace Navplan\Webcam\DomainService;

use Navplan\Geometry\DomainModel\Extent;


interface IWebcamRepo {
    function searchByExtent(Extent $extent): array;
}
