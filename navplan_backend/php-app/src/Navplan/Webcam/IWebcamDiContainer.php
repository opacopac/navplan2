<?php declare(strict_types=1);

namespace Navplan\Webcam;

use Navplan\Common\Rest\Controller\IRestController;


interface IWebcamDiContainer
{
    function getWebcamController(): IRestController;
}
