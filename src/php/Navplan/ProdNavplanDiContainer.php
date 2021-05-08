<?php declare(strict_types=1);

namespace Navplan;

require_once __DIR__ . "/../config.php";

use Navplan\Charts\DbRepo\ChartDbRepo;
use Navplan\Charts\DomainService\IChartRepo;
use Navplan\Charts\RestService\IChartServiceDiContainer;
use Navplan\Charts\UseCase\SearchByIcao\ISearchChartByIcaoUc;
use Navplan\Charts\UseCase\SearchByIcao\SearchChartByIcaoUc;
use Navplan\Charts\UseCase\SearchById\ISearchChartByIdUc;
use Navplan\Charts\UseCase\SearchById\SearchChartByIdUc;
use Navplan\Db\DomainService\IDbService;
use Navplan\Db\MySqlDb\IDbDiContainer;
use Navplan\Db\MySqlDb\MySqlDbService;
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
use Navplan\Geoname\DomainService\IGeonameRepo;
use Navplan\Geoname\RestService\IGeonameServiceDiContainer;
use Navplan\Geoname\UseCase\SearchGeoname\ISearchGeonameUc;
use Navplan\Geoname\UseCase\SearchGeoname\SearchGeonameUc;
use Navplan\Ivao\DbRepo\CircuitDbRepo;
use Navplan\Ivao\DomainService\ICircuitRepo;
use Navplan\Ivao\UseCase\SearchCircuit\ISearchCircuitUc;
use Navplan\Ivao\UseCase\SearchCircuit\SearchCircuitUc;
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
use Navplan\OpenAip\DbRepo\DbAirportRepo;
use Navplan\OpenAip\DbRepo\DbAirspaceRepo;
use Navplan\OpenAip\DbRepo\DbNavaidRepo;
use Navplan\OpenAip\DbRepo\DbReportingPointRepo;
use Navplan\OpenAip\DbRepo\DbWebcamRepo;
use Navplan\OpenAip\DomainService\IAirportRepo;
use Navplan\OpenAip\DomainService\IAirspaceRepo;
use Navplan\OpenAip\DomainService\INavaidRepo;
use Navplan\OpenAip\DomainService\IReportingPointRepo;
use Navplan\OpenAip\DomainService\IWebcamRepo;
use Navplan\OpenAip\RestService\IOpenAipServiceDiContainer;
use Navplan\OpenAip\UseCase\SearchAirport\ISearchAirportUc;
use Navplan\OpenAip\UseCase\SearchAirport\SearchAirportUc;
use Navplan\OpenAip\UseCase\SearchAirspace\ISearchAirspaceUc;
use Navplan\OpenAip\UseCase\SearchAirspace\SearchAirspaceUc;
use Navplan\OpenAip\UseCase\SearchNavaid\ISearchNavaidUc;
use Navplan\OpenAip\UseCase\SearchNavaid\SearchNavaidUc;
use Navplan\OpenAip\UseCase\SearchOpenAipItem\ISearchOpenAipItemsUc;
use Navplan\OpenAip\UseCase\SearchOpenAipItem\SearchOpenAipItemsUc;
use Navplan\OpenAip\UseCase\SearchReportingPoint\ISearchReportingPointUc;
use Navplan\OpenAip\UseCase\SearchReportingPoint\SearchReportingPointUc;
use Navplan\OpenAip\UseCase\SearchWebcam\ISearchWebcamUc;
use Navplan\OpenAip\UseCase\SearchWebcam\SearchWebcamUc;
use Navplan\Search\RestService\ISearchServiceDiContainer;
use Navplan\Search\UseCase\SearchByExtent\ISearchByExtentUc;
use Navplan\Search\UseCase\SearchByExtent\SearchByExtentUc;
use Navplan\Search\UseCase\SearchByIcao\ISearchByIcaoUc;
use Navplan\Search\UseCase\SearchByIcao\SearchByIcaoUc;
use Navplan\Search\UseCase\SearchByPosition\ISearchByPositionUc;
use Navplan\Search\UseCase\SearchByPosition\SearchByPositionUc;
use Navplan\Search\UseCase\SearchByText\ISearchByTextUc;
use Navplan\Search\UseCase\SearchByText\SearchByTextUc;
use Navplan\System\DomainModel\LogLevel;
use Navplan\System\DomainService\IFileService;
use Navplan\System\DomainService\IHttpService;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\DomainService\IMailService;
use Navplan\System\DomainService\IProcService;
use Navplan\System\DomainService\ISystemServiceFactory;
use Navplan\System\DomainService\ITimeService;
use Navplan\System\Posix\ISystemDiContainer;
use Navplan\System\Posix\LoggingService;
use Navplan\System\Posix\SystemServiceFactory;
use Navplan\Terrain\DomainService\ITerrainRepo;
use Navplan\Terrain\FileRepo\FileTerrainRepo;
use Navplan\Terrain\RestService\ITerrainDiContainer;
use Navplan\Terrain\UseCase\ReadElevation\IReadElevationUc;
use Navplan\Terrain\UseCase\ReadElevation\ReadElevationUc;
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


