<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the VerticalMap module.
 * Replaces the former ProdVerticalMapDiContainer.
 */

use Navplan\VerticalMap\Domain\Service\IVerticalMapService;
use Navplan\VerticalMap\Domain\Service\VerticalMapService;
use Navplan\VerticalMap\Rest\Service\VerticalMapController;
use function DI\autowire;

return [
    IVerticalMapService::class => autowire(VerticalMapService::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    VerticalMapController::class => autowire(),
];

