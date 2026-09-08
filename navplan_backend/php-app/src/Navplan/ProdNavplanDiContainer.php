<?php declare(strict_types=1);

namespace Navplan;

use DI\Container;
use DI\ContainerBuilder;
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
use Navplan\Exporter\Domain\Service\IExportService;
use Navplan\Exporter\Rest\Controller\ExporterController;
use Navplan\Flightroute\IFlightrouteDiContainer;
use Navplan\Flightroute\Rest\Controller\FlightrouteController;
use Navplan\Geoname\IGeonameDiContainer;
use Navplan\Geoname\Domain\Service\IGeonameService;
use Navplan\MetarTaf\IMetarTafDiContainer;
use Navplan\MetarTaf\Rest\Service\ReadMetarTafController;
use Navplan\MeteoForecast\IMeteoForecastDiContainer;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalCloudRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalWindRepo;
use Navplan\MeteoForecast\Rest\Service\MeteoForecastController;
use Navplan\MeteoGram\IMeteoGramDiContainer;
use Navplan\MeteoGram\Rest\Service\ReadCloudMeteogramController;
use Navplan\MeteoRadar\IMeteoRadarImagesDiContainer;
use Navplan\MeteoRadar\Rest\Service\MeteoRadarImageController;
use Navplan\MeteoSma\IMeteoSmaDiContainer;
use Navplan\MeteoSma\Domain\Service\IMeteoSmaService;
use Navplan\MeteoSma\Rest\Service\MeteoSmaController;
use Navplan\Navaid\INavaidDiContainer;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\Navaid\Rest\Controller\NavaidController;
use Navplan\Notam\INotamDiContainer;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
use Navplan\Notam\IcaoImporter\INotamGeometryParser;
use Navplan\Notam\Rest\Service\NotamController;
use Navplan\OpenAip\IOpenAipDiContainer;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;
use Navplan\Search\ISearchDiContainer;
use Navplan\Search\Rest\Service\SearchController;
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
use Navplan\Terrain\Domain\Service\ITerrainService;
use Navplan\Track\ITrackDiContainer;
use Navplan\Track\Rest\Service\TrackController;
use Navplan\Traffic\ITrafficDiContainer;
use Navplan\Traffic\Ogn\Service\IOgnListenerRepo;
use Navplan\Traffic\Rest\Service\TrafficController;
use Navplan\User\IUserDiContainer;
use Navplan\User\Rest\Service\UserController;
use Navplan\VerticalMap\IVerticalMapDiContainer;
use Navplan\VerticalMap\Rest\Service\VerticalMapController;
use Navplan\Webcam\IWebcamDiContainer;
use Navplan\Webcam\Domain\Query\IWebcamByIcaoQuery;
use Navplan\Webcam\Rest\Service\WebcamController;


