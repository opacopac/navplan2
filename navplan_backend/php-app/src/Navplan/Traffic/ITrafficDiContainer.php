<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Traffic\Ogn\Service\IOgnListenerRepo;


interface ITrafficDiContainer
{
    function getTrafficController(): IRestController;

    function getOgnListenerRepo(): IOgnListenerRepo;
}
