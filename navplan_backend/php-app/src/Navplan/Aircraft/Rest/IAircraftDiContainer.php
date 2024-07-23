<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest;

use Navplan\Aircraft\Domain\Query\IAircraftByIdQuery;
use Navplan\Aircraft\Domain\Query\IAircraftListQuery;
use Navplan\Aircraft\Domain\Service\IAircraftService;
use Navplan\Common\Rest\Controller\IRestController;


interface IAircraftDiContainer
{
    function getAircraftController(): IRestController;

    function getAircraftService(): IAircraftService;

    function getAircraftListQuery(): IAircraftListQuery;

    function getAircraftByIdQuery(): IAircraftByIdQuery;
}
