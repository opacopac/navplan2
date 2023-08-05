<?php declare(strict_types=1);

namespace Navplan\MeteoGram;

use Navplan\MeteoGram\Domain\Service\ICloudMeteoGramService;


interface IMeteoGramDiContainer {
    function getCloudMeteoGramService(): ICloudMeteoGramService;
}
