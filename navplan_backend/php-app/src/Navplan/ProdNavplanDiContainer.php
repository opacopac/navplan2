<?php declare(strict_types=1);

namespace Navplan;

use DI\Container;
use DI\ContainerBuilder;
use Psr\Container\ContainerInterface;
use Navplan\Admin\IAdminDiContainer;
use Navplan\Admin\ProdAdminDiContainer;
use Navplan\Aerodrome\IAerodromeDiContainer;
use Navplan\Aerodrome\ProdAerodromeDiContainer;
use Navplan\AerodromeChart\IAerodromeChartDiContainer;
use Navplan\AerodromeChart\ProdAerodromeChartDiContainer;
use Navplan\AerodromeCircuit\IAerodromeCircuitDiContainer;
use Navplan\AerodromeCircuit\ProdAerodromeCircuitsDiContainer;
use Navplan\AerodromeReporting\IAerodromeReportingDiContainer;
use Navplan\AerodromeReporting\ProdAerodromeReportingDiContainer;
use Navplan\Aircraft\IAircraftDiContainer;
use Navplan\Aircraft\ProdAircraftDiContainer;
use Navplan\Airspace\IAirspaceDiContainer;
use Navplan\Airspace\ProdAirspaceDiContainer;
use Navplan\Config\IConfigDiContainer;
use Navplan\Config\ProdConfigDiContainer;
use Navplan\Exporter\IExporterDiContainer;
use Navplan\Exporter\ProdExportDiContainer;
use Navplan\Flightroute\IFlightrouteDiContainer;
use Navplan\Flightroute\ProdFlightrouteDiContainer;
use Navplan\Geoname\IGeonameDiContainer;
use Navplan\Geoname\ProdGeonameDiContainer;
use Navplan\MetarTaf\IMetarTafDiContainer;
use Navplan\MetarTaf\ProdMetarTafDiContainer;
use Navplan\MeteoForecast\IMeteoForecastDiContainer;
use Navplan\MeteoForecast\ProdMeteoForecastDiContainer;
use Navplan\MeteoGram\IMeteoGramDiContainer;
use Navplan\MeteoGram\ProdMeteoGramDiContainer;
use Navplan\MeteoRadar\IMeteoRadarImagesDiContainer;
use Navplan\MeteoRadar\ProdMeteoRadarImagesDiContainer;
use Navplan\MeteoSma\IMeteoSmaDiContainer;
use Navplan\MeteoSma\ProdMeteoSmaDiContainer;
use Navplan\Navaid\INavaidDiContainer;
use Navplan\Navaid\ProdNavaidDiContainer;
use Navplan\Notam\INotamDiContainer;
use Navplan\Notam\ProdNotamDiContainer;
use Navplan\OpenAip\IOpenAipDiContainer;
use Navplan\OpenAip\ProdOpenAipDiContainer;
use Navplan\Search\ISearchDiContainer;
use Navplan\Search\ProdSearchDiContainer;
use Navplan\System\IPersistenceDiContainer;
use Navplan\System\ISystemDiContainer;
use Navplan\System\ProdPersistenceDiContainer;
use Navplan\System\ProdSystemDiContainer;
use Navplan\Terrain\ITerrainDiContainer;
use Navplan\Terrain\ProdTerrainDiContainer;
use Navplan\Track\ITrackDiContainer;
use Navplan\Track\ProdTrackDiContainer;
use Navplan\Traffic\ITrafficDiContainer;
use Navplan\Traffic\ProdTrafficDiContainer;
use Navplan\User\IUserDiContainer;
use Navplan\User\ProdUserDiContainer;
use Navplan\VerticalMap\IVerticalMapDiContainer;
use Navplan\VerticalMap\ProdVerticalMapDiContainer;
use Navplan\Webcam\IWebcamDiContainer;
use Navplan\Webcam\ProdWebcamDiContainer;


class ProdNavplanDiContainer
{
    private Container $container;


    public function __construct()
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            IConfigDiContainer::class => function () {
                return new ProdConfigDiContainer();
            },

            ISystemDiContainer::class => function (ContainerInterface $c) {
                return new ProdSystemDiContainer(
                    $c->get(IConfigDiContainer::class)
                );
            },

