<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain\Service;

use Navplan\OpenAip\Domain\Model\NavaidImportResult;


interface IOpenAipImporter {
    function importNavaids(): NavaidImportResult;
}
