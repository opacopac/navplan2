<?php declare(strict_types=1);

namespace Navplan\System\Domain\Service;

use CurlHandle;


interface ICurlService
{
    function init(string $url, array $headers = []): CurlHandle|false;

    function setOpt(CurlHandle $curl, int $option, mixed $value): bool;

    function setHeaders(CurlHandle $curl, array $headers): bool;

    function exec(CurlHandle $handle): string|bool;

    function execOrThrow(CurlHandle $handle): string;

    function getLastError(CurlHandle $handle): string;

    function close(CurlHandle $handle): void;
}
