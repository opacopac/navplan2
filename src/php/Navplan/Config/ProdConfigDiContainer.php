<?php declare(strict_types=1);

namespace Navplan\Config;

use Navplan\Config\IniFile\Service\IniFileConfig;
use Navplan\System\MySqlDb\DbCredentials;
use Navplan\User\DomainModel\TokenCredentials;


class ProdConfigDiContainer implements IConfigDiContainer
{
    public const CONFIG_FILE = __DIR__ . "/../../config/navplan_prod.ini";

    private IniFileConfig $iniFileConfig;


    public function __construct() {
    }


    public function getCredentials(): DbCredentials {
        return $this->getIniFileConfig()->getCredentials();
    }


    public function getOpenAipClientIdToken(): string {
        return $this->getIniFileConfig()->getOpenAipClientIdToken();
    }


    public function getAdsbExchangeApiKey(): string {
        return $this->getIniFileConfig()->getAdsbExchangeApiKey();
    }


    public function getIcaoApiKey(): string {
        return $this->getIniFileConfig()->getIcaoApiKey();
    }


    function getTokenCredentials(): TokenCredentials {
        return $this->getIniFileConfig()->getTokenCredentials();
    }


    function getMeteoDwdBaseDir(): string {
        return $this->getIniFileConfig()->getMeteoDwdBaseDir();
    }


    function getTerrainTilesBaseDir(): string {
        return $this->getIniFileConfig()->getTerrainTilesBaseDir();
    }


    function getTempDir(): string {
        return $this->getIniFileConfig()->getTempDir();
    }


    function getLogDir(): string {
        return $this->getIniFileConfig()->getLogDir();
    }


    function getLogFile(): string {
        return $this->getIniFileConfig()->getLogFile();
    }


    function getLogLevel(): int {
        return $this->getIniFileConfig()->getLogLevel();
    }


    private function getIniFileConfig(): IniFileConfig {
        if (!isset($this->iniFileConfig)) {
            $this->iniFileConfig = new IniFileConfig(self::CONFIG_FILE);
        }

        return $this->iniFileConfig;
    }
}
