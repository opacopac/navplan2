<?php declare(strict_types=1);

namespace Navplan\System\UseCase;


interface IHttpService
{
    public function sendHeader(string $header);

    public function sendPayload(string $data);

    public function sendArrayResponse(array $data, ?string $callback = NULL, ?bool $jsonNumericCheck = FALSE);

    public function sendStringResponse(string $data, ?string $callback = NULL);
}
