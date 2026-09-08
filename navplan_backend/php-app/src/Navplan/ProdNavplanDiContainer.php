<?php declare(strict_types=1);

namespace Navplan;

use DI\Container;
use DI\ContainerBuilder;
use Psr\Container\ContainerInterface;
use Navplan\Admin\IAdminDiContainer;
use Navplan\Admin\Domain\Service\IAdminService;
use Navplan\Aerodrome\IAerodromeDiContainer;
use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Rest\Controller\AirportController;
use Navplan\AerodromeChart\IAerodromeChartDiContainer;
use Navplan\AerodromeChart\Rest\Controller\AdChartController;
use Navplan\AerodromeCircuit\IAerodromeCircuitDiContainer;
use Navplan\AerodromeCircuit\Domain\Service\IAirportCircuitService;
use Navplan\AerodromeCircuit\Rest\Controller\AdCircuitController;
use Navplan\AerodromeReporting\IAerodromeReportingDiContainer;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByTextQuery;
use Navplan\AerodromeReporting\Rest\Controller\AdReportingPointController;
use Navplan\Aircraft\IAircraftDiContainer;
use Navplan\Aircraft\Importer\Service\IAircraftTypeDesignatorImporter;
use Navplan\Aircraft\Rest\Controller\AircraftController;
use Navplan\Aircraft\Rest\Controller\AircraftTypeDesignatorController;
use Navplan\Airspace\IAirspaceDiContainer;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Airspace\Domain\Service\IFirService;
use Navplan\Airspace\Rest\Controller\AirspaceController;
use Navplan\Airspace\Rest\Controller\FirController;
use Navplan\Config\IConfigDiContainer;
use Navplan\Common\Rest\Controller\IRestController;
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
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\Navaid\Rest\Controller\NavaidController;
use Navplan\Notam\INotamDiContainer;
use Navplan\Notam\ProdNotamDiContainer;
use Navplan\OpenAip\IOpenAipDiContainer;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;
use Navplan\OpenAip\ProdOpenAipDiContainer;
use Navplan\Search\ISearchDiContainer;
use Navplan\Search\ProdSearchDiContainer;
use Navplan\System\IPersistenceDiContainer;
use Navplan\System\ISystemDiContainer;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ICurlService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\IImageService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\IMailService;
use Navplan\System\Domain\Service\IProcService;
use Navplan\System\Domain\Service\ITimeService;
use Navplan\Terrain\ITerrainDiContainer;
use Navplan\Terrain\ProdTerrainDiContainer;
use Navplan\Track\ITrackDiContainer;
use Navplan\Track\ProdTrackDiContainer;
use Navplan\Traffic\ITrafficDiContainer;
use Navplan\Traffic\ProdTrafficDiContainer;
use Navplan\User\IUserDiContainer;
use Navplan\User\Domain\Service\IUserService;
use Navplan\User\ProdUserDiContainer;
use Navplan\VerticalMap\IVerticalMapDiContainer;
use Navplan\VerticalMap\ProdVerticalMapDiContainer;
use Navplan\Webcam\IWebcamDiContainer;
use Navplan\Webcam\Domain\Query\IWebcamByIcaoQuery;
use Navplan\Webcam\Rest\Service\WebcamController;


/**
 * Hybrid DI approach: keeps the per-module I<Feature>DiContainer interfaces as
 * explicit module boundaries, but no longer has a separate Prod<Feature>DiContainer
 * class (with its own private PHP-DI Container) per module. Instead:
 *  - each converted module ships a "<feature>.definitions.php" file (pure data:
 *    interface -> implementation bindings),
 *  - this class loads ALL of them into ONE application-wide container,
 *  - this class itself implements the converted modules' DiContainer interfaces
 *    directly, with each method being a trivial one-line delegate to the container.
 *
 * Modules not yet converted (most of them) keep working unchanged via their
 * existing Prod<Feature>DiContainer class, wired via a factory closure below -
 * both styles can coexist in the same container. See docs/di-approach.md.
 *
 * NOTE on IConfigDiContainer: deliberately NOT flattened onto this class.
 * It extends ~10 narrow config interfaces with ~13 getters in total; turning
 * those into proxy methods here would be pure boilerplate with no benefit,
 * since ProdConfigDiContainer is already a plain (non-Container-wrapping)
 * implementation. getConfigDiContainer() keeps returning the real instance.
 *
 * NOTE on controllers: every module binds its controller to the shared
 * IRestController interface within ITS OWN (now removed) container. Since all
 * definitions are merged into one container here, that key would collide
 * across modules - so converted modules bind their CONCRETE controller class
 * instead (see e.g. navaid.definitions.php / webcam.definitions.php).
 */
