<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestService;

use Navplan\OpenAip\UseCase\SearchAirport\ISearchAirportUc;
use Navplan\OpenAip\UseCase\SearchAirspace\ISearchAirspaceUc;
use Navplan\OpenAip\UseCase\SearchNavaid\ISearchNavaidUc;
use Navplan\OpenAip\UseCase\SearchOpenAipItem\ISearchOpenAipItemsUc;
use Navplan\OpenAip\UseCase\SearchReportingPoint\ISearchReportingPointUc;
use Navplan\OpenAip\UseCase\SearchWebcam\ISearchWebcamUc;
use Navplan\System\DomainService\IHttpService;


interface IOpenAipServiceDiContainer {
    function getHttpService(): IHttpService;

    function getSearchAirportUc(): ISearchAirportUc;

    function getSearchAirspaceUc(): ISearchAirspaceUc;

    function getSearchNavaidUc(): ISearchNavaidUc;

    function getSearchReportingPointUc(): ISearchReportingPointUc;

    function getSearchWebcamUc(): ISearchWebcamUc;

    function getSearchOpenAipItemUc(): ISearchOpenAipItemsUc;
}
