<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\MeteoDwd\DomainService\IMeteoDwdService;


interface IMeteoDwdDiContainer {
    function getMeteoDwdService(): IMeteoDwdService;
}
