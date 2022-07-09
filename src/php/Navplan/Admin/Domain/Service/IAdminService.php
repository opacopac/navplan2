<?php declare(strict_types=1);

namespace Navplan\Admin\Domain\Service;

use Navplan\OpenAip\Domain\Model\NavaidImportResult;

interface IAdminService {
    function importNavaids(): NavaidImportResult;
}
