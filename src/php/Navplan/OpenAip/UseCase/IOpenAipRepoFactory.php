<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;


interface IOpenAipRepoFactory {
    function createAirportSearch(): IAirportRepo;

    function createAirspaceSearch(): IAirspaceRepo;

    function createNavaidSearch(): INavaidRepo;

    function createReportingPointSearch(): IReportingPointRepo;

    function createWebcamSearch(): IWebcamRepo;
}
