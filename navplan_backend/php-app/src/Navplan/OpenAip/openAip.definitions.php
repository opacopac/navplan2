<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the OpenAip module.
 * Replaces the former ProdOpenAipDiContainer.
 */

use Navplan\OpenAip\ApiAdapter\Service\IOpenAipService;
use Navplan\OpenAip\ApiAdapter\Service\OpenAipService;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;
use Navplan\OpenAip\Importer\Service\OpenAipImporter;
use function DI\autowire;

return [
    // IOpenAipService has no external facade getter (only used internally by
    // OpenAipImporter), but the binding is still needed for autowiring.
    IOpenAipService::class => autowire(OpenAipService::class),

    IOpenAipImporter::class => autowire(OpenAipImporter::class),
];

