<?php declare(strict_types=1);

namespace Navplan\AerodromeChart;

use Navplan\AerodromeChart\Domain\Command\IAirportChartCreateCommand;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByAirportQuery;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByIdQuery;
use Navplan\AerodromeChart\Domain\Service\AirportChartService;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\AerodromeChart\Domain\Service\ISwissGridChartTransformerService;
use Navplan\AerodromeChart\Domain\Service\SwissGridChartTransformerService;
use Navplan\AerodromeChart\Persistence\Command\DbAirportChartCreateCommand;
use Navplan\AerodromeChart\Persistence\Query\DbAirportChartByAirportQuery;
use Navplan\AerodromeChart\Persistence\Query\DbAirportChartByIdQuery;
use Navplan\AerodromeChart\Rest\Controller\AdChartController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\IImageService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\User\Domain\Service\IUserService;


class ProdAerodromeChartDiContainer implements IAerodromeChartDiContainer
{
    private IRestController $airportChartController;
    private IAirportChartService $airportChartService;
    private ISwissGridChartTransformerService $swissGridChartTransformerService;
    private IAirportChartByIdQuery $airportChartByIdQuery;
    private IAirportChartByAirportQuery $airportChartByAirportQuery;
    private IAirportChartCreateCommand $airportChartCreateCommand;


    public function __construct(
        private IDbService $dbService,
        private IFileService $fileService,
        private IImageService $imageService,
        private IUserService $userService,
        private IHttpService $httpService,
        private ILoggingService $loggingService
    )
    {
    }


    public function getAirportChartController(): IRestController
    {
        if (!isset($this->airportChartController)) {
            $this->airportChartController = new AdChartController(
                $this->httpService,
                $this->getAirportChartService()
            );
        }

        return $this->airportChartController;
    }


    function getAirportChartService(): IAirportChartService
    {
        if (!isset($this->airportChartService)) {
            $this->airportChartService = new AirportChartService(
                $this->fileService,
                $this->imageService,
                $this->userService,
                $this->getSwissGridChartTransformerService(),
                $this->getAirportChartByIdQuery(),
                $this->getAirportChartByAirportQuery(),
                $this->getAirportChartCreateCommand()
            );
        }

        return $this->airportChartService;
    }


    function getSwissGridChartTransformerService(): ISwissGridChartTransformerService
    {
        if (!isset($this->swissGridChartTransformerService)) {
            $this->swissGridChartTransformerService = new SwissGridChartTransformerService(
                $this->fileService,
                $this->loggingService
            );
        }

        return $this->swissGridChartTransformerService;
    }


    function getAirportChartByIdQuery(): IAirportChartByIdQuery
    {
        if (!isset($this->airportChartByIdQuery)) {
            $this->airportChartByIdQuery = new DbAirportChartByIdQuery(
                $this->dbService
            );
        }

        return $this->airportChartByIdQuery;
    }


    function getAirportChartByAirportQuery(): IAirportChartByAirportQuery
    {
        if (!isset($this->airportChartByAirportQuery)) {
            $this->airportChartByAirportQuery = new DbAirportChartByAirportQuery(
                $this->dbService
            );
        }

        return $this->airportChartByAirportQuery;
    }


    function getAirportChartCreateCommand(): IAirportChartCreateCommand
    {
        if (!isset($this->airportChartCreateCommand)) {
            $this->airportChartCreateCommand = new DbAirportChartCreateCommand(
                $this->dbService
            );
        }

        return $this->airportChartCreateCommand;
    }
}
