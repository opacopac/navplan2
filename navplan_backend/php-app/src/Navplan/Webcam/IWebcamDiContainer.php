<?php declare(strict_types=1);

namespace Navplan\Webcam;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Webcam\Domain\Service\IWebcamService;


interface IWebcamDiContainer
{
    function getWebcamController(): IRestController;

    function getWebcamService(): IWebcamService;
}
