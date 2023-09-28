<?php declare(strict_types=1);

namespace Navplan\Config;

use Navplan\MeteoDwd\Domain\Service\IMeteoDwdConfig;
use Navplan\Notam\Domain\Service\INotamConfig;
use Navplan\OpenAip\Config\IOpenAipConfig;
use Navplan\System\Domain\Service\ISystemConfig;
use Navplan\System\MySqlDb\IDbConfig;
use Navplan\Terrain\Domain\Service\ITerrainConfig;
use Navplan\Traffic\Adsbex\Service\IAdsbexConfig;
use Navplan\User\Domain\Service\ITokenConfig;


interface IConfigDiContainer extends IDbConfig, IOpenAipConfig, IAdsbexConfig, INotamConfig,
    ITokenConfig, IMeteoDwdConfig, ITerrainConfig, ISystemConfig
{
}
