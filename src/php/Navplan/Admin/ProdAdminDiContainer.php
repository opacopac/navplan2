<?php declare(strict_types=1);

namespace Navplan\Admin;

use Navplan\Admin\Domain\Service\AdminServiceImpl;
use Navplan\Admin\Domain\Service\IAdminService;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;


class ProdAdminDiContainer implements IAdminDiContainer
{
    public function __construct(
        private IOpenAipImporter $openAipImporter
    ) {
    }


    private IAdminService $adminService;


    public function getAdminService(): IAdminService {
        if (!isset($this->adminService)) {
            $this->adminService = new AdminServiceImpl($this->openAipImporter);
        }

        return $this->adminService;
    }
}
