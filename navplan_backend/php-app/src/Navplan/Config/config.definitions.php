<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Config module.
 * IConfigDiContainer is bound directly to IniFileConfig, which implements
 * every narrow config interface IConfigDiContainer extends - no separate
 * Prod/wrapper class needed (see IniFileConfig's class doc comment).
 */

use Navplan\Config\IConfigDiContainer;
use Navplan\Config\IniFile\Service\IniFileConfig;
use Navplan\AerodromeChart\Domain\Service\IAerodromeChartConfig;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastConfig;
use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesConfig;
use Navplan\OpenAip\Config\IOpenAipConfig;
use Navplan\System\Db\Domain\Model\IDbConfig;
use Navplan\System\Domain\Service\ISystemConfig;
use Navplan\Terrain\Domain\Service\ITerrainConfig;
use Navplan\Traffic\Adsbex\Service\IAdsbexConfig;
use Navplan\User\Domain\Service\ITokenConfig;
use function DI\factory;
use function DI\get;

return [
    IConfigDiContainer::class => factory(function () {
        return new IniFileConfig(__DIR__ . '/../../config/navplan_prod.ini');
    }),

    // IConfigDiContainer extends several narrow config interfaces (ISystemConfig,
    // IDbConfig, ...). Alias them to the same instance so modules can depend on
    // the narrow interface directly instead of the broad IConfigDiContainer.
    ISystemConfig::class => get(IConfigDiContainer::class),
    IDbConfig::class => get(IConfigDiContainer::class),
    IAerodromeChartConfig::class => get(IConfigDiContainer::class),
    IMeteoForecastConfig::class => get(IConfigDiContainer::class),
    IMeteoRadarImagesConfig::class => get(IConfigDiContainer::class),
    IOpenAipConfig::class => get(IConfigDiContainer::class),
    ITerrainConfig::class => get(IConfigDiContainer::class),
    IAdsbexConfig::class => get(IConfigDiContainer::class),
    ITokenConfig::class => get(IConfigDiContainer::class),
];

