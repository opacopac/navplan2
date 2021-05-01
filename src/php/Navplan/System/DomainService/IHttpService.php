<?php declare(strict_types=1);

namespace Navplan\System\DomainService;


interface IHttpService {
    function sendHeader(string $header);

    function sendPayload(string $data);

    function sendArrayResponse(array $data, ?string $callback = NULL, ?bool $jsonNumericCheck = FALSE);

    function sendStringResponse(string $data, ?string $callback = NULL);
}
