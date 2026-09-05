<?php declare(strict_types=1);

namespace Navplan\MeteoRadar\Domain\Service;

use Navplan\MeteoRadar\Domain\Model\RadarImage;


interface IMeteoRadarImagesRepo
{
    /**
     * @return RadarImage[]
     */
    function readAvailableRadarImages(): array;
}