class ProdNavplanDiContainer implements ISystemDiContainer, IDbDiContainer, IFlightrouteServiceDiContainer, IGeonameServiceDiContainer,
    IMeteoServiceDiContainer, INotamServiceDiContainer, IOpenAipServiceDiContainer, ISearchServiceDiContainer, ITerrainDiContainer,
    ITrafficServiceDiContainer, IUserServiceDiContainer, IChartServiceDiContainer {
    // const
    private const LOG_LEVEL = LogLevel::DEBUG;
    private const LOG_DIR = __DIR__ . "/../../logs/";
    private const LOG_FILE = self::LOG_DIR . "navplan.log";
    private const LOG_FILE_OGN_LISTENER = self::LOG_DIR . "ogn_listener.log";
    // system
    private ISystemServiceFactory $systemServiceFactory;
    private IHttpService $httpService;
    private IFileService $fileService;
    private IMailService $mailService;
    private ITimeService $timeService;
    private IProcService $procService;
    private ILoggingService $screenLogger;
    private ILoggingService $fileLogger;
    // db
    private IDbService $dbService;
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
    private ISearchGeonameUc $searchGeonameUc;
    // ivao
    private ICircuitRepo $circuitRepo;
    private ISearchCircuitUc $searchCircuitUc;
    // meteo sma
    private IMeteoRepo $meteoRepo;
    private IReadSmaMeasurementsUc $readSmaMeasurementsUc;
    // notam
    private INotamRepo $notamRepo;
    private ISearchNotamUc $searchNotamUc;
    // open aip
    private IAirportRepo $airportRepo;
    private IAirspaceRepo $airspaceRepo;
    private INavaidRepo $navaidRepo;
    private IReportingPointRepo $reportingPointRepo;
    private IWebcamRepo $webcamRepo;
    private ISearchAirportUc $searchAirportUc;
    private ISearchAirspaceUc $searchAirspaceUc;
    private ISearchNavaidUc $searchNavaidUc;
    private ISearchOpenAipItemsUc $searchOpenAipItemsUc;
    private ISearchReportingPointUc $searchReportingPointUc;
    private ISearchWebcamUc $searchWebcamUc;
    // search
    private ISearchByExtentUc $searchByExtentUc;
    private ISearchByPositionUc $searchByPositionUc;
    private ISearchByIcaoUc $searchByIcaoUc;
    private ISearchByTextUc $searchByTextUc;
    // terrain
    private ITerrainRepo $terrainRepo;
    private IReadElevationUc $readElevationUc;
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
    // charts
    private IChartRepo $chartRepo;
    private ISearchChartByIcaoUc $searchChartByIcaoUc;
    private ISearchChartByIdUc $searchChartByIdUc;


    public function __construct() {
    }


    public function __destruct() {
        if (isset($this->dbService) && $this->dbService->isOpen()) {
            $this->dbService->closeDb();
        }
    }


    // region system

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

    // endregion


    // region db

    public function getDbService(): IDbService {
        global $db_host, $db_user, $db_pw, $db_name;

        if (!isset($this->dbService)) {
            $this->dbService = MySqlDbService::getInstance();
            $this->dbService->init($db_host, $db_user, $db_pw, $db_name);
        }

        return $this->dbService;
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

    function getGeonameRepo(): IGeonameRepo{
        if (!isset($this->geonameRepo)) {
            $this->geonameRepo = new DbGeonameRepo($this->getDbService());
        }

        return $this->geonameRepo;
    }


    function getSearchGeonameUc(): ISearchGeonameUc{
        if (!isset($this->searchGeonameUc)) {
            $this->searchGeonameUc = new SearchGeonameUc(
                $this->getGeonameRepo(),
                $this->getTerrainRepo()
            );
        }

        return $this->searchGeonameUc;
    }

    // endregion


    // region ivao

    function getCircuitRepo(): ICircuitRepo {
        if (!isset($this->circuitRepo)) {
            $this->circuitRepo = new CircuitDbRepo($this->getDbService());
        }

        return $this->circuitRepo;
    }


    function getSearchCircuitUc(): ISearchCircuitUc {
        if (!isset($this->searchCircuitUc)) {
            $this->searchCircuitUc = new SearchCircuitUc($this->getCircuitRepo());
        }

        return $this->searchCircuitUc;
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


    // region open aip

    public function getAirportRepo(): IAirportRepo {
        if (!isset($this->airportRepo)) {
            $this->airportRepo = new DbAirportRepo($this->getDbService());
        }

        return $this->airportRepo;
    }


    public function getAirspaceRepo(): IAirspaceRepo {
        if (!isset($this->airspaceRepo)) {
            $this->airspaceRepo = new DbAirspaceRepo($this->getDbService());
        }

        return $this->airspaceRepo;
    }


    public function getNavaidRepo(): INavaidRepo {
        if (!isset($this->navaidRepo)) {
            $this->navaidRepo = new DbNavaidRepo($this->getDbService());
        }

        return $this->navaidRepo;
    }


    public function getReportingPointRepo(): IReportingPointRepo {
        if (!isset($this->reportingPointRepo)) {
            $this->reportingPointRepo = new DbReportingPointRepo($this->getDbService());
        }

        return $this->reportingPointRepo;
    }


    public function getWebcamRepo(): IWebcamRepo {
        if (!isset($this->webcamRepo)) {
            $this->webcamRepo = new DbWebcamRepo($this->getDbService());
        }

        return $this->webcamRepo;
    }


    public function getSearchAirportUc(): ISearchAirportUc {
        if (!isset($this->searchAirportUc)) {
            $this->searchAirportUc = new SearchAirportUc($this->getAirportRepo());
        }

        return $this->searchAirportUc;
    }


    public function getSearchAirspaceUc(): ISearchAirspaceUc {
        if (!isset($this->searchAirspaceUc)) {
            $this->searchAirspaceUc = new SearchAirspaceUc($this->getAirspaceRepo());
        }

        return $this->searchAirspaceUc;
    }


    public function getSearchNavaidUc(): ISearchNavaidUc {
        if (!isset($this->searchNavaidUc)) {
            $this->searchNavaidUc = new SearchNavaidUc($this->getNavaidRepo());
        }

        return $this->searchNavaidUc;
    }


    public function getSearchReportingPointUc(): ISearchReportingPointUc {
        if (!isset($this->searchReportingPointUc)) {
            $this->searchReportingPointUc = new SearchReportingPointUc($this->getReportingPointRepo());
        }

        return $this->searchReportingPointUc;
    }


    public function getSearchWebcamUc(): ISearchWebcamUc {
        if (!isset($this->searchWebcamUc)) {
            $this->searchWebcamUc = new SearchWebcamUc($this->getWebcamRepo());
        }

        return $this->searchWebcamUc;
    }


    public function getSearchOpenAipItemUc(): ISearchOpenAipItemsUc {
        if (!isset($this->searchOpenAipItemsUc)) {
            $this->searchOpenAipItemsUc = new SearchOpenAipItemsUc(
                $this->getSearchAirportUc(),
                $this->getSearchNavaidUc(),
                $this->getSearchReportingPointUc(),
                $this->getSearchWebcamUc(),
                $this->getSearchAirspaceUc()
            );
        }

        return $this->searchOpenAipItemsUc;
    }

    // endregion


    // region search

    function getSearchByExtentUc(): ISearchByExtentUc {
        if (!isset($this->searchByExtentUc)) {
            $this->searchByExtentUc = new SearchByExtentUc(
                $this->getSearchAirportUc(),
                $this->getSearchNavaidUc(),
                $this->getSearchAirspaceUc(),
                $this->getSearchReportingPointUc(),
                $this->getSearchUserPointUc(),
                $this->getSearchNotamUc(),
                $this->getSearchWebcamUc(),
                $this->getSearchCircuitUc()
            );
        }

        return $this->searchByExtentUc;
    }


    function getSearchByIcaoUc(): ISearchByIcaoUc {
        if (!isset($this->searchByIcaoUc)) {
            $this->searchByIcaoUc = new SearchByIcaoUc(
                $this->getSearchAirportUc(),
                $this->getSearchReportingPointUc(),
                $this->getSearchNotamUc()
            );
        }

        return $this->searchByIcaoUc;
    }


    function getSearchByPositionUc(): ISearchByPositionUc {
        if (!isset($this->searchByPositionUc)) {
            $this->searchByPositionUc = new SearchByPositionUc(
                $this->getSearchAirportUc(),
                $this->getSearchNavaidUc(),
                $this->getSearchReportingPointUc(),
                $this->getSearchUserPointUc(),
                $this->getSearchNotamUc(),
                $this->getSearchGeonameUc()
            );
        }

        return $this->searchByPositionUc;
    }


    function getSearchByTextUc(): ISearchByTextUc {
        if (!isset($this->searchByTextUc)) {
            $this->searchByTextUc = new SearchByTextUc(
                $this->getSearchAirportUc(),
                $this->getSearchNavaidUc(),
                $this->getSearchReportingPointUc(),
                $this->getSearchUserPointUc(),
                $this->getSearchGeonameUc()
            );
        }

        return $this->searchByTextUc;
    }

    // endregion


    // region terrain

    function getTerrainRepo(): ITerrainRepo {
        if (!isset($this->terrainRepo)) {
            $this->terrainRepo = new FileTerrainRepo($this->getFileService());
        }

        return $this->terrainRepo;
    }


    function getReadElevationUc(): IReadElevationUc {
        if (!isset($this->readElevationUc)) {
            $this->readElevationUc = new ReadElevationUc($this->getTerrainRepo());
        }

        return $this->readElevationUc;
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


    // region charts

    function getChartRepo(): IChartRepo {
        if (!isset($this->chartRepo)) {
            $this->chartRepo = new ChartDbRepo($this->getDbService());
        }

        return $this->chartRepo;
    }


    function getSearchChartByIcaoUc(): ISearchChartByIcaoUc {
        if (!isset($this->searchChartByIcaoUc)) {
            $this->searchChartByIcaoUc = new SearchChartByIcaoUc($this->getChartRepo());
        }

        return $this->searchChartByIcaoUc;
    }


    function getSearchChartByIdUc(): ISearchChartByIdUc {
        if (!isset($this->searchChartByIdUc)) {
            $this->searchChartByIdUc = new SearchChartByIdUc($this->getChartRepo());
        }

        return $this->searchChartByIdUc;
    }

    // endregion
}
