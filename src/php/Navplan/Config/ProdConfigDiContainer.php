<?php declare(strict_types=1);

namespace Navplan\Config;

use Navplan\Config\IniFile\Service\IniFileConfigService;
use Navplan\System\MySqlDb\DbCredentials;
use Navplan\User\DomainModel\TokenConfig;


class ProdConfigDiContainer implements IConfigDiContainer
{
    public const CONFIG_FILE = __DIR__ . "/../../config/navplan_prod.ini";

    private IniFileConfigService $configService;


    public function __construct() {
    }


    public function getCredentials(): DbCredentials {
        return $this->getConfigService()->getCredentials();
    }


    public function getOpenAipClientIdToken(): string {
        return $this->getConfigService()->getOpenAipClientIdToken();
    }


    public function getAdsbExchangeApiKey(): string {
        return $this->getConfigService()->getAdsbExchangeApiKey();
    }


    public function getIcaoApiKey(): string {
        return $this->getConfigService()->getIcaoApiKey();
    }


    function getTokenConfig(): TokenConfig {
        return $this->getConfigService()->getTokenConfig();
    }


    function getMeteoDwdBaseDir(): string {
        return $this->getConfigService()->getMeteoDwdBaseDir();
    }

    function getTerrainTilesBaseDir(): string {
        return $this->getConfigService()->getTerrainTilesBaseDir();
    }


    private function getConfigService(): IniFileConfigService {
        if (!isset($this->configService)) {
            $this->configService = new IniFileConfigService(self::CONFIG_FILE);
        }

        return $this->configService;
    }
}
