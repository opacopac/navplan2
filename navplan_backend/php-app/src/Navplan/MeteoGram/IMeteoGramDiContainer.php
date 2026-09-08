<?php declare(strict_types=1);

namespace Navplan\MeteoGram;

use Navplan\Common\Rest\Controller\IRestController;


interface IMeteoGramDiContainer {
    function getReadCloudMeteoGramController(): IRestController;
}


