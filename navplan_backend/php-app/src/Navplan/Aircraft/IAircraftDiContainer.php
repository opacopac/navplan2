<?php declare(strict_types=1);

namespace Navplan\Aircraft;

use Navplan\Aircraft\Importer\Service\IAircraftTypeDesignatorImporter;
use Navplan\Common\Rest\Controller\IRestController;


interface IAircraftDiContainer
{
    function getAircraftController(): IRestController;

    function getAircraftTypeDesignatorController(): IRestController;


    function getAircraftTypeDesignatorImporter(): IAircraftTypeDesignatorImporter;
}
