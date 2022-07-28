<?php declare(strict_types=1);

namespace Navplan\Track;

use Navplan\Track\DomainService\ITrackService;


interface ITrackDiContainer {
    function getTrackService(): ITrackService;
}
