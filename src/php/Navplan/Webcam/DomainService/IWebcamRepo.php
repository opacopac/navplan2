<?php declare(strict_types=1);

namespace Navplan\Webcam\DomainService;

use Navplan\Common\DomainModel\Extent2d;


interface IWebcamRepo {
    function searchByExtent(Extent2d $extent): array;
}
