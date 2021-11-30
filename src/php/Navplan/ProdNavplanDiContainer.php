<?php declare(strict_types=1);

namespace Navplan;

require_once __DIR__ . "/../config.php";

use Navplan\Aerodrome\DbRepo\DbAirportChartRepo;
use Navplan\Aerodrome\DbRepo\DbAirportCircuitRepo;
use Navplan\Aerodrome\DbRepo\DbAirportRepo;
use Navplan\Aerodrome\DbRepo\DbReportingPointRepo;
use Navplan\Aerodrome\DomainService\IAirportChartService;
use Navplan\Aerodrome\DomainService\IAirportCircuitService;
use Navplan\Aerodrome\DomainService\IAirportService;
use Navplan\Aerodrome\DomainService\IReportingPointService;
use Navplan\Aerodrome\RestService\IAirportServiceDiContainer;
use Navplan\Enroute\DbService\DbAirspaceRepo;
use Navplan\Enroute\DbService\DbNavaidRepo;
use Navplan\Enroute\DomainService\IAirspaceService;
use Navplan\Enroute\DomainService\INavaidService;
use Navplan\Enroute\RestService\IAirspaceServiceDiContainer;
use Navplan\Enroute\RestService\INavaidServiceDiContainer;
use Navplan\Exporter\Builder\NavplanExcelBuilder;
use Navplan\Exporter\Builder\NavplanFplBuilder;
use Navplan\Exporter\Builder\NavplanGpxBuilder;
use Navplan\Exporter\Builder\NavplanKmlBuilder;
use Navplan\Exporter\Builder\NavplanPdfBuilder;
use Navplan\Exporter\DomainService\IExportService;
use Navplan\Exporter\FileExportService\FileExportService;
use Navplan\Exporter\RestService\IExporterServiceDiContainer;
use Navplan\Flightroute\DbRepo\DbFlightrouteRepo;
use Navplan\Flightroute\DomainService\FlightrouteService;
use Navplan\Flightroute\DomainService\IFlightrouteService;
use Navplan\Flightroute\RestService\IFlightrouteServiceDiContainer;
use Navplan\Geoname\DbRepo\DbGeonameRepo;
use Navplan\Geoname\DomainService\GeonameService;
use Navplan\Geoname\DomainService\IGeonameService;
use Navplan\Geoname\RestService\IGeonameServiceDiContainer;
use Navplan\MeteoSma\DbService\DbMeteoSmaRepo;
use Navplan\MeteoSma\DomainService\IMeteoSmaService;
use Navplan\MeteoSma\RestService\IMeteoServiceDiContainer;
use Navplan\Notam\DbService\DbNotamRepo;
use Navplan\Notam\DomainService\INotamRepo;
use Navplan\Notam\DomainService\INotamService;
use Navplan\Notam\RestService\INotamServiceDiContainer;
use Navplan\Search\DomainService\ISearchService;
use Navplan\Search\DomainService\SearchService;
use Navplan\Search\RestService\ISearchServiceDiContainer;
use Navplan\System\DomainModel\LogLevel;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\IFileService;
use Navplan\System\DomainService\IHttpService;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\DomainService\IMailService;
use Navplan\System\DomainService\IProcService;
use Navplan\System\DomainService\ISystemServiceFactory;
use Navplan\System\DomainService\ITimeService;
use Navplan\System\MySqlDb\IDbDiContainer;
use Navplan\System\MySqlDb\MySqlDbService;
use Navplan\System\Posix\ISystemDiContainer;
use Navplan\System\Posix\LoggingService;
use Navplan\System\Posix\SystemServiceFactory;
use Navplan\Terrain\DomainService\ITerrainService;
use Navplan\Terrain\DomainService\TerrainService;
use Navplan\Terrain\FileService\FileTerrainRepo;
use Navplan\Terrain\RestService\ITerrainDiContainer;
use Navplan\Track\DbService\DbTrackRepo;
use Navplan\Track\DomainService\ITrackService;
use Navplan\Track\DomainService\TrackService;
use Navplan\Track\RestService\ITrackServiceDiContainer;
use Navplan\Traffic\AdsbexService\AdsbexService;
use Navplan\Traffic\DomainService\IAdsbexService;
use Navplan\Traffic\DomainService\IOgnService;
use Navplan\Traffic\DomainService\ITrafficDetailRepo;
use Navplan\Traffic\OgnListenerService\IOgnListenerRepo;
use Navplan\Traffic\OgnListenerService\OgnListenerRepo;
use Navplan\Traffic\OgnService\OgnService;
use Navplan\Traffic\RestService\ITrafficServiceDiContainer;
use Navplan\Traffic\TrafficDetailRepo\DbTrafficDetailRepo;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\IReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\ReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\IReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\ReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\IReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\ReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\IReadTrafficDetailsUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\ReadTrafficDetailsUc;
use Navplan\User\DbRepo\DbUserPointRepo;
use Navplan\User\DbRepo\DbUserRepo;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserPointRepo;
use Navplan\User\DomainService\IUserRepo;
use Navplan\User\DomainService\TokenService;
use Navplan\User\RestService\IUserServiceDiContainer;
use Navplan\User\UseCase\AutoLogin\AutoLoginUc;
use Navplan\User\UseCase\AutoLogin\IAutoLoginUc;
use Navplan\User\UseCase\Login\ILoginUc;
use Navplan\User\UseCase\Login\LoginUc;
use Navplan\User\UseCase\Register\IRegisterUc;
use Navplan\User\UseCase\Register\RegisterUc;
use Navplan\User\UseCase\ResetPw\IResetPwUc;
use Navplan\User\UseCase\ResetPw\ResetPwUc;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;
use Navplan\User\UseCase\SearchUserPoint\SearchUserPointUc;
use Navplan\User\UseCase\SendLostPw\ISendLostPwUc;
use Navplan\User\UseCase\SendLostPw\SendLostPwUc;
use Navplan\User\UseCase\SendRegisterEmail\ISendRegisterEmailUc;
use Navplan\User\UseCase\SendRegisterEmail\SendRegisterEmailUc;
use Navplan\User\UseCase\UpdatePw\IUpdatePwUc;
use Navplan\User\UseCase\UpdatePw\UpdatePwUc;
use Navplan\VerticalMap\DomainService\IVerticalMapService;
use Navplan\VerticalMap\DomainService\VerticalMapService;
use Navplan\VerticalMap\RestService\IVerticalMapDiContainer;
use Navplan\Webcam\DbRepo\DbWebcamRepo;
use Navplan\Webcam\DomainService\IWebcamRepo;
use Navplan\Webcam\DomainService\IWebcamService;
use Navplan\Webcam\RestService\IWebcamServiceDiContainer;


