<?php declare(strict_types=1);

namespace Navplan\OpenAip\Importer\Service;

use Navplan\OpenAip\Importer\Model\ImportResult;


interface IOpenAipImporter {
    function importAirports(): ImportResult;

    function importAirspaces(): ImportResult;

    function importNavaids(): ImportResult;
}
