<?php declare(strict_types=1);

namespace Navplan\Admin\Domain\Service;

use Navplan\Admin\Domain\Model\ImportResponse;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;


class AdminServiceImpl implements IAdminService {
    public function __construct(
        private IOpenAipImporter $openAipImporter
    ) {
    }


    public function importAirports(): ImportResponse {
        $result = $this->openAipImporter->importAirports();

        return new ImportResponse($result->isSuccess, $result->insertCount);
    }


    public function importAirspaces(): ImportResponse {
        $result = $this->openAipImporter->importAirspaces();

        return new ImportResponse($result->isSuccess, $result->insertCount);
    }


    public function importNavaids(): ImportResponse {
        $result = $this->openAipImporter->importNavaids();

        return new ImportResponse($result->isSuccess, $result->insertCount);
    }
}
