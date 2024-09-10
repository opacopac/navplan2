<?php declare(strict_types=1);

namespace Navplan\Aircraft;

use Navplan\Aircraft\Domain\Command\IAircraftCreateCommand;
use Navplan\Aircraft\Domain\Command\IAircraftDeleteCommand;
use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorCreateCommand;
use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorDeleteAllCommand;
use Navplan\Aircraft\Domain\Command\IAircraftUpdateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Domain\Query\IAircraftByIdQuery;
use Navplan\Aircraft\Domain\Query\IAircraftListQuery;
use Navplan\Aircraft\Domain\Service\IAircraftService;
use Navplan\Aircraft\Domain\Service\IAircraftTypeDesignatorService;
use Navplan\Aircraft\Importer\Service\IAircraftTypeDesignatorImporter;
use Navplan\Common\Rest\Controller\IRestController;


interface IAircraftDiContainer
{
    function getAircraftController(): IRestController;

    function getAircraftService(): IAircraftService;

    function getAircraftListQuery(): IAircraftListQuery;

    function getAircraftByIdQuery(): IAircraftByIdQuery;

    function getAircraftCreateCommand(): IAircraftCreateCommand;

    function getAircraftUpdateCommand(): IAircraftUpdateCommand;

    function getAircraftDeleteCommand(): IAircraftDeleteCommand;

    function getDistancePerformanceTableCreateCommand(): IDistancePerformanceTableCreateCommand;

    function getDistancePerformanceTableDeleteCommand(): IDistancePerformanceTableDeleteCommand;

    function getAircraftTypeDesignatorController(): IRestController;

    function getAircraftTypeDesignatorService(): IAircraftTypeDesignatorService;

    function getAircraftTypeDesignatorCreateCommand(): IAircraftTypeDesignatorCreateCommand;

    function getAircraftTypeDesignatorDeleteAllCommand(): IAircraftTypeDesignatorDeleteAllCommand;

    function getAircraftTypeDesignatorImporter(): IAircraftTypeDesignatorImporter;
}