/**
 * Hybrid DI approach: keeps the per-module I<Feature>DiContainer interfaces as
 * explicit module boundaries, but no longer has a separate Prod<Feature>DiContainer
 * class (with its own private PHP-DI Container) per module. Instead:
 *  - each module ships a "<feature>.definitions.php" file (pure data:
 *    interface -> implementation bindings),
 *  - this class loads ALL of them into ONE application-wide container,
 *  - this class itself implements ALL modules' DiContainer interfaces
 *    directly, with each method being a trivial one-line delegate to the container.
 *
 * All modules are migrated to this pattern (see docs/di-approach.md) - there
 * is no more Prod<Feature>DiContainer class anywhere in the codebase.
 *
 * NOTE on IConfigDiContainer: deliberately NOT flattened onto this class.
 * It extends ~10 narrow config interfaces with ~13 getters in total; turning
 * those into proxy methods here would be pure boilerplate with no benefit,
 * since IniFileConfig (bound directly as IConfigDiContainer in
 * config.definitions.php) is already a plain implementation with no
 * separate Prod-wrapper class. getConfigDiContainer() keeps returning the
 * real instance.
 *
 * NOTE on controllers: every module binds its controller to the shared
 * IRestController interface within ITS OWN (now removed) container. Since all
 * definitions are merged into one container here, that key would collide
 * across modules - so each module binds its CONCRETE controller class
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
    IAirspaceDiContainer,
    IExporterDiContainer,
    IFlightrouteDiContainer,
    IGeonameDiContainer,
    IMetarTafDiContainer,
    IMeteoForecastDiContainer,
    IMeteoGramDiContainer,
    IMeteoRadarImagesDiContainer,
    IMeteoSmaDiContainer,
    INotamDiContainer,
    IOpenAipDiContainer,
    ISearchDiContainer,
    ITerrainDiContainer,
    ITrackDiContainer,
    ITrafficDiContainer,
    IUserDiContainer,
    IVerticalMapDiContainer
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
        $builder->addDefinitions(__DIR__ . '/Exporter/exporter.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Flightroute/flightroute.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Geoname/geoname.definitions.php');
        $builder->addDefinitions(__DIR__ . '/MetarTaf/metarTaf.definitions.php');
        $builder->addDefinitions(__DIR__ . '/MeteoForecast/meteoForecast.definitions.php');
        $builder->addDefinitions(__DIR__ . '/MeteoGram/meteoGram.definitions.php');
        $builder->addDefinitions(__DIR__ . '/MeteoRadar/meteoRadar.definitions.php');
        $builder->addDefinitions(__DIR__ . '/MeteoSma/meteoSma.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Notam/notam.definitions.php');
        $builder->addDefinitions(__DIR__ . '/OpenAip/openAip.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Search/search.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Terrain/terrain.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Track/track.definitions.php');
        $builder->addDefinitions(__DIR__ . '/Traffic/traffic.definitions.php');
        $builder->addDefinitions(__DIR__ . '/User/user.definitions.php');
        $builder->addDefinitions(__DIR__ . '/VerticalMap/verticalMap.definitions.php');
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
            IExporterDiContainer::class => $this,
            IFlightrouteDiContainer::class => $this,
            IGeonameDiContainer::class => $this,
            IMetarTafDiContainer::class => $this,
            IMeteoForecastDiContainer::class => $this,
            IMeteoGramDiContainer::class => $this,
            IMeteoRadarImagesDiContainer::class => $this,
            IMeteoSmaDiContainer::class => $this,
            INotamDiContainer::class => $this,
            IOpenAipDiContainer::class => $this,
            ISearchDiContainer::class => $this,
            ITerrainDiContainer::class => $this,
            ITrackDiContainer::class => $this,
            ITrafficDiContainer::class => $this,
            IUserDiContainer::class => $this,
            IVerticalMapDiContainer::class => $this,
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
        return $this;
    }


    public function getFlightrouteDiContainer(): IFlightrouteDiContainer
    {
        return $this;
    }


    public function getGeonameDiContainer(): IGeonameDiContainer
    {
        return $this;
    }


    public function getMeteoForecastDiContainer(): IMeteoForecastDiContainer
    {
        return $this;
    }


    public function getMeteoRadarImagesDiContainer(): IMeteoRadarImagesDiContainer
    {
        return $this;
    }


    public function getMeteoGramDiContainer(): IMeteoGramDiContainer
    {
        return $this;
    }


    public function getMetarTafDiContainer(): IMetarTafDiContainer
    {
        return $this;
    }


    public function getMeteoSmaDiContainer(): IMeteoSmaDiContainer
    {
        return $this;
    }


    public function getNotamDiContainer(): INotamDiContainer
    {
        return $this;
    }


    public function getOpenAipDiContainer(): IOpenAipDiContainer
    {
        return $this;
    }


    public function getSearchDiContainer(): ISearchDiContainer
    {
        return $this;
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
        return $this;
    }


    public function getTrackDiContainer(): ITrackDiContainer
    {
        return $this;
    }


    public function getTrafficDiContainer(): ITrafficDiContainer
    {
        return $this;
    }


    public function getUserDiContainer(): IUserDiContainer
    {
        return $this;
    }


    public function getVerticalMapDiContainer(): IVerticalMapDiContainer
    {
        return $this;
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


    // --- IExporterDiContainer -----------------------------------------------

    public function getExportController(): IRestController
    {
        return $this->container->get(ExporterController::class);
    }


    public function getExportService(): IExportService
    {
        return $this->container->get(IExportService::class);
    }


    // --- IFlightrouteDiContainer ---------------------------------------------

    public function getFlightrouteController(): IRestController
    {
        return $this->container->get(FlightrouteController::class);
    }



    // --- IGeonameDiContainer --------------------------------------------------

    public function getGeonameService(): IGeonameService
    {
        return $this->container->get(IGeonameService::class);
    }


    // --- IMetarTafDiContainer --------------------------------------------------

    public function getReadMetarTafController(): IRestController
    {
        return $this->container->get(ReadMetarTafController::class);
    }


    // --- IMeteoForecastDiContainer -----------------------------------------

    public function getMeteoForecastController(): IRestController
    {
        return $this->container->get(MeteoForecastController::class);
    }



    public function getMeteoForecastVerticalCloudRepo(): IMeteoForecastVerticalCloudRepo
    {
        return $this->container->get(IMeteoForecastVerticalCloudRepo::class);
    }


    public function getMeteoForecastVerticalWindRepo(): IMeteoForecastVerticalWindRepo
    {
        return $this->container->get(IMeteoForecastVerticalWindRepo::class);
    }


    // --- IMeteoGramDiContainer ----------------------------------------------

    public function getReadCloudMeteoGramController(): IRestController
    {
        return $this->container->get(ReadCloudMeteogramController::class);
    }


    // --- IMeteoRadarImagesDiContainer -----------------------------------------

    public function getMeteoRadarImagesController(): IRestController
    {
        return $this->container->get(MeteoRadarImageController::class);
    }


    // --- IMeteoSmaDiContainer -------------------------------------------------

    public function getMeteoSmaController(): IRestController
    {
        return $this->container->get(MeteoSmaController::class);
    }


    public function getMeteoSmaService(): IMeteoSmaService
    {
        return $this->container->get(IMeteoSmaService::class);
    }


    // --- INotamDiContainer ----------------------------------------------------

    public function getNotamController(): IRestController
    {
        return $this->container->get(NotamController::class);
    }


    public function getNotamSearchByPositionQuery(): INotamSearchByPositionQuery
    {
        return $this->container->get(INotamSearchByPositionQuery::class);
    }


    public function getNotamGeometryParser(): INotamGeometryParser
    {
        return $this->container->get(INotamGeometryParser::class);
    }


    // --- IOpenAipDiContainer ----------------------------------------------------

    public function getOpenAipImporter(): IOpenAipImporter
    {
        return $this->container->get(IOpenAipImporter::class);
    }


    // --- ISearchDiContainer -----------------------------------------------

    public function getSearchController(): IRestController
    {
        return $this->container->get(SearchController::class);
    }


    // --- ITerrainDiContainer ------------------------------------------------

    public function getTerrainService(): ITerrainService
    {
        return $this->container->get(ITerrainService::class);
    }


    // --- ITrackDiContainer ----------------------------------------------------

    public function getTrackController(): IRestController
    {
        return $this->container->get(TrackController::class);
    }


    // --- ITrafficDiContainer ----------------------------------------------------

    public function getTrafficController(): IRestController
    {
        return $this->container->get(TrafficController::class);
    }


    public function getOgnListenerRepo(): IOgnListenerRepo
    {
        return $this->container->get(IOgnListenerRepo::class);
    }


    // --- IUserDiContainer -----------------------------------------------------

    public function getUserController(): IRestController
    {
        return $this->container->get(UserController::class);
    }


    // --- IVerticalMapDiContainer ------------------------------------------------

    public function getVerticalMapController(): IRestController
    {
        return $this->container->get(VerticalMapController::class);
    }
}
