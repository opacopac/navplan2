<?php declare(strict_types=1);

namespace Navplan\Webcam\Domain\Service;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Webcam\Domain\Model\Webcam;


interface IWebcamService {
    /**
     * @param Extent2d $extent
     * @return Webcam[]
     */
    function searchByExtent(Extent2d $extent): array;

    /**
     * @param array $airportIcaoList
     * @return Webcam[]
     */
    function searchByIcao(array $airportIcaoList): array;
}
