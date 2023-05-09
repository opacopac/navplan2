<?php declare(strict_types=1);

namespace Navplan\Config;

use Navplan\MeteoDwd\DomainService\IMeteoDwdConfigService;
use Navplan\Notam\DomainService\INotamConfigService;
use Navplan\OpenAip\Config\IOpenAipConfigService;
use Navplan\System\MySqlDb\IDbConfigService;
use Navplan\Terrain\DomainService\ITerrainConfigService;
use Navplan\Traffic\AdsbexService\IAdsbexConfigService;
use Navplan\User\DomainService\ITokenConfigService;


interface IConfigDiContainer extends IDbConfigService, IOpenAipConfigService, IAdsbexConfigService, INotamConfigService,
    ITokenConfigService, IMeteoDwdConfigService, ITerrainConfigService
{
}
