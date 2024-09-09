<?php declare(strict_types=1);

namespace Navplan\Aircraft\Importer\Service;

use Navplan\Aircraft\Domain\Service\IAircraftTypeDesignatorService;
use Navplan\Aircraft\Importer\Model\ImporterAircraftTypeDesignatorConverter;
use Navplan\Aircraft\Importer\Model\ImportResult;
use Navplan\System\Domain\Service\ILoggingService;


class AircraftTypeDesignatorImporter implements IAircraftTypeDesignatorImporter
{
    public function __construct(
        private IAircraftTypeDesignatorService $acTypeDesignatorService,
        private ILoggingService $loggingService,
    )
    {
    }


    /**
     * @param string[] $jsonFileNames
     * @return ImportResult
     */
    public function importFromJson(array $jsonFileNames): ImportResult
    {
        $this->loggingService->info("importing aircraft type designators...");
        $this->loggingService->info("deleting existing aircraft type designators from db...");
        $this->acTypeDesignatorService->deleteAll();
        $this->loggingService->info("done.");

        foreach ($jsonFileNames as $jsonFileName) {
            $this->loggingService->info("importing aircraft type designators from file '" . $jsonFileName . "'...");
            $json = file_get_contents($jsonFileName);
            $jsonTypeDesignatorList = json_decode($json, true);

            foreach ($jsonTypeDesignatorList as $jsonTypeDesignator) {
                $acTypeDesignator = ImporterAircraftTypeDesignatorConverter::fromJson($jsonTypeDesignator);
                $this->acTypeDesignatorService->create($acTypeDesignator);
            }
            $this->loggingService->info("successfully imported " . count($jsonTypeDesignatorList) . " aircraft type designators");
        }

        $this->loggingService->info("done importing aircraft type designators.");

        return new ImportResult(true, count($jsonTypeDesignatorList));
    }
}
