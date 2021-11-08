<?php declare(strict_types=1);

namespace Navplan;

require_once __DIR__ . "/../config.php";

use Navplan\Aerodrome\DbRepo\DbAirportChartRepo;
use Navplan\Aerodrome\DbRepo\DbAirportCircuitRepo;
use Navplan\Aerodrome\DbRepo\DbAirportRepo;
use Navplan\Aerodrome\DbRepo\DbReportingPointRepo;
use Navplan\Aerodrome\DomainService\IAirportChartRepo;
use Navplan\Aerodrome\DomainService\IAirportCircuitRepo;
use Navplan\Aerodrome\DomainService\IAirportRepo;
use Navplan\Aerodrome\DomainService\IReportingPointRepo;
use Navplan\Aerodrome\RestService\IAirportServiceDiContainer;
use Navplan\Enroute\DbRepo\DbAirspaceRepo;
use Navplan\Enroute\DbRepo\DbNavaidRepo;
use Navplan\Enroute\DomainService\IAirspaceRepo;
use Navplan\Enroute\DomainService\INavaidRepo;
use Navplan\Enroute\RestService\IAirspaceServiceDiContainer;
use Navplan\Enroute\RestService\INavaidServiceDiContainer;
use Navplan\Flightroute\DbRepo\DbFlightrouteRepo;
use Navplan\Flightroute\DomainService\IFlightrouteRepo;
use Navplan\Flightroute\RestService\IFlightrouteServiceDiContainer;
use Navplan\Flightroute\UseCase\CreateFlightroute\CreateFlightrouteUc;
use Navplan\Flightroute\UseCase\CreateFlightroute\ICreateFlightrouteUc;
use Navplan\Flightroute\UseCase\CreateSharedFlightroute\CreateSharedFlightrouteUc;
use Navplan\Flightroute\UseCase\CreateSharedFlightroute\ICreateSharedFlightrouteUc;
use Navplan\Flightroute\UseCase\DeleteFlightroute\DeleteFlightrouteUc;
use Navplan\Flightroute\UseCase\DeleteFlightroute\IDeleteFlightrouteUc;
use Navplan\Flightroute\UseCase\ReadFlightroute\IReadFlightrouteUc;
use Navplan\Flightroute\UseCase\ReadFlightroute\ReadFlightrouteUc;
use Navplan\Flightroute\UseCase\ReadFlightrouteList\IReadFlightrouteListUc;
use Navplan\Flightroute\UseCase\ReadFlightrouteList\ReadFlightrouteListUc;
use Navplan\Flightroute\UseCase\ReadSharedFlightroute\IReadSharedFlightrouteUc;
use Navplan\Flightroute\UseCase\ReadSharedFlightroute\ReadSharedFlightrouteUc;
use Navplan\Flightroute\UseCase\UpdateFlightroute\IUpdateFlightrouteUc;
use Navplan\Flightroute\UseCase\UpdateFlightroute\UpdateFlightrouteUc;
use Navplan\Geoname\DbRepo\DbGeonameRepo;
use Navplan\Geoname\DomainService\GeonameService;
use Navplan\Geoname\DomainService\IGeonameRepo;
use Navplan\Geoname\DomainService\IGeonameService;
use Navplan\Geoname\RestService\IGeonameServiceDiContainer;
use Navplan\MeteoSma\DbRepo\DbMeteoRepo;
use Navplan\MeteoSma\DomainService\IMeteoRepo;
use Navplan\MeteoSma\RestService\IMeteoServiceDiContainer;
use Navplan\MeteoSma\UseCase\ReadSmaMeasurements\IReadSmaMeasurementsUc;
use Navplan\MeteoSma\UseCase\ReadSmaMeasurements\ReadSmaMeasurementsUc;
use Navplan\Notam\DbRepo\DbNotamRepo;
use Navplan\Notam\DomainService\INotamRepo;
use Navplan\Notam\RestService\INotamServiceDiContainer;
use Navplan\Notam\UseCase\SearchNotam\ISearchNotamUc;
use Navplan\Notam\UseCase\SearchNotam\SearchNotamUc;
use Navplan\Search\RestService\ISearchServiceDiContainer;
use Navplan\Search\UseCase\SearchByPosition\ISearchByPositionUc;
use Navplan\Search\UseCase\SearchByPosition\SearchByPositionUc;
use Navplan\Search\UseCase\SearchByText\ISearchByTextUc;
use Navplan\Search\UseCase\SearchByText\SearchByTextUc;
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
use Navplan\Terrain\DomainService\ITerrainRepo;
use Navplan\Terrain\FileRepo\FileTerrainRepo;
use Navplan\Terrain\RestService\ITerrainDiContainer;
use Navplan\Terrain\UseCase\ReadElevationList\IReadElevationListUc;
use Navplan\Terrain\UseCase\ReadElevationList\ReadElevationListUc;
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
use Navplan\VerticalMap\UseCase\ReadVerticalMap\IReadVerticalMapUc;
use Navplan\VerticalMap\UseCase\ReadVerticalMap\ReadVerticalMapUc;
use Navplan\Webcam\DbRepo\DbWebcamRepo;
use Navplan\Webcam\DomainService\IWebcamRepo;
use Navplan\Webcam\RestService\IWebcamServiceDiContainer;


