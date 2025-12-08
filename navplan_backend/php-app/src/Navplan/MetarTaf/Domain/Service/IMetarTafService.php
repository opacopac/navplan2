<?php declare(strict_types=1);

namespace Navplan\MetarTaf\Domain\Service;

use Navplan\MetarTaf\Domain\Model\MetarTafResponse;


interface IMetarTafService {
    /**
     * @param ReadMetarTafRequest $request
     * @return MetarTafResponse
     */
    function readMetarTaf(ReadMetarTafRequest $request): MetarTafResponse;
}
