<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the MeteoGram module.
 * Replaces the former ProdMeteoGramDiContainer.
 */

use Navplan\MeteoGram\Domain\Service\CloudMeteoGramService;
use Navplan\MeteoGram\Domain\Service\ICloudMeteoGramService;
use Navplan\MeteoGram\Rest\Service\ReadCloudMeteogramController;
use function DI\autowire;

return [
    // ICloudMeteoGramService has no external facade getter (only used internally
    // by ReadCloudMeteogramController), but the binding is still needed for autowiring.
    ICloudMeteoGramService::class => autowire(CloudMeteoGramService::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    ReadCloudMeteogramController::class => autowire(),
];

