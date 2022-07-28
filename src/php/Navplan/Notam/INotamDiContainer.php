<?php declare(strict_types=1);

namespace Navplan\Notam;

use Navplan\Notam\DomainService\INotamConfigService;
use Navplan\Notam\DomainService\INotamService;


interface INotamDiContainer {
    function getNotamConfigService(): INotamConfigService;

    function getNotamService(): INotamService;
}
