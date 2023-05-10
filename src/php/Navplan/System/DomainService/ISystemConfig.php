<?php declare(strict_types=1);

namespace Navplan\System\DomainService;


interface ISystemConfig {
    function getTempDir(): string;

    function getLogDir(): string;

    function getLogFile(): string;

    function getLogLevel(): int;
}
