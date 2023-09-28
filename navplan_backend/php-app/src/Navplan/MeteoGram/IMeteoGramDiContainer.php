<?php declare(strict_types=1);

namespace Navplan\MeteoGram;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoGram\Domain\Service\ICloudMeteoGramService;


interface IMeteoGramDiContainer {
    function getReadCloudMeteoGramController(): IRestController;

    function getCloudMeteoGramService(): ICloudMeteoGramService;
}
