<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestService;

use Navplan\Airport\DomainService\IAirportRepo;
use Navplan\Airport\DomainService\IReportingPointRepo;
use Navplan\Airspace\DomainService\IAirspaceRepo;
use Navplan\Navaid\DomainService\INavaidRepo;
use Navplan\OpenAip\UseCase\SearchOpenAipItem\ISearchOpenAipItemsUc;
use Navplan\OpenAip\UseCase\SearchWebcam\ISearchWebcamUc;
use Navplan\System\DomainService\IHttpService;


interface IOpenAipServiceDiContainer {
    function getHttpService(): IHttpService;

    function getSearchWebcamUc(): ISearchWebcamUc;

    function getSearchOpenAipItemUc(): ISearchOpenAipItemsUc;

    function getAirportRepo(): IAirportRepo;

    function getReportingPointRepo(): IReportingPointRepo;

    function getNavaidRepo(): INavaidRepo;

    function getAirspaceRepo(): IAirspaceRepo;
}
