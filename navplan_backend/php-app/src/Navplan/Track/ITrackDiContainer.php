<?php declare(strict_types=1);

namespace Navplan\Track;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Track\Domain\Service\ITrackService;


interface ITrackDiContainer
{
    function getTrackController(): IRestController;

    function getTrackService(): ITrackService;
}
