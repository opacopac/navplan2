<?php declare(strict_types=1);

namespace Navplan\OpenAip\DomainService;

use Navplan\Airport\DomainService\IAirportRepo;
use Navplan\Airport\DomainService\IReportingPointRepo;


interface IOpenAipRepoFactory {
    function createAirportRepo(): IAirportRepo;

    function createAirspaceRepo(): IAirspaceRepo;

    function createNavaidRepo(): INavaidRepo;

    function createReportingPointRepo(): IReportingPointRepo;

    function createWebcamRepo(): IWebcamRepo;
}
