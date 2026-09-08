<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the AerodromeCircuit module.
 * Replaces the former ProdAerodromeCircuitsDiContainer.
 */

use Navplan\AerodromeCircuit\Domain\Service\IAirportCircuitService;
use Navplan\AerodromeCircuit\Persistence\Repo\DbAirportCircuitRepo;
use Navplan\AerodromeCircuit\Rest\Controller\AdCircuitController;
use function DI\autowire;

return [
    IAirportCircuitService::class => autowire(DbAirportCircuitRepo::class),

    // Bound to the CONCRETE class, not IRestController (see webcam.definitions.php).
    AdCircuitController::class => autowire(),
];

