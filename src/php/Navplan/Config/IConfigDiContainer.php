<?php declare(strict_types=1);

namespace Navplan\Config;

use Navplan\Notam\DomainService\INotamConfigService;
use Navplan\OpenAip\Config\IOpenAipConfigService;
use Navplan\System\MySqlDb\DbCredentials;
use Navplan\System\MySqlDb\IDbConfigService;
use Navplan\Traffic\AdsbexService\IAdsbexConfigService;
use Navplan\User\DomainModel\TokenConfig;
use Navplan\User\DomainService\ITokenConfigService;


interface IConfigDiContainer extends IDbConfigService, IOpenAipConfigService, IAdsbexConfigService, INotamConfigService, ITokenConfigService
{
    function getCredentials(): DbCredentials;

    function getOpenAipClientIdToken(): string;

    function getAdsbExchangeApiKey(): string;

    function getIcaoApiKey(): string;

    function getTokenConfig(): TokenConfig;
}
