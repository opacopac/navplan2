<?php declare(strict_types=1);

namespace Navplan\MeteoRadar\Domain\Service;


interface IMeteoRadarImagesConfig {
    function getMeteoRadarImagesBaseDir(): string;
}
