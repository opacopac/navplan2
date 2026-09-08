<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the MeteoRadar module.
 * Replaces the former ProdMeteoRadarImagesDiContainer.
 */

use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesRepo;
use Navplan\MeteoRadar\FileSystem\Service\FileSystemRadarImagesRepo;
use Navplan\MeteoRadar\Rest\Service\MeteoRadarImageController;
use function DI\autowire;

return [
    // IMeteoRadarImagesRepo has no external facade getter (only used internally
    // by MeteoRadarImageController), but the binding is still needed for autowiring.
    IMeteoRadarImagesRepo::class => autowire(FileSystemRadarImagesRepo::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    MeteoRadarImageController::class => autowire(),
];

