<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use Navplan\Common\Rest\Controller\IRestController;


interface IAerodromeDiContainer
{
    function getAirportController(): IRestController;
}
