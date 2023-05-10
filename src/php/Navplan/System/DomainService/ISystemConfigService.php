<?php declare(strict_types=1);

namespace Navplan\System\DomainService;


interface ISystemConfigService {
    function getTempDir(): string;

    function getLogDir(): string;

    function getLogFile(): string;

    function getLogLevel(): int;
}
