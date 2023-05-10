<?php declare(strict_types=1);

namespace Navplan\Config;

use Navplan\MeteoDwd\DomainService\IMeteoDwdConfig;
use Navplan\Notam\DomainService\INotamConfig;
use Navplan\OpenAip\Config\IOpenAipConfig;
use Navplan\System\DomainService\ISystemConfig;
use Navplan\System\MySqlDb\IDbConfig;
use Navplan\Terrain\DomainService\ITerrainConfig;
use Navplan\Traffic\AdsbexService\IAdsbexConfig;
use Navplan\User\DomainService\ITokenConfig;


interface IConfigDiContainer extends IDbConfig, IOpenAipConfig, IAdsbexConfig, INotamConfig,
    ITokenConfig, IMeteoDwdConfig, ITerrainConfig, ISystemConfig
{
}