class ProdNavplanDiContainer implements
    ISystemDiContainer,
    IPersistenceDiContainer,
    IWebcamDiContainer,
    INavaidDiContainer,
    IAdminDiContainer,
    IAerodromeDiContainer,
    IAerodromeChartDiContainer,
    IAerodromeCircuitDiContainer,
    IAerodromeReportingDiContainer,
    IAircraftDiContainer,
    IAirspaceDiContainer
{
    private Container $container;


    public function __construct()
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions(__DIR__ . '/Config/config.definitions.php');
        $builder->addDefinitions(__DIR__ . '/System/system.definitions.php');
        $builder->addDefinitions(__DIR__ . '/System/persistence.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Webcam/webcam.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Navaid/navaid.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Admin/admin.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Aerodrome/aerodrome.definitions.php');
        $builder->addDefinitions(__DIR__ . '/AerodromeChart/aerodromeChart.definitions.php');
        $builder->addDefinitions(__DIR__ . '/AerodromeCircuit/aerodromeCircuit.definitions.php');
        $builder->addDefinitions(__DIR__ . '/AerodromeReporting/aerodromeReporting.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Aircraft/aircraft.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Airspace/airspace.definitions.php');
        $builder->addDefinitions([
            // Self-registration: this class implements these DiContainer
            // interfaces directly, so not-yet-converted modules' factory
            // closures below can keep calling $c->get(IXxxDiContainer::class)
            // ->getYyy() unchanged. No recursion risk: getYyy() delegates to a
            // DIFFERENT container key (e.g. IHttpService::class), never back
            // to ISystemDiContainer::class itself.
            ISystemDiContainer::class => $this,
            IPersistenceDiContainer::class => $this,
            IWebcamDiContainer::class => $this,
            INavaidDiContainer::class => $this,
            IAdminDiContainer::class => $this,
            IAerodromeDiContainer::class => $this,
            IAerodromeChartDiContainer::class => $this,
            IAerodromeCircuitDiContainer::class => $this,
            IAerodromeReportingDiContainer::class => $this,
            IAircraftDiContainer::class => $this,
            IAirspaceDiContainer::class => $this,

            // Bridges to not-yet-migrated modules: some migrated modules'
            // classes are autowired and need these interfaces injected
            // directly, but the owning module isn't merged into this
            // container yet - only reachable via its old DiContainer facade.
            // Delete the bridge once the owning module gets migrated too.
            IUserService::class => function (ContainerInterface $c) {
                return $c->get(IUserDiContainer::class)->getUserService();
            },
            IOpenAipImporter::class => function (ContainerInterface $c) {
                return $c->get(IOpenAipDiContainer::class)->getOpenAipImporter();
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

        ]);

        $this->container = $builder->build();
    }


    public function getConfigDiContainer(): IConfigDiContainer
    {
        return $this->container->get(IConfigDiContainer::class);
    }


    public function getAdminDiContainer(): IAdminDiContainer
    {
        return $this;
    }


    public function getAerodromeDiContainer(): IAerodromeDiContainer
    {
        return $this;
    }


    public function getAerodromeChartDiContainer(): IAerodromeChartDiContainer
    {
        return $this;
    }


    public function getAerodromeCircuitDiContainer(): IAerodromeCircuitDiContainer
    {
        return $this;
    }


    public function getAerodromeReportingDiContainer(): IAerodromeReportingDiContainer
    {
        return $this;
    }


    public function getAircraftDiContainer(): IAircraftDiContainer
    {
        return $this;
    }


    public function getAirspaceDiContainer(): IAirspaceDiContainer
    {
        return $this;
    }


    public function getNavaidDiContainer(): INavaidDiContainer
    {
        return $this;
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
        return $this;
    }


    public function getPersistenceDiContainer(): IPersistenceDiContainer
    {
        return $this;
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
        return $this;
    }


    // --- ISystemDiContainer -------------------------------------------------

    public function getHttpService(): IHttpService
    {
        return $this->container->get(IHttpService::class);
    }


    public function getFileService(): IFileService
    {
        return $this->container->get(IFileService::class);
    }


    public function getMailService(): IMailService
    {
        return $this->container->get(IMailService::class);
    }


    public function getTimeService(): ITimeService
    {
        return $this->container->get(ITimeService::class);
    }


    public function getProcService(): IProcService
    {
        return $this->container->get(IProcService::class);
    }


    public function getLoggingService(): ILoggingService
    {
        return $this->container->get(ILoggingService::class);
    }


    public function getImageService(): IImageService
    {
        return $this->container->get(IImageService::class);
    }


    public function getCurlService(): ICurlService
    {
        return $this->container->get(ICurlService::class);
    }


    // --- IPersistenceDiContainer ---------------------------------------------

    public function getDbService(): IDbService
    {
        return $this->container->get(IDbService::class);
    }


    // --- IWebcamDiContainer ---------------------------------------------------

    public function getWebcamController(): IRestController
    {
        return $this->container->get(WebcamController::class);
    }


    public function getWebcamByIcaoQuery(): IWebcamByIcaoQuery
    {
        return $this->container->get(IWebcamByIcaoQuery::class);
    }


    // --- INavaidDiContainer -----------------------------------------------

    public function getNavaidController(): IRestController
    {
        return $this->container->get(NavaidController::class);
    }


    public function getNavaidService(): INavaidService
    {
        return $this->container->get(INavaidService::class);
    }


    // --- IAdminDiContainer --------------------------------------------------

    public function getAdminService(): IAdminService
    {
        return $this->container->get(IAdminService::class);
    }


    // --- IAerodromeDiContainer -----------------------------------------------

    public function getAirportController(): IRestController
    {
        return $this->container->get(AirportController::class);
    }


    public function getAirportService(): IAirportService
    {
        return $this->container->get(IAirportService::class);
    }


    // --- IAerodromeChartDiContainer -------------------------------------------

    public function getAirportChartController(): IRestController
    {
        return $this->container->get(AdChartController::class);
    }


    // --- IAerodromeCircuitDiContainer ------------------------------------------

    public function getAirportCircuitController(): IRestController
    {
        return $this->container->get(AdCircuitController::class);
    }


    public function getAirportCircuitService(): IAirportCircuitService
    {
        return $this->container->get(IAirportCircuitService::class);
    }


    // --- IAerodromeReportingDiContainer ----------------------------------------

    public function getReportingPointController(): IRestController
    {
        return $this->container->get(AdReportingPointController::class);
    }


    public function getAerodromeReportingByPositionQuery(): IAerodromeReportingByPositionQuery
    {
        return $this->container->get(IAerodromeReportingByPositionQuery::class);
    }


    public function getAerodromeReportingByTextQuery(): IAerodromeReportingByTextQuery
    {
        return $this->container->get(IAerodromeReportingByTextQuery::class);
    }



    // --- IAircraftDiContainer --------------------------------------------------

    public function getAircraftController(): IRestController
    {
        return $this->container->get(AircraftController::class);
    }


    public function getAircraftTypeDesignatorController(): IRestController
    {
        return $this->container->get(AircraftTypeDesignatorController::class);
    }




    public function getAircraftTypeDesignatorImporter(): IAircraftTypeDesignatorImporter
    {
        return $this->container->get(IAircraftTypeDesignatorImporter::class);
    }


    // --- IAirspaceDiContainer ----------------------------------------------

    public function getAirspaceController(): IRestController
    {
        return $this->container->get(AirspaceController::class);
    }


    public function getFirController(): IRestController
    {
        return $this->container->get(FirController::class);
    }


    public function getAirspaceService(): IAirspaceService
    {
        return $this->container->get(IAirspaceService::class);
    }


    public function getFirService(): IFirService
    {
        return $this->container->get(IFirService::class);
    }
}
