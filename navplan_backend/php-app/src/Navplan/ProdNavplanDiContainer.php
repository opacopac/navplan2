<?php declare(strict_types=1);

namespace Navplan;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Admin\Domain\Service\IAdminService;
use Navplan\Admin\IAdminDiContainer;
use Navplan\Aerodrome\IAerodromeDiContainer;
use Navplan\Aerodrome\Rest\Controller\AirportController;
use Navplan\AerodromeChart\IAerodromeChartDiContainer;
use Navplan\AerodromeChart\Rest\Controller\AdChartController;
use Navplan\AerodromeCircuit\Domain\Service\IAirportCircuitService;
use Navplan\AerodromeCircuit\IAerodromeCircuitDiContainer;
use Navplan\AerodromeCircuit\Rest\Controller\AdCircuitController;
use Navplan\AerodromeReporting\IAerodromeReportingDiContainer;
use Navplan\AerodromeReporting\Rest\Controller\AdReportingPointController;
use Navplan\Aircraft\IAircraftDiContainer;
use Navplan\Aircraft\Importer\Service\IAircraftTypeDesignatorImporter;
use Navplan\Aircraft\Rest\Controller\AircraftController;
use Navplan\Aircraft\Rest\Controller\AircraftTypeDesignatorController;
use Navplan\Airspace\IAirspaceDiContainer;
use Navplan\Airspace\Rest\Controller\AirspaceController;
use Navplan\Airspace\Rest\Controller\FirController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Exporter\IExporterDiContainer;
use Navplan\Exporter\Rest\Controller\ExporterController;
use Navplan\Flightroute\IFlightrouteDiContainer;
use Navplan\Flightroute\Rest\Controller\FlightrouteController;
use Navplan\MetarTaf\IMetarTafDiContainer;
use Navplan\MetarTaf\Rest\Service\ReadMetarTafController;
use Navplan\MeteoForecast\IMeteoForecastDiContainer;
use Navplan\MeteoForecast\Rest\Service\MeteoForecastController;
use Navplan\MeteoGram\IMeteoGramDiContainer;
use Navplan\MeteoGram\Rest\Service\ReadCloudMeteogramController;
use Navplan\MeteoRadar\IMeteoRadarImagesDiContainer;
use Navplan\MeteoRadar\Rest\Service\MeteoRadarImageController;
use Navplan\MeteoSma\Domain\Service\IMeteoSmaService;
use Navplan\MeteoSma\IMeteoSmaDiContainer;
use Navplan\MeteoSma\Rest\Service\MeteoSmaController;
use Navplan\Navaid\INavaidDiContainer;
use Navplan\Navaid\Rest\Controller\NavaidController;
use Navplan\Notam\IcaoImporter\INotamGeometryParser;
use Navplan\Notam\INotamDiContainer;
use Navplan\Notam\Rest\Service\NotamController;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;
use Navplan\OpenAip\IOpenAipDiContainer;
use Navplan\Search\ISearchDiContainer;
use Navplan\Search\Rest\Service\SearchController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\ITimeService;
use Navplan\System\IPersistenceDiContainer;
use Navplan\System\ISystemDiContainer;
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
use Navplan\Webcam\Rest\Service\WebcamController;


/**
 * Wires the entire backend into ONE application-wide PHP-DI Container.
 *
 * Each module ships a "<feature>.definitions.php" file with its interface ->
 * implementation bindings; this class loads all of them and implements
 * every module's I<Feature>DiContainer interface, with each method being a
 * trivial one-line delegate to the shared container. The per-module
 * interfaces stay as explicit module boundaries.
 *
 * IConfigDiContainer is not implemented here: it extends ~10 narrow config
 * interfaces that are consumed via direct autowiring elsewhere, and
 * IniFileConfig (bound in config.definitions.php) already implements them
 * all directly, so no facade is needed.
 *
 * Every module binds its controller to the shared IRestController interface
 * within its own definitions file. Since all definitions are merged into
 * one container, each module's concrete controller class (not
 * IRestController) is used as the lookup key here to avoid collisions
 * between modules.
 *
 * Only getters that are actually called somewhere in the codebase are kept
 * here; remove unused ones from both the owning I<Feature>DiContainer
 * interface and this class (and, if an interface ends up empty, delete it).
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
    IMetarTafDiContainer,
    IMeteoForecastDiContainer,
    IMeteoGramDiContainer,
    IMeteoRadarImagesDiContainer,
    IMeteoSmaDiContainer,
    INotamDiContainer,
    IOpenAipDiContainer,
    ISearchDiContainer,
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

        $this->container = $builder->build();
    }


    // --- ISystemDiContainer -------------------------------------------------


    public function getFileService(): IFileService
    {
        return $this->container->get(IFileService::class);
    }


    public function getTimeService(): ITimeService
    {
        return $this->container->get(ITimeService::class);
    }


    public function getLoggingService(): ILoggingService
    {
        return $this->container->get(ILoggingService::class);
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


    // --- INavaidDiContainer -----------------------------------------------

    public function getNavaidController(): IRestController
    {
        return $this->container->get(NavaidController::class);
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


    // --- IExporterDiContainer -----------------------------------------------

    public function getExportController(): IRestController
    {
        return $this->container->get(ExporterController::class);
    }


    // --- IFlightrouteDiContainer ---------------------------------------------

    public function getFlightrouteController(): IRestController
    {
        return $this->container->get(FlightrouteController::class);
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
