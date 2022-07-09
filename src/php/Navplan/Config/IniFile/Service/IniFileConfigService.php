<?php declare(strict_types=1);

namespace Navplan\Config\IniFile\Service;

use InvalidArgumentException;
use Navplan\Config\Domain\Service\IConfigService;


class IniFileConfigService implements IConfigService {
    private readonly string $icaoApiKey;
    private readonly string $adsbExchangeApiKey;
    private readonly string $openAipClientIdToken;


    public function __construct(string $iniFile) {
        $iniValues = parse_ini_file($iniFile, false);
        if ($iniValues === false) {
            throw new InvalidArgumentException("error parsing config file '" . $iniFile . "'");
        }

        $this->icaoApiKey = $iniValues['icao_api_key'] ?? null;
        $this->adsbExchangeApiKey = $iniValues['adsbexchange_api_key'] ?? null;
        $this->openAipClientIdToken = $iniValues['openaip_client_id_token'] ?? null;
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
}
