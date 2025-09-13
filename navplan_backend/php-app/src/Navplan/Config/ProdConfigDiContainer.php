<?php declare(strict_types=1);

namespace Navplan\Config;

use Navplan\Config\IniFile\Service\IniFileConfig;
use Navplan\System\Db\MySql\DbCredentials;
use Navplan\User\Domain\Model\TokenCredentials;


class ProdConfigDiContainer implements IConfigDiContainer
{
    public const CONFIG_FILE = __DIR__ . "/../../config/navplan_prod.ini";

    private IniFileConfig $iniFileConfig;


    public function __construct()
    {
    }


    public function getCredentials(): DbCredentials
    {
        return $this->getIniFileConfig()->getCredentials();
    }


    public function getOpenAipApiKey(): string
    {
        return $this->getIniFileConfig()->getOpenAipApiKey();
    }


    public function getAdsbExchangeApiKey(): string
    {
        return $this->getIniFileConfig()->getAdsbExchangeApiKey();
    }


    public function getIcaoApiKey(): string
    {
        return $this->getIniFileConfig()->getIcaoApiKey();
    }


    public function getTokenCredentials(): TokenCredentials
    {
        return $this->getIniFileConfig()->getTokenCredentials();
    }


    public function getMeteoForecastBaseDir(): string
    {
        return $this->getIniFileConfig()->getMeteoForecastBaseDir();
    }


    public function getTerrainTilesBaseDir(): string
    {
        return $this->getIniFileConfig()->getTerrainTilesBaseDir();
    }


    public function getChartBaseDir(): string
    {
        return $this->getIniFileConfig()->getChartBaseDir();
    }


    public function getTempDir(): string
    {
        return $this->getIniFileConfig()->getTempDir();
    }


    public function getLogDir(): string
    {
        return $this->getIniFileConfig()->getLogDir();
    }


    public function getLogFile(): string
    {
        return $this->getIniFileConfig()->getLogFile();
    }


    public function getLogLevel(): int
    {
        return $this->getIniFileConfig()->getLogLevel();
    }


    private function getIniFileConfig(): IniFileConfig
    {
        if (!isset($this->iniFileConfig)) {
            $this->iniFileConfig = new IniFileConfig(self::CONFIG_FILE);
        }

        return $this->iniFileConfig;
    }
}
