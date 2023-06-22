<?php declare(strict_types=1);

namespace Navplan\Config\IniFile\Service;

use InvalidArgumentException;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdConfig;
use Navplan\Notam\DomainService\INotamConfig;
use Navplan\OpenAip\Config\IOpenAipConfig;
use Navplan\System\DomainModel\LogLevel;
use Navplan\System\DomainService\ISystemConfig;
use Navplan\System\MySqlDb\DbCredentials;
use Navplan\System\MySqlDb\IDbConfig;
use Navplan\Terrain\DomainService\ITerrainConfig;
use Navplan\Traffic\AdsbexService\IAdsbexConfig;
use Navplan\User\DomainModel\TokenCredentials;
use Navplan\User\DomainService\ITokenConfig;


class IniFileConfig implements IDbConfig, ITokenConfig, IOpenAipConfig, IAdsbexConfig,
    INotamConfig, IMeteoDwdConfig, ITerrainConfig, ISystemConfig {
    private readonly DbCredentials $credentials;
    private readonly TokenCredentials $tokenCredentials;
    private readonly string $icaoApiKey;
    private readonly string $adsbExchangeApiKey;
    private readonly string $openAipClientIdToken;
    private readonly string $meteoDwdBaseDir;
    private readonly string $terrainTilesBaseDir;
    private readonly string $tmpDir;
    private readonly string $logDir;
    private readonly string $logFile;
    private readonly int $logLevel;


    public function __construct(string $iniFile) {
        $iniValues = parse_ini_file($iniFile, false);
        if ($iniValues === false) {
            throw new InvalidArgumentException("error parsing config file '" . $iniFile . "'");
        }

        $this->credentials = new DbCredentials(
            $iniValues['db']['host'],
            $iniValues['db']['user'],
            $iniValues['db']['pw'],
            $iniValues['db']['name']
        );
        $this->tokenCredentials = new TokenCredentials(
            $iniValues['jwt']['secret'],
            $iniValues['jwt']['issuer']
        );
        $this->icaoApiKey = $iniValues['icao_api_key'];
        $this->adsbExchangeApiKey = $iniValues['adsbexchange_api_key'];
        $this->openAipClientIdToken = $iniValues['openaip_client_id_token'];
        $this->meteoDwdBaseDir = $iniValues['meteo_dwd_base_dir'];
        $this->terrainTilesBaseDir = $iniValues['terrain_tiles_base_dir'];
        $this->tmpDir = $iniValues['tmp_dir'];
        $this->logDir = $iniValues['log_dir'];
        $this->logFile = $iniValues['log_file'];
        $this->logLevel = LogLevel::fromString($iniValues['log_level']);
    }


    public function getCredentials(): DbCredentials {
        return $this->credentials;
    }


    public function getTokenCredentials(): TokenCredentials {
        return $this->tokenCredentials;
    }


    public function getIcaoApiKey(): string {
        return $this->icaoApiKey;
    }


    public function getAdsbExchangeApiKey(): string {
        return $this->adsbExchangeApiKey;
    }


    public function getOpenAipClientIdToken(): string {
        return $this->openAipClientIdToken;
    }


    public function getMeteoDwdBaseDir(): string {
        return $this->meteoDwdBaseDir;
    }


    public function getTerrainTilesBaseDir(): string {
        return $this->terrainTilesBaseDir;
    }


    function getTempDir(): string {
        return $this->tmpDir;
    }


    function getLogDir(): string {
        return $this->logDir;
    }


    function getLogFile(): string {
        return $this->logFile;
    }


    function getLogLevel(): int {
        return $this->logLevel;
    }
}
