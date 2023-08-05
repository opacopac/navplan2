<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Domain\Service;


use Navplan\MeteoGram\Domain\Model\CloudMeteogram;

interface ICloudMeteoGramService {
    /**
     * @param ReadCloudMeteogramRequest $request
     * @return CloudMeteogram
     */
    function readCloudMeteoGram(ReadCloudMeteogramRequest $request): CloudMeteogram;
}
