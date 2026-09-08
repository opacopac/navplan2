<?php declare(strict_types=1);

namespace Navplan\Airspace;

use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Airspace\Domain\Service\IFirService;
use Navplan\Common\Rest\Controller\IRestController;


interface IAirspaceDiContainer
{
    function getAirspaceController(): IRestController;

    function getAirspaceService(): IAirspaceService;


    function getFirService(): IFirService;

    function getFirController(): IRestController;
}
