<?php declare(strict_types=1);

namespace Navplan\Aircraft\Importer\Service;

use Navplan\Aircraft\Importer\Model\ImportResult;


interface IAircraftTypeDesignatorImporter
{
    /**
     * @param string[] $jsonFileNames
     * @return ImportResult
     */
    function importFromJson(array $jsonFileNames): ImportResult;
}