            IPersistenceDiContainer::class => function (ContainerInterface $c) {
                return new ProdPersistenceDiContainer(
                    $c->get(ISystemDiContainer::class),
                    $c->get(IConfigDiContainer::class)
                );
            },

            IAdminDiContainer::class => function (ContainerInterface $c) {
                return new ProdAdminDiContainer(
                    $c->get(IOpenAipDiContainer::class)->getOpenAipImporter()
                );
            },

            IAerodromeDiContainer::class => function (ContainerInterface $c) {
                return new ProdAerodromeDiContainer(
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getLoggingService(),
                    $c->get(ISystemDiContainer::class)->getHttpService(),
                    $c->get(IAerodromeChartDiContainer::class)->getAirportChartService(),
                    $c->get(IWebcamDiContainer::class)->getWebcamByIcaoQuery()
                );
            },

            IAerodromeChartDiContainer::class => function (ContainerInterface $c) {
                return new ProdAerodromeChartDiContainer(
                    $c->get(IConfigDiContainer::class),
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getFileService(),
                    $c->get(ISystemDiContainer::class)->getImageService(),
                    $c->get(IUserDiContainer::class)->getUserService(),
                    $c->get(ISystemDiContainer::class)->getHttpService(),
                    $c->get(ISystemDiContainer::class)->getProcService(),
                    $c->get(ISystemDiContainer::class)->getLoggingService(),
                );
            },

            IAerodromeCircuitDiContainer::class => function (ContainerInterface $c) {
                return new ProdAerodromeCircuitsDiContainer(
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getHttpService()
                );
            },

            IAerodromeReportingDiContainer::class => function (ContainerInterface $c) {
                return new ProdAerodromeReportingDiContainer(
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getHttpService()
                );
            },

            IAircraftDiContainer::class => function (ContainerInterface $c) {
                return new ProdAircraftDiContainer(
                    $c->get(IUserDiContainer::class)->getUserService(),
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getHttpService(),
                    $c->get(ISystemDiContainer::class)->getLoggingService()
                );
            },

            IAirspaceDiContainer::class => function (ContainerInterface $c) {
                return new ProdAirspaceDiContainer(
                    $c->get(ISystemDiContainer::class)->getLoggingService(),
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getHttpService()
                );
            },

            INavaidDiContainer::class => function (ContainerInterface $c) {
                return new ProdNavaidDiContainer(
                    $c->get(ISystemDiContainer::class)->getLoggingService(),
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getHttpService()
                );
            },

            IExporterDiContainer::class => function (ContainerInterface $c) {
                return new ProdExportDiContainer(
                    $c->get(ISystemDiContainer::class)->getFileService(),
                    $c->get(ISystemDiContainer::class)->getHttpService()
                );
            },

            IFlightrouteDiContainer::class => function (ContainerInterface $c) {
                return new ProdFlightrouteDiContainer(
                    $c->get(IUserDiContainer::class)->getUserService(),
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getHttpService()
                );
            },

