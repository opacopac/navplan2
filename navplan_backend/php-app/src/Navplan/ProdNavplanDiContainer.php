<?php declare(strict_types=1);

namespace Navplan;

use Navplan\Admin\IAdminDiContainer;
use Navplan\Admin\ProdAdminDiContainer;
use Navplan\Aerodrome\IAerodromeDiContainer;
use Navplan\Aerodrome\ProdAerodromeDiContainer;
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
use Navplan\MeteoDwd\IMeteoDwdDiContainer;
use Navplan\MeteoDwd\ProdMeteoDwdDiContainer;
use Navplan\MeteoGram\IMeteoGramDiContainer;
use Navplan\MeteoGram\ProdMeteoGramDiContainer;
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
    private IConfigDiContainer $configDiContainer;
    private IAdminDiContainer $adminDiContainer;
    private IAerodromeDiContainer $aerodromeDiContainer;
    private IAirspaceDiContainer $airspaceDiContainer;
    private INavaidDiContainer $navaidDiContainer;
    private IFlightrouteDiContainer $flightrouteDiContainer;
    private IGeonameDiContainer $geonameDiContainer;
    private IMeteoDwdDiContainer $meteoDwdDiContainer;
    private IMeteoGramDiContainer $meteoGramDiContainer;
    private IMeteoSmaDiContainer $meteoSmaDiContainer;
    private INotamDiContainer $notamDiContainer;
    private IOpenAipDiContainer $openAipDiContainer;
    private ISearchDiContainer $searchDiContainer;
    private ISystemDiContainer $systemDiContainer;
    private IPersistenceDiContainer $persistenceDiContainer;
    private ITerrainDiContainer $terrainDiContainer;
    private ITrackDiContainer $trackDiContainer;
    private ITrafficDiContainer $trafficDiContainer;
    private IUserDiContainer $userDiContainer;
    private IVerticalMapDiContainer $verticalMapDiContainer;
    private IWebcamDiContainer $webcamDiContainer;
    private IExporterDiContainer $exporterDiContainer;


    public function __construct()
    {
    }


    public function getConfigDiContainer(): IConfigDiContainer
    {
        if (!isset($this->configDiContainer)) {
            $this->configDiContainer = new ProdConfigDiContainer();
        }

        return $this->configDiContainer;
    }


    public function getAdminDiContainer(): IAdminDiContainer
    {
        if (!isset($this->adminDiContainer)) {
            $this->adminDiContainer = new ProdAdminDiContainer(
                $this->getOpenAipDiContainer()->getOpenAipImporter()
            );
        }

        return $this->adminDiContainer;
    }


    public function getAerodromeDiContainer(): IAerodromeDiContainer
    {
        if (!isset($this->aerodromeDiContainer)) {
            $this->aerodromeDiContainer = new ProdAerodromeDiContainer(
                $this->getPersistenceDiContainer()->getDbService(),
                $this->getSystemDiContainer()->getLoggingService(),
                $this->getSystemDiContainer()->getHttpService()
            );
        }

        return $this->aerodromeDiContainer;
    }


    public function getAirspaceDiContainer(): IAirspaceDiContainer
    {
        if (!isset($this->airspaceDiContainer)) {
            $this->airspaceDiContainer = new ProdAirspaceDiContainer(
                $this->getSystemDiContainer()->getLoggingService(),
                $this->getPersistenceDiContainer()->getDbService(),
                $this->getSystemDiContainer()->getHttpService()
            );
        }

        return $this->airspaceDiContainer;
    }


    public function getNavaidDiContainer(): INavaidDiContainer
    {
        if (!isset($this->navaidDiContainer)) {
            $this->navaidDiContainer = new ProdNavaidDiContainer(
                $this->getSystemDiContainer()->getLoggingService(),
                $this->getPersistenceDiContainer()->getDbService(),
                $this->getSystemDiContainer()->getHttpService()
            );
        }

        return $this->navaidDiContainer;
    }


    public function getExportDiContainer(): IExporterDiContainer
    {
        if (!isset($this->exporterDiContainer)) {
            $this->exporterDiContainer = new ProdExportDiContainer(
                $this->getSystemDiContainer()->getFileService(),
                $this->getSystemDiContainer()->getHttpService()
            );
        }

        return $this->exporterDiContainer;
    }


    public function getFlightrouteDiContainer(): IFlightrouteDiContainer
    {
        if (!isset($this->flightrouteDiContainer)) {
            $this->flightrouteDiContainer = new ProdFlightrouteDiContainer(
                $this->getUserDiContainer()->getTokenService(),
                $this->getUserDiContainer()->getUserRepo(),
                $this->getPersistenceDiContainer()->getDbService(),
                $this->getSystemDiContainer()->getHttpService()
            );
        }

        return $this->flightrouteDiContainer;
    }


    function getGeonameDiContainer(): IGeonameDiContainer
    {
        if (!isset($this->geonameDiContainer)) {
            $this->geonameDiContainer = new ProdGeonameDiContainer(
                $this->getPersistenceDiContainer()->getDbService(),
                $this->getTerrainDiContainer()->getTerrainService(),
            );
        }

        return $this->geonameDiContainer;
    }


    function getMeteoDwdDiContainer(): IMeteoDwdDiContainer
    {
        if (!isset($this->meteoDwdDiContainer)) {
            $this->meteoDwdDiContainer = new ProdMeteoDwdDiContainer(
                $this->getSystemDiContainer()->getFileService(),
                $this->getSystemDiContainer()->getHttpService(),
                $this->getConfigDiContainer()
            );
        }

        return $this->meteoDwdDiContainer;
    }


    function getMeteoGramDiContainer(): IMeteoGramDiContainer
    {
        if (!isset($this->meteoGramDiContainer)) {
            $this->meteoGramDiContainer = new ProdMeteoGramDiContainer(
                $this->getSystemDiContainer()->getHttpService(),
                $this->getMeteoDwdDiContainer()->getMeteoDwdVerticalCloudRepo(),
                $this->getMeteoDwdDiContainer()->getMeteoDwdPrecipRepo(),
                $this->getMeteoDwdDiContainer()->getMeteoDwdTempRepo(),
                $this->getTerrainDiContainer()->getTerrainService()
            );
        }

        return $this->meteoGramDiContainer;
    }


    public function getMeteoSmaDiContainer(): IMeteoSmaDiContainer
    {
        if (!isset($this->meteoSmaDiContainer)) {
            $this->meteoSmaDiContainer = new ProdMeteoSmaDiContainer(
                $this->getPersistenceDiContainer()->getDbService(),
                $this->getSystemDiContainer()->getTimeService()
            );
        }

        return $this->meteoSmaDiContainer;
    }


    public function getNotamDiContainer(): INotamDiContainer
    {
        if (!isset($this->notamDiContainer)) {
            $this->notamDiContainer = new ProdNotamDiContainer(
                $this->getPersistenceDiContainer()->getDbService()
            );
        }

        return $this->notamDiContainer;
    }


    public function getOpenAipDiContainer(): IOpenAipDiContainer
    {
        if (!isset($this->openAipDiContainer)) {
            $this->openAipDiContainer = new ProdOpenAipDiContainer(
                $this->getAerodromeDiContainer()->getAirportService(),
                $this->getAirspaceDiContainer()->getAirspaceService(),
                $this->getNavaidDiContainer()->getNavaidService(),
                $this->getSystemDiContainer()->getLoggingService(),
                $this->getPersistenceDiContainer()->getDbService()
            );
        }

        return $this->openAipDiContainer;
    }


    public function getSearchDiContainer(): ISearchDiContainer
    {
        if (!isset($this->searchDiContainer)) {
            $this->searchDiContainer = new ProdSearchDiContainer(
                $this->getUserDiContainer()->getSearchUserPointUc(),
                $this->getAirspaceDiContainer()->getAirspaceService(),
                $this->getNotamDiContainer()->getNotamService(),
                $this->getAerodromeDiContainer()->getAirportService(),
                $this->getAerodromeDiContainer()->getReportingPointService(),
                $this->getNavaidDiContainer()->getNavaidService(),
                $this->getGeonameDiContainer()->getGeonameService(),
            );
        }

        return $this->searchDiContainer;
    }


    public function getSystemDiContainer(): ISystemDiContainer
    {
        if (!isset($this->systemDiContainer)) {
            $this->systemDiContainer = new ProdSystemDiContainer(
                $this->getConfigDiContainer(),
                $this->getConfigDiContainer()
            );
        }

        return $this->systemDiContainer;
    }


    public function getPersistenceDiContainer(): IPersistenceDiContainer
    {
        if (!isset($this->persistenceDiContainer)) {
            $this->persistenceDiContainer = new ProdPersistenceDiContainer(
                $this->getSystemDiContainer(),
                $this->getConfigDiContainer()
            );
        }

        return $this->persistenceDiContainer;
    }


    public function getTerrainDiContainer(): ITerrainDiContainer
    {
        if (!isset($this->terrainDiContainer)) {
            $this->terrainDiContainer = new ProdTerrainDiContainer(
                $this->getSystemDiContainer()->getFileService(),
                $this->getConfigDiContainer()
            );
        }

        return $this->terrainDiContainer;
    }


    public function getTrackDiContainer(): ITrackDiContainer
    {
        if (!isset($this->trackDiContainer)) {
            $this->trackDiContainer = new ProdTrackDiContainer(
                $this->getUserDiContainer()->getTokenService(),
                $this->getPersistenceDiContainer()->getDbService()
            );
        }

        return $this->trackDiContainer;
    }


    public function getTrafficDiContainer(): ITrafficDiContainer
    {
        if (!isset($this->trafficDiContainer)) {
            $this->trafficDiContainer = new ProdTrafficDiContainer(
                $this->getSystemDiContainer()->getFileService(),
                $this->getSystemDiContainer()->getTimeService(),
                $this->getSystemDiContainer()->getProcService(),
                $this->getSystemDiContainer()->getLoggingService(),
                $this->getPersistenceDiContainer()->getDbService()
            );
        }

        return $this->trafficDiContainer;
    }


    public function getUserDiContainer(): IUserDiContainer
    {
        if (!isset($this->userDiContainer)) {
            $this->userDiContainer = new ProdUserDiContainer(
                $this->getPersistenceDiContainer()->getDbService(),
                $this->getSystemDiContainer()->getMailService(),
                $this->getConfigDiContainer(),
                $this->getSystemDiContainer()->getLoggingService()
            );
        }

        return $this->userDiContainer;
    }


    public function getVerticalMapDiContainer(): IVerticalMapDiContainer
    {
        if (!isset($this->verticalMapDiContainer)) {
            $this->verticalMapDiContainer = new ProdVerticalMapDiContainer(
                $this->getTerrainDiContainer()->getTerrainService(),
                $this->getAirspaceDiContainer()->getAirspaceService(),
                $this->getMeteoDwdDiContainer()->getMeteoDwdVerticalCloudRepo(),
                $this->getMeteoDwdDiContainer()->getMeteoDwdVerticalWindRepo(),
                $this->getSystemDiContainer()->getHttpService(),
            );
        }

        return $this->verticalMapDiContainer;
    }


    public function getWebcamDiContainer(): IWebcamDiContainer
    {
        if (!isset($this->webcamDiContainer)) {
            $this->webcamDiContainer = new ProdWebcamDiContainer(
                $this->getPersistenceDiContainer()->getDbService()
            );
        }

        return $this->webcamDiContainer;
    }
}
