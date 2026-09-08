<?php declare(strict_types=1);

namespace Navplan\Airspace;

use Navplan\Common\Rest\Controller\IRestController;


interface IAirspaceDiContainer
{
    function getAirspaceController(): IRestController;


    function getFirController(): IRestController;
}
