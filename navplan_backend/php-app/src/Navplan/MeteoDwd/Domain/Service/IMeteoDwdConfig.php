<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;


interface IMeteoDwdConfig {
    function getMeteoDwdBaseDir(): string;
}
