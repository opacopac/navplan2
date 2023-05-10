<?php declare(strict_types=1);

namespace Navplan\Notam;

use Navplan\Notam\DomainService\INotamConfig;
use Navplan\Notam\DomainService\INotamService;


interface INotamDiContainer {
    function getNotamConfig(): INotamConfig;

    function getNotamService(): INotamService;
}
