<?php declare(strict_types=1);

namespace Navplan\OpenAip\Importer\Service;

use Navplan\OpenAip\Importer\Model\ImportResult;
use Navplan\OpenAip\ApiAdapter\Service\OpenAipImportFilter;


interface IOpenAipImporter {
    function setImportFilter(?OpenAipImportFilter $importFilter);

    function importAirports(): ImportResult;

    function importAirspaces(): ImportResult;

    function importNavaids(): ImportResult;
}