class ProdNavplanDiContainer implements ISystemDiContainer, IDbDiContainer, IFlightrouteServiceDiContainer,
    IGeonameServiceDiContainer, IMeteoServiceDiContainer, INotamServiceDiContainer, ISearchServiceDiContainer,
    ITerrainDiContainer, ITrafficServiceDiContainer, IUserServiceDiContainer, IAirportServiceDiContainer,
    IAirspaceServiceDiContainer, INavaidServiceDiContainer, IWebcamServiceDiContainer, IVerticalMapDiContainer
{
    // const
    private const LOG_LEVEL = LogLevel::INFO;
    private const LOG_DIR = __DIR__ . "/../../logs/";
    private const LOG_FILE = self::LOG_DIR . "navplan.log";
    private const LOG_FILE_OGN_LISTENER = self::LOG_DIR . "ogn_listener.log";
    private const TERRAIN_TILE_BASE_DIR = __DIR__ . '/../../../../navplan/terraintiles/';

    // airport
    private IAirportRepo $airportRepo;
    private IAirportChartRepo $airportChartRepo;
    private IAirportCircuitRepo $airportCircuitRepo;
    private IReportingPointRepo $reportingPointRepo;
    // airspace
    private IAirspaceRepo $airspaceRepo;
    // flightroute
    private IFlightrouteRepo $flightrouteRepo;
    private ICreateFlightrouteUc $createFlightrouteUc;
    private ICreateSharedFlightrouteUc $createSharedFlightrouteUc;
    private IDeleteFlightrouteUc $deleteFlightrouteUc;
    private IReadFlightrouteUc $readFlightrouteUc;
    private IReadFlightrouteListUc $readFlightrouteListUc;
    private IReadSharedFlightrouteUc $readSharedFlightrouteUc;
    private IUpdateFlightrouteUc $updateFlightrouteUc;
    // geoname
    private IGeonameRepo $geonameRepo;
    private IGeonameService $geonameService;
    // meteo sma
    private IMeteoRepo $meteoRepo;
    private IReadSmaMeasurementsUc $readSmaMeasurementsUc;
    // navaid
    private INavaidRepo $navaidRepo;
    // notam
    private INotamRepo $notamRepo;
    private ISearchNotamUc $searchNotamUc;
    // search
    private ISearchByPositionUc $searchByPositionUc;
    private ISearchByTextUc $searchByTextUc;
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
    private ITerrainRepo $terrainRepo;
    private IReadElevationListUc $readElevationListUc;
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
    private IWebcamRepo $webcamRepo;
    // vertical map
    private IVerticalMapService $verticalMapService;
    private IReadVerticalMapUc $readVerticalMapUc;


    public function __construct() {
    }


    // region airport

    public function getAirportRepo(): IAirportRepo {
        if (!isset($this->airportRepo)) {
            $this->airportRepo = new DbAirportRepo(
                $this->getDbService(),
                $this->getAirportChartRepo(),
                $this->getWebcamRepo()
            );
        }

        return $this->airportRepo;
    }


    function getAirportChartRepo(): IAirportChartRepo {
        if (!isset($this->airportChartRepo)) {
            $this->airportChartRepo = new DbAirportChartRepo($this->getDbService());
        }

        return $this->airportChartRepo;
    }


    function getAirportCircuitRepo(): IAirportCircuitRepo {
        if (!isset($this->airportCircuitRepo)) {
            $this->airportCircuitRepo = new DbAirportCircuitRepo($this->getDbService());
        }

        return $this->airportCircuitRepo;
    }


    public function getReportingPointRepo(): IReportingPointRepo {
        if (!isset($this->reportingPointRepo)) {
            $this->reportingPointRepo = new DbReportingPointRepo($this->getDbService());
        }

        return $this->reportingPointRepo;
    }

    // endregion


    // region open aip

    public function getAirspaceRepo(): IAirspaceRepo {
        if (!isset($this->airspaceRepo)) {
            $this->airspaceRepo = new DbAirspaceRepo($this->getDbService());
        }

        return $this->airspaceRepo;
    }

    // endregion


    // region flightroute

    public function getFlightrouteRepo(): IFlightrouteRepo {
        if (!isset($this->flightrouteRepo)) {
            $this->flightrouteRepo = new DbFlightrouteRepo($this->getDbService());
        }

        return $this->flightrouteRepo;
    }


    public function getCreateFlightrouteUc(): ICreateFlightrouteUc {
        if (!isset($this->createFlightrouteUc)) {
            $this->createFlightrouteUc = new CreateFlightrouteUc(
                $this->getFlightrouteRepo(),
                $this->getTokenService(),
                $this->getUserRepo()
            );
        }

        return $this->createFlightrouteUc;
    }


    public function getCreateSharedFlightrouteUc(): ICreateSharedFlightrouteUc {
        if (!isset($this->createSharedFlightrouteUc)) {
            $this->createSharedFlightrouteUc = new CreateSharedFlightrouteUc(
                $this->getFlightrouteRepo(),
                $this->getUserRepo()
            );
        }

        return $this->createSharedFlightrouteUc;
    }


    public function getDeleteFlightrouteUc(): IDeleteFlightrouteUc {
        if (!isset($this->deleteFlightrouteUc)) {
            $this->deleteFlightrouteUc = new DeleteFlightrouteUc(
                $this->getFlightrouteRepo(),
                $this->getTokenService(),
                $this->getUserRepo()
            );
        }

        return $this->deleteFlightrouteUc;
    }


    public function getReadFlightrouteUc(): IReadFlightrouteUc {
        if (!isset($this->readFlightrouteUc)) {
            $this->readFlightrouteUc = new ReadFlightrouteUc(
                $this->getFlightrouteRepo(),
                $this->getTokenService(),
                $this->getUserRepo()
            );
        }

        return $this->readFlightrouteUc;
    }


    public function getReadFlightrouteListUc(): IReadFlightrouteListUc {
        if (!isset($this->readFlightrouteListUc)) {
            $this->readFlightrouteListUc = new ReadFlightrouteListUc(
                $this->getFlightrouteRepo(),
                $this->getTokenService(),
                $this->getUserRepo()
            );
        }

        return $this->readFlightrouteListUc;
    }


    public function getReadSharedFlightrouteUc(): IReadSharedFlightrouteUc {
        if (!isset($this->readSharedFlightrouteUc)) {
            $this->readSharedFlightrouteUc = new ReadSharedFlightrouteUc($this->getFlightrouteRepo());
        }

        return $this->readSharedFlightrouteUc;
    }


    public function getUpdateFlightrouteUc(): IUpdateFlightrouteUc {
        if (!isset($this->updateFlightrouteUc)) {
            $this->updateFlightrouteUc = new UpdateFlightrouteUc(
                $this->getFlightrouteRepo(),
                $this->getTokenService(),
                $this->getUserRepo()
            );
        }

        return $this->updateFlightrouteUc;
    }

    // endregion


    // region geoname

    function getGeonameRepo(): IGeonameRepo {
        if (!isset($this->geonameRepo)) {
            $this->geonameRepo = new DbGeonameRepo($this->getDbService());
        }

        return $this->geonameRepo;
    }


    function getGeonameService(): IGeonameService {
        if (!isset($this->geonameService)) {
            $this->geonameService = new GeonameService(
                $this->getGeonameRepo(),
                $this->getTerrainRepo()
            );
        }

        return $this->geonameService;
    }

    // endregion


    // region meteo sma

    public function getMeteoRepo(): IMeteoRepo {
        if (!isset($this->meteoRepo)) {
            $this->meteoRepo = new DbMeteoRepo(
                $this->getDbService(),
                $this->getTimeService()
            );
        }

        return $this->meteoRepo;
    }


    public function getReadSmaMeasurementsUc(): IReadSmaMeasurementsUc {
        if (!isset($this->readSmaMeasurementsUc)) {
            $this->readSmaMeasurementsUc = new ReadSmaMeasurementsUc($this->getMeteoRepo());
        }

        return $this->readSmaMeasurementsUc;
    }

    // endregion


    // region navaid

    public function getNavaidRepo(): INavaidRepo {
        if (!isset($this->navaidRepo)) {
            $this->navaidRepo = new DbNavaidRepo($this->getDbService());
        }

        return $this->navaidRepo;
    }

    // endregion


    // region notam

    public function getNotamRepo(): INotamRepo {
        if (!isset($this->notamRepo)) {
            $this->notamRepo = new DbNotamRepo($this->getDbService());
        }

        return $this->notamRepo;
    }


    public function getSearchNotamUc(): ISearchNotamUc {
        if (!isset($this->searchNotamUc)) {
            $this->searchNotamUc = new SearchNotamUc($this->getNotamRepo());
        }

        return $this->searchNotamUc;
    }

    // endregion


    // region search

    function getSearchByPositionUc(): ISearchByPositionUc {
        if (!isset($this->searchByPositionUc)) {
            $this->searchByPositionUc = new SearchByPositionUc(
                $this->getSearchUserPointUc(),
                $this->getSearchNotamUc(),
                $this->getAirportRepo(),
                $this->getReportingPointRepo(),
                $this->getNavaidRepo(),
                $this->getGeonameService()
            );
        }

        return $this->searchByPositionUc;
    }


    function getSearchByTextUc(): ISearchByTextUc {
        if (!isset($this->searchByTextUc)) {
            $this->searchByTextUc = new SearchByTextUc(
                $this->getSearchUserPointUc(),
                $this->getAirportRepo(),
                $this->getReportingPointRepo(),
                $this->getNavaidRepo(),
                $this->getGeonameService()
            );
        }

        return $this->searchByTextUc;
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

    function getTerrainRepo(): ITerrainRepo {
        if (!isset($this->terrainRepo)) {
            $this->terrainRepo = new FileTerrainRepo(
                $this->getFileService(),
                self::TERRAIN_TILE_BASE_DIR
            );
        }

        return $this->terrainRepo;
    }


    function getReadElevationListUc(): IReadElevationListUc {
        if (!isset($this->readElevationListUc)) {
            $this->readElevationListUc = new ReadElevationListUc($this->getTerrainRepo());
        }

        return $this->readElevationListUc;
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

    public function getWebcamRepo(): IWebcamRepo {
        if (!isset($this->webcamRepo)) {
            $this->webcamRepo = new DbWebcamRepo($this->getDbService());
        }

        return $this->webcamRepo;
    }

    // endregion


    // region vertical map

    function getVerticalMapService(): IVerticalMapService {
        if (!isset($this->verticalMapService)) {
            $this->verticalMapService = new VerticalMapService(
                $this->getTerrainRepo(),
                $this->getAirspaceRepo()
            );
        }

        return $this->verticalMapService;
    }


    function getReadVerticalMapUc(): IReadVerticalMapUc {
        if (!isset($this->readVerticalMapUc)) {
            $this->readVerticalMapUc = new ReadVerticalMapUc(
                $this->getVerticalMapService()
            );
        }

        return $this->readVerticalMapUc;
    }

    // endregion
}
