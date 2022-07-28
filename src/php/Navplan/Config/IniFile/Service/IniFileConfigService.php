<?php declare(strict_types=1);

namespace Navplan\Config\IniFile\Service;

use InvalidArgumentException;
use Navplan\Notam\DomainService\INotamConfigService;
use Navplan\OpenAip\Config\IOpenAipConfigService;
use Navplan\System\MySqlDb\DbCredentials;
use Navplan\System\MySqlDb\IDbConfigService;
use Navplan\Traffic\AdsbexService\IAdsbexConfigService;
use Navplan\User\DomainModel\TokenConfig;
use Navplan\User\DomainService\ITokenConfigService;


class IniFileConfigService implements IDbConfigService, ITokenConfigService, IOpenAipConfigService, IAdsbexConfigService, INotamConfigService {
    private readonly DbCredentials $credentials;
    private readonly TokenConfig $tokenConfig;
    private readonly string $icaoApiKey;
    private readonly string $adsbExchangeApiKey;
    private readonly string $openAipClientIdToken;


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
        $this->tokenConfig = new TokenConfig(
            $iniValues['jwt']['secret'],
            $iniValues['jwt']['issuer']
        );
        $this->icaoApiKey = $iniValues['icao_api_key'];
        $this->adsbExchangeApiKey = $iniValues['adsbexchange_api_key'];
        $this->openAipClientIdToken = $iniValues['openaip_client_id_token'];
    }


    public function getCredentials(): DbCredentials {
        return $this->credentials;
    }


    public function getTokenConfig(): TokenConfig {
        return $this->tokenConfig;
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
