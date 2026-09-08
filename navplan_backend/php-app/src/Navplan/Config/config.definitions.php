<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Config module.
 * Replaces the container-registration part of ProdConfigDiContainer's usage
 * (ProdConfigDiContainer itself stays: it's a plain implementation, not a
 * private-Container wrapper, so there's nothing to "flatten away" here).
 */

use Navplan\Config\IConfigDiContainer;
use Navplan\Config\ProdConfigDiContainer;
use Navplan\AerodromeChart\Domain\Service\IAerodromeChartConfig;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastConfig;
use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesConfig;
use Navplan\OpenAip\Config\IOpenAipConfig;
use Navplan\System\Db\Domain\Model\IDbConfig;
use Navplan\System\Domain\Service\ISystemConfig;
use Navplan\Terrain\Domain\Service\ITerrainConfig;
use Navplan\Traffic\Adsbex\Service\IAdsbexConfig;
use Navplan\User\Domain\Service\ITokenConfig;
use function DI\autowire;
use function DI\get;

return [
    IConfigDiContainer::class => autowire(ProdConfigDiContainer::class),

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

