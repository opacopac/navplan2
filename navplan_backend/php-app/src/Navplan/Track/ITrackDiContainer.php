<?php declare(strict_types=1);

namespace Navplan\Track;

use Navplan\Common\Rest\Controller\IRestController;


interface ITrackDiContainer
{
    function getTrackController(): IRestController;
}
