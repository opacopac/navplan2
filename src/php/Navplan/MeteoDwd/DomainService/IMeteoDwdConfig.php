<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;


interface IMeteoDwdConfig {
    function getMeteoDwdBaseDir(): string;
}
