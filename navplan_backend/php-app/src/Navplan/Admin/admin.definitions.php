<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Admin module.
 * Replaces the former ProdAdminDiContainer.
 *
 * IOpenAipImporter is provided via a bridge definition in ProdNavplanDiContainer
 * (the OpenAip module isn't migrated to this pattern yet).
 */

use Navplan\Admin\Domain\Service\AdminServiceImpl;
use Navplan\Admin\Domain\Service\IAdminService;
use function DI\autowire;

return [
    IAdminService::class => autowire(AdminServiceImpl::class),
];

