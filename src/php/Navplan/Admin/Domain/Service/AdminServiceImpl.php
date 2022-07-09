<?php declare(strict_types=1);

namespace Navplan\Admin\Domain\Service;

use Navplan\OpenAip\Domain\Model\NavaidImportResult;
use Navplan\OpenAip\Domain\Service\IOpenAipImporter;


class AdminServiceImpl implements IAdminService {
    public function __construct(
        private IOpenAipImporter $openAipImporter
    ) {
    }


    public function importNavaids(): NavaidImportResult {
        return $this->openAipImporter->importNavaids();
    }
}
