<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

use Navplan\MeteoSma\Domain\Service\IMeteoSmaService;


interface IMeteoSmaDiContainer {
    function getMeteoSmaService(): IMeteoSmaService;
}
