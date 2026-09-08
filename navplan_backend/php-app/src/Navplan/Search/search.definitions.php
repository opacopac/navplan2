<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Search module.
 * Replaces the former ProdSearchDiContainer.
 */

use Navplan\Search\Domain\Service\ISearchService;
use Navplan\Search\Domain\Service\SearchService;
use Navplan\Search\Rest\Service\SearchController;
use function DI\autowire;

return [
    // ISearchService has no external facade getter (only used internally by
    // SearchController), but the binding is still needed for autowiring.
    ISearchService::class => autowire(SearchService::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    SearchController::class => autowire(),
];

