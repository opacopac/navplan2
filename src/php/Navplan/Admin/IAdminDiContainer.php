<?php declare(strict_types=1);

namespace Navplan\Admin;

use Navplan\Admin\Domain\Service\IAdminService;


interface IAdminDiContainer {
    function getAdminService(): IAdminService;
}