class ProdNavplanDiContainer implements ISystemDiContainer, IDbDiContainer, IFlightrouteServiceDiContainer,
    IGeonameServiceDiContainer, IMeteoServiceDiContainer, INotamServiceDiContainer, ISearchServiceDiContainer,
    ITerrainDiContainer, ITrafficServiceDiContainer, IUserServiceDiContainer, IAirportServiceDiContainer,
    IAirspaceServiceDiContainer, INavaidServiceDiContainer, IWebcamServiceDiContainer, IVerticalMapDiContainer,
    IExporterServiceDiContainer, ITrackServiceDiContainer
{
    // const
    private const LOG_LEVEL = LogLevel::INFO;
    private const LOG_DIR = __DIR__ . "/../../logs/";
    private const LOG_FILE = self::LOG_DIR . "navplan.log";
    private const LOG_FILE_OGN_LISTENER = self::LOG_DIR . "ogn_listener.log";
    private const TERRAIN_TILE_BASE_DIR = __DIR__ . '/../../../../navplan/terraintiles/';

    // airport
    private IAirportService $airportService;
    private IAirportChartService $airportChartService;
    private IAirportCircuitService $airportCircuitService;
    private IReportingPointService $reportingPointService;
    // airspace
    private IAirspaceService $airspaceService;
    // flightroute
    private IFlightrouteService $flightrouteService;
    // geoname
    private IGeonameService $geonameService;
    // meteo sma
    private IMeteoSmaService $meteoService;
    // navaid
    private INavaidService $navaidService;
    // notam
    private INotamRepo $notamService;
    // search
    private ISearchService $searchService;
    // system & db
    private ISystemServiceFactory $systemServiceFactory;
    private IHttpService $httpService;
    private IFileService $fileService;
    private IMailService $mailService;
    private ITimeService $timeService;
    private IProcService $procService;
    private ILoggingService $screenLogger;
    private ILoggingService $fileLogger;
    private IDbService $dbService;
    // terrain
    private ITerrainService $terrainService;
    // traffic
    private IAdsbexService $adsbexRepo;
    private IOgnService $ognRepo;
    private IOgnListenerRepo $ognListenerRepo;
    private ITrafficDetailRepo $trafficDetailsRepo;
    private IReadAdsbexTrafficUc $readAdsbexTrafficUc;
    private IReadAdsbexTrafficWithDetailsUc $readAdsbexTrafficWithDetailsUc;
    private IReadOgnTrafficUc $readOgnTrafficUc;
    private IReadTrafficDetailsUc $readTrafficDetailsUc;
    // user
    private IUserRepo $userRepo;
    private IUserPointRepo $userPointRepo;
    private ITokenService $tokenService;
    private ILoginUc $loginUc;
    private IAutoLoginUc $autologinUc;
    private ISendRegisterEmailUc $sendRegisterEmailUc;
    private IRegisterUc $registerUc;
    private ISendLostPwUc $sendLostPwUc;
    private IResetPwUc $resetPwUc;
    private IUpdatePwUc $updatePwUc;
    private ISearchUserPointUc $searchUserPointUc;
    // webcam
    private IWebcamRepo $webcamService;
    // vertical map
    private IVerticalMapService $verticalMapService;
    // export
    private IExportService $exportService;
    // track
    private ITrackService $trackService;


    public function __construct() {
    }


    // region airport

    public function getAirportService(): IAirportService {
        if (!isset($this->airportService)) {
            $this->airportService = new DbAirportRepo($this->getDbService());
        }

        return $this->airportService;
    }


    function getAirportChartService(): IAirportChartService {
        if (!isset($this->airportChartService)) {
            $this->airportChartService = new DbAirportChartRepo($this->getDbService());
        }

        return $this->airportChartService;
    }


    function getAirportCircuitService(): IAirportCircuitService {
        if (!isset($this->airportCircuitService)) {
            $this->airportCircuitService = new DbAirportCircuitRepo($this->getDbService());
        }

        return $this->airportCircuitService;
    }


    public function getReportingPointService(): IReportingPointService {
        if (!isset($this->reportingPointService)) {
            $this->reportingPointService = new DbReportingPointRepo($this->getDbService());
        }

        return $this->reportingPointService;
    }

    // endregion


    // region open aip

    public function getAirspaceService(): IAirspaceService {
        if (!isset($this->airspaceService)) {
            $this->airspaceService = new DbAirspaceRepo($this->getDbService());
        }

        return $this->airspaceService;
    }

    // endregion


    // region flightroute


    public function getFLightrouteService(): IFlightrouteService {
        if (!isset($this->flightrouteService)) {
            $this->flightrouteService = new FlightrouteService(
                $this->getTokenService(),
                $this->getUserRepo(),
                new DbFlightrouteRepo($this->getDbService())
            );
        }

        return $this->flightrouteService;
    }

    // endregion


    // region geoname

    function getGeonameService(): IGeonameService {
        if (!isset($this->geonameService)) {
            $this->geonameService = new GeonameService(
                new DbGeonameRepo($this->getDbService()),
                $this->getTerrainService(),
            );
        }

        return $this->geonameService;
    }

    // endregion


    // region meteo sma

    public function getMeteoSmaService(): IMeteoSmaService {
        if (!isset($this->meteoService)) {
            $this->meteoService = new DbMeteoSmaRepo(
                $this->getDbService(),
                $this->getTimeService()
            );
        }

        return $this->meteoService;
    }

    // endregion


    // region navaid

    public function getNavaidService(): INavaidService {
        if (!isset($this->navaidService)) {
            $this->navaidService = new DbNavaidRepo($this->getDbService());
        }

        return $this->navaidService;
    }

    // endregion


    // region notam

    public function getNotamService(): INotamService {
        if (!isset($this->notamService)) {
            $this->notamService = new DbNotamRepo($this->getDbService());
        }

        return $this->notamService;
    }

    // endregion


    // region search

    function getSearchService(): ISearchService {
        if (!isset($this->searchService)) {
            $this->searchService = new SearchService(
                $this->getSearchUserPointUc(),
                $this->getAirspaceService(),
                $this->getNotamService(),
                $this->getAirportService(),
                $this->getReportingPointService(),
                $this->getNavaidService(),
                $this->getGeonameService(),
            );
        }

        return $this->searchService;
    }

    // endregion


    // region system & db

    public function getSystemServiceFactory(): ISystemServiceFactory {
        if (!isset($this->systemServiceFactory)) {
            $this->systemServiceFactory = new SystemServiceFactory();
        }

        return $this->systemServiceFactory;
    }


    public function getHttpService(): IHttpService {
        if (!isset($this->httpService)) {
            $this->httpService = $this->getSystemServiceFactory()->getHttpService();
        }

        return $this->httpService;
    }


    public function getFileService(): IFileService {
        if (!isset($this->fileService)) {
            $this->fileService = $this->getSystemServiceFactory()->getFileService();
        }

        return $this->fileService;
    }


    public function getMailService(): IMailService {
        if (!isset($this->mailService)) {
            $this->mailService = $this->getSystemServiceFactory()->getMailService();
        }

        return $this->mailService;
    }


    public function getTimeService(): ITimeService {
        if (!isset($this->timeService)) {
            $this->timeService = $this->getSystemServiceFactory()->getTimeService();
        }

        return $this->timeService;
    }


    public function getProcService(): IProcService {
        if (!isset($this->procService)) {
            $this->procService = $this->getSystemServiceFactory()->getProcService();
        }

        return $this->procService;
    }


    public function getScreenLogger(): ILoggingService {
        if (!isset($this->screenLogger)) {
            $this->screenLogger = new LoggingService(
                $this->getTimeService(),
                self::LOG_LEVEL,
                null
            );
        }

        return $this->screenLogger;
    }


    public function getFileLogger(): ILoggingService {
        if (!isset($this->fileLogger)) {
            $this->fileLogger = new LoggingService(
                $this->getTimeService(),
                self::LOG_LEVEL,
                self::LOG_FILE
            );
        }

        return $this->fileLogger;
    }


    public function getDbService(): IDbService {
        global $db_host, $db_user, $db_pw, $db_name;

        if (!isset($this->dbService)) {
            $this->dbService = MySqlDbService::getInstance();
            $this->dbService->init($db_host, $db_user, $db_pw, $db_name);
        }

        return $this->dbService;
    }

    // endregion


    // region terrain

    function getTerrainService(): ITerrainService {
        if (!isset($this->terrainService)) {
            $this->terrainService = new TerrainService(
                new FileTerrainRepo(
                    $this->getFileService(),
                    self::TERRAIN_TILE_BASE_DIR
                )
            );
        }

        return $this->terrainService;
    }

    // endregion


    // region traffic

    public function getAdsbexRepo(): IAdsbexService {
        if (!isset($this->adsbexRepo)) {
            $this->adsbexRepo = new AdsbexService($this->getFileService());
        }

        return $this->adsbexRepo;
    }


    public function getOgnRepo(): IOgnService {
        if (!isset($this->ognRepo)) {
            /*$this->ognRepo = new OgnRepo(
                $this->getFileService(),
                $this->getProcService(),
                $this->getTimeService()
            );*/
            $this->ognRepo = new OgnService(
                $this->getOgnListenerRepo(),
                $this->getProcService(),
                $this->getFileLogger()
            );
        }

        return $this->ognRepo;
    }


    public function getOgnListenerRepo(): IOgnListenerRepo {
        if (!isset($this->ognListenerRepo)) {
            $this->ognListenerRepo = new OgnListenerRepo(
                $this->getDbService(),
                $this->getTimeService()
            );
        }

        return $this->ognListenerRepo;
    }


    public function getTrafficDetailRepo(): ITrafficDetailRepo {
        if (!isset($this->trafficDetailsRepo)) {
            $this->trafficDetailsRepo = new DbTrafficDetailRepo($this->getDbService());
        }

        return $this->trafficDetailsRepo;
    }



    public function getReadAdsbexTrafficUc(): IReadAdsbexTrafficUc {
        if (!isset($this->readAdsbexTrafficUc)) {
            $this->readAdsbexTrafficUc = new ReadAdsbexTrafficUc($this->getAdsbexRepo());
        }

        return $this->readAdsbexTrafficUc;
    }


    public function getReadAdsbexTrafficWithDetailsUc(): IReadAdsbexTrafficWithDetailsUc {
        if (!isset($this->readAdsbexTrafficWithDetailsUc)) {
            $this->readAdsbexTrafficWithDetailsUc = new ReadAdsbexTrafficWithDetailsUc(
                $this->getReadAdsbexTrafficUc(),
                $this->getReadTrafficDetailsUc()
            );
        }

        return $this->readAdsbexTrafficWithDetailsUc;
    }


    public function getReadOgnTrafficUc(): IReadOgnTrafficUc {
        if (!isset($this->readOgnTrafficUc)) {
            $this->readOgnTrafficUc = new ReadOgnTrafficUc($this->getOgnRepo());
        }

        return $this->readOgnTrafficUc;
    }


    public function getReadTrafficDetailsUc(): IReadTrafficDetailsUc {
        if (!isset($this->readTrafficDetailsUc)) {
            $this->readTrafficDetailsUc = new ReadTrafficDetailsUc($this->getTrafficDetailRepo());
        }

        return $this->readTrafficDetailsUc;
    }

    // endregion


    // region user

    public function getUserRepo(): IUserRepo {
        if (!isset($this->userRepo)) {
            $this->userRepo = new DbUserRepo($this->getDbService());
        }

        return $this->userRepo;
    }


    public function getUserPointRepo(): IUserPointRepo {
        if (!isset($this->userPointRepo)) {
            $this->userPointRepo = new DbUserPointRepo($this->getDbService());
        }

        return $this->userPointRepo;
    }


    public function getTokenService(): ITokenService {
        global $jwt_secret, $jwt_issuer;

        if (!isset($this->tokenService)) {
            $this->tokenService = new TokenService($jwt_secret, $jwt_issuer);
        }

        return $this->tokenService;
    }


    public function getLoginUc(): ILoginUc {
        if (!isset($this->loginUc)) {
            $this->loginUc = new LoginUc(
                $this->getUserRepo(),
                $this->getTokenService()
            );
        }

        return $this->loginUc;
    }


    public function getAutoLoginUc(): IAutoLoginUc {
        if (!isset($this->autologinUc)) {
            $this->autologinUc = new AutoLoginUc($this->getTokenService());
        }

        return $this->autologinUc;
    }


    function getSendRegisterEmailUc(): ISendRegisterEmailUc {
        if (!isset($this->sendRegisterEmailUc)) {
            $this->sendRegisterEmailUc = new SendRegisterEmailUc(
                $this->getUserRepo(),
                $this->getTokenService(),
                $this->getMailService()
            );
        }

        return $this->sendRegisterEmailUc;
    }


    public function getRegisterUc(): IRegisterUc {
        if (!isset($this->registerUc)) {
            $this->registerUc = new RegisterUc(
                $this->getUserRepo(),
                $this->getTokenService()
            );
        }

        return $this->registerUc;
    }


    public function getSendLostPwUc(): ISendLostPwUc {
        if (!isset($this->sendLostPwUc)) {
            $this->sendLostPwUc = new SendLostPwUc(
                $this->getUserRepo(),
                $this->getTokenService(),
                $this->getMailService()
            );
        }

        return $this->sendLostPwUc;
    }


    public function getResetPwUc(): IResetPwUc {
        if (!isset($this->resetPwUc)) {
            $this->resetPwUc = new ResetPwUc(
                $this->getUserRepo(),
                $this->getTokenService()
            );
        }

        return $this->resetPwUc;
    }


    public function getUpdatePwUc(): IUpdatePwUc {
        if (!isset($this->updatePwUc)) {
            $this->updatePwUc = new UpdatePwUc(
                $this->getUserRepo(),
                $this->getTokenService()
            );
        }

        return $this->updatePwUc;
    }


    function getSearchUserPointUc(): ISearchUserPointUc {
        if (!isset($this->searchUserPointUc)) {
            $this->searchUserPointUc = new SearchUserPointUc(
                $this->getUserPointRepo(),
                $this->getTokenService()
            );
        }

        return $this->searchUserPointUc;
    }

    // endregion


    // region webcam

    public function getWebcamService(): IWebcamService {
        if (!isset($this->webcamService)) {
            $this->webcamService = new DbWebcamRepo($this->getDbService());
        }

        return $this->webcamService;
    }

    // endregion


    // region vertical map

    function getVerticalMapService(): IVerticalMapService {
        if (!isset($this->verticalMapService)) {
            $this->verticalMapService = new VerticalMapService(
                $this->getTerrainService(),
                $this->getAirspaceService()
            );
        }

        return $this->verticalMapService;
    }

    // endregion


    // region export

    function getExportService(): IExportService {
        if (!isset($this->exportService)) {
            $this->exportService = new FileExportService(
                $this->getFileService(),
                new NavplanPdfBuilder(),
                new NavplanKmlBuilder(),
                new NavplanGpxBuilder(),
                new NavplanFplBuilder(),
                new NavplanExcelBuilder()
            );
        }

        return $this->exportService;
    }

    // endregion


    // region track

    function getTrackService(): ITrackService {
        if (!isset($this->trackService)) {
            $this->trackService = new TrackService(
                $this->getTokenService(),
                new DbTrackRepo($this->getDbService())
            );
        }

        return $this->trackService;
    }

    // endregion
}
