<?php declare(strict_types=1);

namespace Navplan\Config\IniFile\Service;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Service\IAerodromeChartConfig;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdConfig;
use Navplan\Notam\Domain\Service\INotamConfig;
use Navplan\OpenAip\Config\IOpenAipConfig;
use Navplan\System\Db\Domain\Model\IDbConfig;
use Navplan\System\Db\MySql\DbCredentials;
use Navplan\System\Domain\Model\LogLevel;
use Navplan\System\Domain\Service\ISystemConfig;
use Navplan\Terrain\Domain\Service\ITerrainConfig;
use Navplan\Traffic\Adsbex\Service\IAdsbexConfig;
use Navplan\User\Domain\Model\TokenCredentials;
use Navplan\User\Domain\Service\ITokenConfig;


class IniFileConfig implements IDbConfig, ITokenConfig, IOpenAipConfig, IAdsbexConfig,
    INotamConfig, IMeteoDwdConfig, ITerrainConfig, IAerodromeChartConfig, ISystemConfig {
    private readonly DbCredentials $credentials;
    private readonly TokenCredentials $tokenCredentials;
    private readonly string $icaoApiKey;
    private readonly string $adsbExchangeApiKey;
    private readonly string $openAipApiKey;
    private readonly string $meteoDwdBaseDir;
    private readonly string $terrainTilesBaseDir;
    private readonly string $chartBaseDir;
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
        $this->openAipApiKey = $iniValues['openaip_api_key'];
        $this->meteoDwdBaseDir = $iniValues['meteo_dwd_base_dir'];
        $this->terrainTilesBaseDir = $iniValues['terrain_tiles_base_dir'];
        $this->chartBaseDir = $iniValues['chart_base_dir'];
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


    public function getOpenAipApiKey(): string {
        return $this->openAipApiKey;
    }


    public function getMeteoDwdBaseDir(): string {
        return $this->meteoDwdBaseDir;
    }


    public function getTerrainTilesBaseDir(): string {
        return $this->terrainTilesBaseDir;
    }


    public function getChartBaseDir(): string {
        return $this->chartBaseDir;
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
