<?php declare(strict_types=1);

namespace Navplan\Config;

use Navplan\Notam\DomainService\INotamConfigService;
use Navplan\OpenAip\Config\IOpenAipConfigService;
use Navplan\System\MySqlDb\DbCredentials;
use Navplan\System\MySqlDb\IDbConfigService;
use Navplan\Traffic\AdsbexService\IAdsbexConfigService;


interface IConfigDiContainer extends IDbConfigService, IOpenAipConfigService, IAdsbexConfigService, INotamConfigService
{
    public function getCredentials(): DbCredentials;

    public function getOpenAipClientIdToken(): string;

    public function getAdsbExchangeApiKey(): string;

    public function getIcaoApiKey(): string;
}
