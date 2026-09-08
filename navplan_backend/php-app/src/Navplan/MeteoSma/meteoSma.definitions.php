<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the MeteoSma module.
 * Replaces the former ProdMeteoSmaDiContainer.
 */

use Navplan\MeteoSma\Domain\Service\IMeteoSmaService;
use Navplan\MeteoSma\Persistence\Service\DbMeteoSmaRepo;
use Navplan\MeteoSma\Rest\Service\MeteoSmaController;
use function DI\autowire;

return [
    IMeteoSmaService::class => autowire(DbMeteoSmaRepo::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    MeteoSmaController::class => autowire(),
];

