<?php declare(strict_types=1);

namespace Navplan\System\Domain\Service;


interface IHttpService {
    function getRequestMethod(): string;

    function getGetArgs(): array;

    function getPostArgs(): array;

    function getCallbackArg(string $key = "callback");

    function hasGetArg(string $key): bool;

    function hasPostArg(string $key): bool;

    function sendHeader(string $header);

    function sendPayload(string $data);

    function sendArrayResponse(array $data, ?string $callbackKey = NULL, ?bool $jsonNumericCheck = FALSE);

    function sendStringResponse(string $data, ?string $callbackKey = NULL);
}
