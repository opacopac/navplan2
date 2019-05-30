<?php declare(strict_types=1);

namespace Navplan\OpenAip\IRepo;


interface IOpenAipRepoFactory {
    function createAirportSearch(): IAirportSearch;

    function createAirspaceSearch(): IAirspaceSearch;

    function createNavaidSearch(): INavaidSearch;

    function createReportingPointSearch(): IReportingPointSearch;

    function createWebcamSearch(): IWebcamSearch;
}
