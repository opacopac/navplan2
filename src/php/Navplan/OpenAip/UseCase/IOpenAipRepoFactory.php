<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;


interface IOpenAipRepoFactory {
    function createAirportRepo(): IAirportRepo;

    function createAirspaceRepo(): IAirspaceRepo;

    function createNavaidRepo(): INavaidRepo;

    function createReportingPointRepo(): IReportingPointRepo;

    function createWebcamRepo(): IWebcamRepo;
}
