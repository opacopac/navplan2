<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestService;

use Navplan\Airport\DomainService\IAirportRepo;
use Navplan\Airport\DomainService\IReportingPointRepo;
use Navplan\OpenAip\UseCase\SearchAirspace\ISearchAirspaceUc;
use Navplan\OpenAip\UseCase\SearchNavaid\ISearchNavaidUc;
use Navplan\OpenAip\UseCase\SearchOpenAipItem\ISearchOpenAipItemsUc;
use Navplan\OpenAip\UseCase\SearchWebcam\ISearchWebcamUc;
use Navplan\System\DomainService\IHttpService;


interface IOpenAipServiceDiContainer {
    function getHttpService(): IHttpService;

    function getSearchAirspaceUc(): ISearchAirspaceUc;

    function getSearchNavaidUc(): ISearchNavaidUc;

    function getSearchWebcamUc(): ISearchWebcamUc;

    function getSearchOpenAipItemUc(): ISearchOpenAipItemsUc;

    function getAirportRepo(): IAirportRepo;

    function getReportingPointRepo(): IReportingPointRepo;
}