            IGeonameDiContainer::class => function (ContainerInterface $c) {
                return new ProdGeonameDiContainer(
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ITerrainDiContainer::class)->getTerrainService(),
                );
            },

            IMeteoForecastDiContainer::class => function (ContainerInterface $c) {
                return new ProdMeteoForecastDiContainer(
                    $c->get(ISystemDiContainer::class)->getFileService(),
                    $c->get(ISystemDiContainer::class)->getHttpService(),
                    $c->get(IConfigDiContainer::class)
                );
            },

            IMeteoRadarImagesDiContainer::class => function (ContainerInterface $c) {
                return new ProdMeteoRadarImagesDiContainer(
                    $c->get(ISystemDiContainer::class)->getFileService(),
                    $c->get(ISystemDiContainer::class)->getHttpService(),
                    $c->get(IConfigDiContainer::class)
                );
            },

            IMeteoGramDiContainer::class => function (ContainerInterface $c) {
                return new ProdMeteoGramDiContainer(
                    $c->get(ISystemDiContainer::class)->getHttpService(),
                    $c->get(IMeteoForecastDiContainer::class)->getMeteoForecastVerticalCloudRepo(),
                    $c->get(IMeteoForecastDiContainer::class)->getMeteoForecastPrecipRepo(),
                    $c->get(IMeteoForecastDiContainer::class)->getMeteoForecastTempRepo(),
                    $c->get(ITerrainDiContainer::class)->getTerrainService()
                );
            },

            IMetarTafDiContainer::class => function (ContainerInterface $c) {
                return new ProdMetarTafDiContainer(
                    $c->get(ISystemDiContainer::class)->getHttpService()
                );
            },

            IMeteoSmaDiContainer::class => function (ContainerInterface $c) {
                return new ProdMeteoSmaDiContainer(
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getTimeService(),
                    $c->get(ISystemDiContainer::class)->getHttpService()
                );
            },

            INotamDiContainer::class => function (ContainerInterface $c) {
                return new ProdNotamDiContainer(
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getHttpService(),
                    $c->get(ISystemDiContainer::class)->getLoggingService(),
                    $c->get(IAirspaceDiContainer::class)->getFirService(),
                    $c->get(IAerodromeDiContainer::class)->getAirportService()
                );
            },

            IOpenAipDiContainer::class => function (ContainerInterface $c) {
                return new ProdOpenAipDiContainer(
                    $c->get(IAerodromeDiContainer::class)->getAirportService(),
                    $c->get(IAirspaceDiContainer::class)->getAirspaceService(),
                    $c->get(INavaidDiContainer::class)->getNavaidService(),
                    $c->get(ISystemDiContainer::class)->getLoggingService(),
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getCurlService(),
                );
            },

            ISearchDiContainer::class => function (ContainerInterface $c) {
                return new ProdSearchDiContainer(
                    $c->get(ISystemDiContainer::class)->getHttpService(),
                    $c->get(IUserDiContainer::class)->getSearchUserPointUc(),
                    $c->get(IAirspaceDiContainer::class)->getAirspaceService(),
                    $c->get(INotamDiContainer::class)->getNotamSearchByPositionQuery(),
                    $c->get(IAerodromeDiContainer::class)->getAirportService(),
                    $c->get(IAerodromeReportingDiContainer::class)->getAerodromeReportingByPositionQuery(),
                    $c->get(IAerodromeReportingDiContainer::class)->getAerodromeReportingByTextQuery(),
                    $c->get(INavaidDiContainer::class)->getNavaidService(),
                    $c->get(IGeonameDiContainer::class)->getGeonameService(),
                );
            },

            ITerrainDiContainer::class => function (ContainerInterface $c) {
                return new ProdTerrainDiContainer(
                    $c->get(ISystemDiContainer::class)->getFileService(),
                    $c->get(IConfigDiContainer::class)
                );
            },

            ITrackDiContainer::class => function (ContainerInterface $c) {
                return new ProdTrackDiContainer(
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getHttpService(),
                    $c->get(IUserDiContainer::class)->getUserService(),
                    $c->get(IExporterDiContainer::class)->getExportService()
                );
            },

            ITrafficDiContainer::class => function (ContainerInterface $c) {
                return new ProdTrafficDiContainer(
                    $c->get(ISystemDiContainer::class)->getFileService(),
                    $c->get(ISystemDiContainer::class)->getTimeService(),
                    $c->get(ISystemDiContainer::class)->getProcService(),
                    $c->get(ISystemDiContainer::class)->getLoggingService(),
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getHttpService()
                );
            },

            IUserDiContainer::class => function (ContainerInterface $c) {
                return new ProdUserDiContainer(
                    $c->get(ISystemDiContainer::class)->getHttpService(),
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getMailService(),
                    $c->get(IConfigDiContainer::class),
                    $c->get(ISystemDiContainer::class)->getLoggingService()
                );
            },

            IVerticalMapDiContainer::class => function (ContainerInterface $c) {
                return new ProdVerticalMapDiContainer(
                    $c->get(ITerrainDiContainer::class)->getTerrainService(),
                    $c->get(IAirspaceDiContainer::class)->getAirspaceService(),
                    $c->get(IMeteoForecastDiContainer::class)->getMeteoForecastVerticalCloudRepo(),
                    $c->get(IMeteoForecastDiContainer::class)->getMeteoForecastVerticalWindRepo(),
                    $c->get(ISystemDiContainer::class)->getHttpService(),
                );
            },

            IWebcamDiContainer::class => function (ContainerInterface $c) {
                return new ProdWebcamDiContainer(
                    $c->get(IPersistenceDiContainer::class)->getDbService(),
                    $c->get(ISystemDiContainer::class)->getHttpService()
                );
            },
        ]);

        $this->container = $builder->build();
    }


    public function getConfigDiContainer(): IConfigDiContainer
    {
        return $this->container->get(IConfigDiContainer::class);
    }


    public function getAdminDiContainer(): IAdminDiContainer
    {
        return $this->container->get(IAdminDiContainer::class);
    }


    public function getAerodromeDiContainer(): IAerodromeDiContainer
    {
        return $this->container->get(IAerodromeDiContainer::class);
    }


    public function getAerodromeChartDiContainer(): IAerodromeChartDiContainer
    {
        return $this->container->get(IAerodromeChartDiContainer::class);
    }


    public function getAerodromeCircuitDiContainer(): IAerodromeCircuitDiContainer
    {
        return $this->container->get(IAerodromeCircuitDiContainer::class);
    }


    public function getAerodromeReportingDiContainer(): IAerodromeReportingDiContainer
    {
        return $this->container->get(IAerodromeReportingDiContainer::class);
    }


    public function getAircraftDiContainer(): IAircraftDiContainer
    {
        return $this->container->get(IAircraftDiContainer::class);
    }


    public function getAirspaceDiContainer(): IAirspaceDiContainer
    {
        return $this->container->get(IAirspaceDiContainer::class);
    }


    public function getNavaidDiContainer(): INavaidDiContainer
    {
        return $this->container->get(INavaidDiContainer::class);
    }


    public function getExportDiContainer(): IExporterDiContainer
    {
        return $this->container->get(IExporterDiContainer::class);
    }


    public function getFlightrouteDiContainer(): IFlightrouteDiContainer
    {
        return $this->container->get(IFlightrouteDiContainer::class);
    }


    public function getGeonameDiContainer(): IGeonameDiContainer
    {
        return $this->container->get(IGeonameDiContainer::class);
    }


    public function getMeteoForecastDiContainer(): IMeteoForecastDiContainer
    {
        return $this->container->get(IMeteoForecastDiContainer::class);
    }


    public function getMeteoRadarImagesDiContainer(): IMeteoRadarImagesDiContainer
    {
        return $this->container->get(IMeteoRadarImagesDiContainer::class);
    }


    public function getMeteoGramDiContainer(): IMeteoGramDiContainer
    {
        return $this->container->get(IMeteoGramDiContainer::class);
    }


    public function getMetarTafDiContainer(): IMetarTafDiContainer
    {
        return $this->container->get(IMetarTafDiContainer::class);
    }


    public function getMeteoSmaDiContainer(): IMeteoSmaDiContainer
    {
        return $this->container->get(IMeteoSmaDiContainer::class);
    }


    public function getNotamDiContainer(): INotamDiContainer
    {
        return $this->container->get(INotamDiContainer::class);
    }


    public function getOpenAipDiContainer(): IOpenAipDiContainer
    {
        return $this->container->get(IOpenAipDiContainer::class);
    }


    public function getSearchDiContainer(): ISearchDiContainer
    {
        return $this->container->get(ISearchDiContainer::class);
    }


    public function getSystemDiContainer(): ISystemDiContainer
    {
        return $this->container->get(ISystemDiContainer::class);
    }


    public function getPersistenceDiContainer(): IPersistenceDiContainer
    {
        return $this->container->get(IPersistenceDiContainer::class);
    }


    public function getTerrainDiContainer(): ITerrainDiContainer
    {
        return $this->container->get(ITerrainDiContainer::class);
    }


    public function getTrackDiContainer(): ITrackDiContainer
    {
        return $this->container->get(ITrackDiContainer::class);
    }


    public function getTrafficDiContainer(): ITrafficDiContainer
    {
        return $this->container->get(ITrafficDiContainer::class);
    }


    public function getUserDiContainer(): IUserDiContainer
    {
        return $this->container->get(IUserDiContainer::class);
    }


    public function getVerticalMapDiContainer(): IVerticalMapDiContainer
    {
        return $this->container->get(IVerticalMapDiContainer::class);
    }


    public function getWebcamDiContainer(): IWebcamDiContainer
    {
        return $this->container->get(IWebcamDiContainer::class);
    }
}
