<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the MetarTaf module.
 * Replaces the former ProdMetarTafDiContainer.
 */

use Navplan\MetarTaf\Domain\Service\IMetarTafService;
use Navplan\MetarTaf\Domain\Service\MetarTafService;
use Navplan\MetarTaf\Rest\Service\ReadMetarTafController;
use function DI\autowire;

return [
    IMetarTafService::class => autowire(MetarTafService::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    ReadMetarTafController::class => autowire(),
];

