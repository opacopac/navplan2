<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

use Navplan\MeteoSma\DomainService\IMeteoSmaService;


interface IMeteoSmaDiContainer {
    function getMeteoSmaService(): IMeteoSmaService;
}
