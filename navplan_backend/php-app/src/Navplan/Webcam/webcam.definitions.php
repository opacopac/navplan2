<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Webcam module.
 * Replaces the former ProdWebcamDiContainer.
 */

use Navplan\Webcam\Domain\Query\IWebcamByExtentQuery;
use Navplan\Webcam\Domain\Query\IWebcamByIcaoQuery;
use Navplan\Webcam\Persistence\Query\DbWebcamByExtentQuery;
use Navplan\Webcam\Persistence\Query\DbWebcamByIcaoQuery;
use Navplan\Webcam\Rest\Service\WebcamController;
use function DI\autowire;

return [
    IWebcamByExtentQuery::class => autowire(DbWebcamByExtentQuery::class),
    IWebcamByIcaoQuery::class => autowire(DbWebcamByIcaoQuery::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface:
    // every module has its own controller implementing IRestController, so
    // binding the shared interface here would collide with every other module's
    // controller binding once all definitions are merged into one container.
    WebcamController::class => autowire(),
];

