<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Domain\Service;


interface ICloudMeteoGramService {
    /**
     * @param ReadCloudMeteogramRequest $request
     * @return ReadCloudMeteogramResponse
     */
    function readCloudMeteoGram(ReadCloudMeteogramRequest $request): ReadCloudMeteogramResponse;
}
